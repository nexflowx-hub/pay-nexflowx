'use client';

// ─── NeXFlowX IBAN Bank Transfer Payment ────────────────────────────────────
// Displays bank details + "I completed the transfer" CTA.

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { copyToClipboard } from '@/lib/checkout/utils';
import type { PaymentSubmission, PaymentResponse } from '@/lib/checkout/types';

interface IbanPaymentProps {
  onSubmitPayment: (submission: PaymentSubmission) => Promise<PaymentResponse>;
}

export function IbanPayment({ onSubmitPayment }: IbanPaymentProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const customer = useCheckoutStore((s) => s.customer);
  const summary = useCheckoutStore((s) => s.orderSummary);
  const setPaymentResponse = useCheckoutStore((s) => s.setPaymentResponse);
  const setPaymentStatus = useCheckoutStore((s) => s.setPaymentStatus);
  const setStep = useCheckoutStore((s) => s.setStep);
  const { t } = useTranslation(locale);

  const [copiedField, setCopiedField] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [paymentResponse, setLocalResponse] = useState<PaymentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate bank transfer payment on mount
  useEffect(() => {
    async function initTransfer() {
      if (!session || !summary) return;
      setIsLoading(true);

      try {
        const response = await onSubmitPayment({
          session_id: session.id,
          customer,
          method: 'iban',
          amount: summary.total,
          currency: summary.currency,
        });

        setPaymentResponse(response);
        setLocalResponse(response);
        setPaymentStatus('pending');
      } catch {
        // handled by store
      } finally {
        setIsLoading(false);
      }
    }

    initTransfer();
  }, []);

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setPaymentStatus('confirmed');
    // In production, this would notify the backend
    // Auto-transition to success after a moment
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (isLoading || !paymentResponse) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="size-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!confirmed ? (
        <motion.div
          key="iban-details"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Instructions */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs leading-relaxed text-amber-800">
              {t('iban_instructions')}
            </p>
          </div>

          {/* Bank Details */}
          <div className="space-y-3">
            {/* IBAN */}
            <div className="group">
              <p className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('iban_account')}</p>
              <div className="flex items-center gap-2 rounded-lg border bg-gray-50 p-3">
                <code className="flex-1 text-sm font-mono font-medium text-gray-800 break-all">
                  {paymentResponse.iban}
                </code>
                <button
                  onClick={() => handleCopy(paymentResponse.iban || '', 'iban')}
                  className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                >
                  {copiedField === 'iban' ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Bank */}
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('iban_bank')}</p>
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-800">{paymentResponse.bank_name}</p>
                </div>
              </div>

              {/* Reference */}
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('iban_reference')}</p>
                <div className="flex items-center gap-2 rounded-lg border bg-gray-50 p-3">
                  <code className="flex-1 text-sm font-mono font-medium text-gray-800">
                    {paymentResponse.reference}
                  </code>
                  <button
                    onClick={() => handleCopy(paymentResponse.reference || '', 'ref')}
                    className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                  >
                    {copiedField === 'ref' ? (
                      <Check className="size-4 text-emerald-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Account holder */}
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('iban_holder')}</p>
              <div className="rounded-lg border bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-800">{paymentResponse.account_holder}</p>
              </div>
            </div>

            {/* Amount */}
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('total')}</span>
              <span
                className="text-lg font-bold"
                style={{ color: session?.branding.primary_color }}
              >
                {summary?.total.toFixed(2)}€
              </span>
            </div>
          </div>

          {/* Confirm button */}
          <Button
            onClick={handleConfirm}
            className="h-11 w-full gap-2 font-semibold transition-all"
            style={{ backgroundColor: session?.branding.primary_color }}
          >
            <ShieldCheck className="size-4" />
            {t('iban_confirm_btn')}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="iban-confirmed"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center py-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100"
          >
            <ShieldCheck className="size-8 text-emerald-600" />
          </motion.div>
          <h4 className="text-base font-semibold text-gray-900">{t('iban_confirm_title')}</h4>
          <p className="mt-2 max-w-xs text-sm text-gray-500">{t('iban_confirm_desc')}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
            <Mail className="size-3.5" />
            <span>{customer.email}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
