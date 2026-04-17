'use client';

// ─── NeXFlowX PIX Payment ──────────────────────────────────────────────────
// QR Code display + copy PIX code button + polling.

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { usePaymentPolling } from '@/hooks/use-polling';
import { copyToClipboard, generateQRDataUrl } from '@/lib/checkout/utils';
import type { PaymentSubmission, PaymentResponse } from '@/lib/checkout/types';

interface PixPaymentProps {
  onSubmitPayment: (submission: PaymentSubmission) => Promise<PaymentResponse>;
}

export function PixPayment({ onSubmitPayment }: PixPaymentProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const customer = useCheckoutStore((s) => s.customer);
  const summary = useCheckoutStore((s) => s.orderSummary);
  const setPaymentStatus = useCheckoutStore((s) => s.setPaymentStatus);
  const setPaymentResponse = useCheckoutStore((s) => s.setPaymentResponse);
  const setStep = useCheckoutStore((s) => s.setStep);
  const { t } = useTranslation(locale);

  const [pixCode, setPixCode] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSuccess = useCallback(() => {
    setPaymentStatus('confirmed');
    setStep('success');
  }, [setPaymentStatus, setStep]);

  const { isPolling } = usePaymentPolling({
    paymentId,
    enabled: !!paymentId,
    intervalMs: 3000,
    maxAttempts: 80,
    onSuccess: handleSuccess,
  });

  // Initiate PIX payment on mount
  React.useEffect(() => {
    async function initiatePix() {
      if (!session || !summary) return;

      try {
        const response = await onSubmitPayment({
          session_id: session.id,
          customer,
          method: 'pix',
          amount: summary.total,
          currency: summary.currency,
        });

        setPaymentResponse(response);
        setPaymentId(response.id);
        setPaymentStatus('pending');

        if (response.pix_code) {
          setPixCode(response.pix_code);
          setQrUrl(generateQRDataUrl(response.pix_code));
        }
      } catch {
        // Error handled by store
      } finally {
        setIsLoading(false);
      }
    }

    initiatePix();
  }, []);

  const handleCopy = async () => {
    if (!pixCode) return;
    const success = await copyToClipboard(pixCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-8">
        <Loader2 className="size-8 animate-spin text-gray-400" />
        <p className="mt-3 text-sm text-gray-500">{t('please_wait')}</p>
      </div>
    );
  }

  return (
    <motion.div
      key="pix-payment"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center"
    >
      {/* QR Code */}
      <div className="mb-4 overflow-hidden rounded-xl border-2 border-gray-100 bg-white p-3 shadow-sm">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={qrUrl}
          alt="PIX QR Code"
          className="size-44 sm:size-48"
        />
      </div>

      <div className="flex items-center gap-1.5 mb-1">
        <QrCode className="size-4" style={{ color: session?.branding.primary_color }} />
        <h4 className="text-sm font-semibold text-gray-900">{t('pix_title')}</h4>
      </div>

      {/* Instructions */}
      <div className="mt-2 mb-4 w-full rounded-lg bg-gray-50 p-3">
        <p className="text-left text-xs leading-relaxed whitespace-pre-line text-gray-600">
          {t('pix_instructions')}
        </p>
      </div>

      {/* Copy button */}
      <Button
        variant="outline"
        onClick={handleCopy}
        className="w-full gap-2"
      >
        {copied ? (
          <>
            <Check className="size-4 text-emerald-500" />
            <span className="text-emerald-600">{t('pix_copied')}</span>
          </>
        ) : (
          <>
            <Copy className="size-4" />
            {t('pix_copy_btn')}
          </>
        )}
      </Button>

      {/* Waiting indicator */}
      {isPolling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center gap-2"
        >
          <Loader2 className="size-3.5 animate-spin text-gray-400" />
          <span className="text-xs text-gray-500">{t('pix_waiting')}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
