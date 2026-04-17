'use client';

// ─── NeXFlowX MB WAY Payment ────────────────────────────────────────────────
// Phone input + polling state with radar animation.

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Loader2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { usePaymentPolling } from '@/hooks/use-polling';
import { isValidPTMobile, copyToClipboard } from '@/lib/checkout/utils';
import type { PaymentSubmission, PaymentResponse } from '@/lib/checkout/types';

interface MbWayPaymentProps {
  onSubmitPayment: (submission: PaymentSubmission) => Promise<PaymentResponse>;
}

export function MbWayPayment({ onSubmitPayment }: MbWayPaymentProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const customer = useCheckoutStore((s) => s.customer);
  const summary = useCheckoutStore((s) => s.orderSummary);
  const setPaymentStatus = useCheckoutStore((s) => s.setPaymentStatus);
  const setPaymentResponse = useCheckoutStore((s) => s.setPaymentResponse);
  const setPaymentError = useCheckoutStore((s) => s.setPaymentError);
  const setStep = useCheckoutStore((s) => s.setStep);
  const { t } = useTranslation(locale);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [phase, setPhase] = useState<'input' | 'polling' | 'timeout'>('input');

  const handleSuccess = useCallback(() => {
    setPaymentStatus('confirmed');
    setStep('success');
  }, [setPaymentStatus, setStep]);

  const handleTimeout = useCallback(() => {
    setPhase('timeout');
  }, []);

  const { isPolling, attempts } = usePaymentPolling({
    paymentId,
    enabled: phase === 'polling',
    intervalMs: 3000,
    maxAttempts: 60,
    onSuccess: handleSuccess,
    onTimeout: handleTimeout,
  });

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').substring(0, 9);
    if (digits.length > 3) return digits.substring(0, 3) + ' ' + digits.substring(3);
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.trim() || !isValidPTMobile(phone)) {
      setError(t('mbway_invalid_phone'));
      return;
    }

    setIsSending(true);

    try {
      const response = await onSubmitPayment({
        session_id: session!.id,
        customer,
        method: 'mbway',
        amount: summary!.total,
        currency: summary!.currency,
        phone: '+351 ' + phone,
      });

      setPaymentResponse(response);
      setPaymentId(response.id);
      setPaymentStatus('pending');
      setPhase('polling');
    } catch {
      setError(t('error_generic'));
    } finally {
      setIsSending(false);
    }
  };

  const handleRetry = () => {
    setPaymentId(null);
    setPhase('input');
    setError('');
  };

  return (
    <AnimatePresence mode="wait">
      {phase === 'input' && (
        <motion.form
          key="mbway-input"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* MB WAY branding */}
          <div className="flex items-center gap-3 rounded-lg bg-[#003C71] p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white">
              <span className="text-lg font-bold text-[#003C71]">MB</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">MB WAY</p>
              <p className="text-xs text-white/70">{t('mbway_desc')}</p>
            </div>
          </div>

          {/* Phone input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">{t('mbway_phone_label')}</label>
            <div className="flex gap-2">
              <div className="flex h-11 w-16 shrink-0 items-center justify-center rounded-md border bg-gray-50 text-sm font-medium text-gray-600">
                +351
              </div>
              <div className="relative flex-1">
                <Smartphone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    if (error) setError('');
                  }}
                  placeholder={t('mbway_phone_placeholder')}
                  className="h-11 pl-10 font-mono text-base tracking-wider"
                  autoFocus
                />
              </div>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-500"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            disabled={isSending || !phone || phone.replace(/\s/g, '').length < 9}
            className="h-11 w-full gap-2 font-semibold text-white transition-all"
            style={{ backgroundColor: '#003C71' }}
          >
            {isSending ? <Loader2 className="size-4 animate-spin" /> : <>{t('mbway_send_btn')}</>}
          </Button>
        </motion.form>
      )}

      {phase === 'polling' && (
        <motion.div
          key="mbway-polling"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center py-6 text-center"
        >
          {/* Radar animation */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute size-20 rounded-full"
                style={{ border: `2px solid ${session?.branding.primary_color}40` }}
              />
              <motion.div
                animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute size-24 rounded-full"
                style={{ border: `1px solid ${session?.branding.primary_color}30` }}
              />
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex size-16 items-center justify-center rounded-full bg-[#003C71]"
            >
              <Smartphone className="size-7 text-white" />
            </motion.div>
          </div>

          <h4 className="text-base font-semibold text-gray-900">{t('mbway_polling_title')}</h4>
          <p className="mt-1 text-sm text-gray-500">{t('mbway_polling_desc')}</p>

          {/* Animated dots */}
          <div className="mt-3 flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="size-1.5 rounded-full"
                style={{ backgroundColor: session?.branding.primary_color }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {phase === 'timeout' && (
        <motion.div
          key="mbway-timeout"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col items-center py-4 text-center"
        >
          <XCircle className="mb-3 size-12 text-amber-500" />
          <p className="text-sm font-medium text-gray-900">{t('mbway_timeout')}</p>
          <Button
            variant="outline"
            onClick={handleRetry}
            className="mt-4 gap-2"
          >
            <RotateCcw className="size-4" />
            {t('or')} {t('mbway_send_btn')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
