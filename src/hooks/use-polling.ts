// ─── NeXFlowX Payment Polling Hook ──────────────────────────────────────────
// Silent background polling for async payment methods (MB WAY, PIX, IBAN).

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useCheckoutStore } from '@/lib/checkout/store';
import type { PaymentStatus } from '@/lib/checkout/types';

interface UsePaymentPollingOptions {
  paymentId: string | null;
  enabled: boolean;
  intervalMs?: number;
  maxAttempts?: number;
  onSuccess?: () => void;
  onTimeout?: () => void;
}

interface UsePaymentPollingReturn {
  isPolling: boolean;
  attempts: number;
  status: PaymentStatus;
  stop: () => void;
}

export function usePaymentPolling({
  paymentId,
  enabled,
  intervalMs = 3000,
  maxAttempts = 100, // ~5 minutes at 3s intervals
  onSuccess,
  onTimeout,
}: UsePaymentPollingOptions): UsePaymentPollingReturn {
  const [isPolling, setIsPolling] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptsRef = useRef(0);
  const mountedRef = useRef(true);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  }, []);

  const poll = useCallback(async () => {
    if (!paymentId || !mountedRef.current) return;

    attemptsRef.current += 1;
    const currentAttempts = attemptsRef.current;
    setAttempts(currentAttempts);

    try {
      const res = await fetch(`/api/checkout/status?payment_id=${paymentId}`);
      if (!res.ok) throw new Error('Polling failed');

      const data = await res.json();

      if (!mountedRef.current) return;

      setStatus(data.status);
      useCheckoutStore.getState().setPaymentStatus(data.status);

      if (data.status === 'confirmed') {
        stop();
        onSuccess?.();
      } else if (data.status === 'failed') {
        stop();
        useCheckoutStore.getState().setPaymentError('error_payment_failed');
      } else if (currentAttempts >= maxAttempts) {
        stop();
        onTimeout?.();
      }
    } catch {
      // Retry on next interval
    }
  }, [paymentId, maxAttempts, onSuccess, onTimeout, stop]);

  useEffect(() => {
    mountedRef.current = true;

    if (enabled && paymentId) {
      setIsPolling(true);
      setStatus('pending');
      setAttempts(0);
      attemptsRef.current = 0;

      // Initial poll immediately
      poll();

      intervalRef.current = setInterval(poll, intervalMs);
    } else {
      stop();
    }

    return () => {
      mountedRef.current = false;
      stop();
    };
  }, [enabled, paymentId, intervalMs, poll, stop]);

  return { isPolling, attempts, status, stop };
}
