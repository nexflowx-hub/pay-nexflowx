'use client';

// ─── NeXFlowX Checkout Body ─────────────────────────────────────────────────
// Orchestrates the entire checkout flow: loading → email → fields → payment → processing → success.
// SDUI: payment step routes by method.type from the API.

import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { CheckoutSummary } from './checkout-summary';
import { EmailStep } from './email-step';
import { FieldsStep } from './fields-step';
import { PaymentSelector } from './payment-selector';
import { CardPayment } from './payment-card';
import { MbWayPayment } from './payment-mbway';
import { PixPayment } from './payment-pix';
import { IbanPayment } from './payment-iban';
import { SuccessScreen } from './success-screen';
import { ProcessingScreen } from './processing-screen';
import type { PaymentSubmission, PaymentResponse, AvailableMethod } from '@/lib/checkout/types';

export function CheckoutBody() {
  const step = useCheckoutStore((s) => s.step);
  const session = useCheckoutStore((s) => s.session);
  const locale = useCheckoutStore((s) => s.locale);
  const paymentError = useCheckoutStore((s) => s.paymentError);
  const setPaymentError = useCheckoutStore((s) => s.setPaymentError);
  const setStep = useCheckoutStore((s) => s.setStep);
  const { t } = useTranslation(locale);

  const [submitError, setSubmitError] = useState('');

  const submitPayment = useCallback(
    async (submission: PaymentSubmission): Promise<PaymentResponse> => {
      setSubmitError('');
      try {
        const res = await fetch('/api/checkout/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Payment failed');
        }

        return await res.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Payment failed';
        setSubmitError(message);
        throw err;
      }
    },
    []
  );

  /** Render the payment form for a given AvailableMethod based on its type */
  const renderPaymentForm = (method: AvailableMethod) => {
    switch (method.type) {
      case 'credit_card':
        return <CardPayment method={method} onSubmitPayment={submitPayment} />;
      case 'mbway_native':
        return <MbWayPayment method={method} onSubmitPayment={submitPayment} />;
      case 'pix_static':
        return <PixPayment method={method} onSubmitPayment={submitPayment} />;
      case 'bank_transfer':
        return <IbanPayment method={method} onSubmitPayment={submitPayment} />;
      default:
        return (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500">{t('method_not_supported')}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {/* Step: Loading */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 text-center"
          >
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600" />
            <p className="text-sm text-gray-500">{t('loading_session')}</p>
          </motion.div>
        )}

        {/* Step: Email */}
        {(step === 'email') && (
          <motion.div key="email-wrapper" layout>
            <EmailStep onNext={() => setStep('payment')} />
            {/* Summary below on cart mode */}
            {session?.mode === 'redirect' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <CheckoutSummary />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step: Fields */}
        {step === 'fields' && (
          <motion.div key="fields-wrapper" layout>
            <FieldsStep onNext={() => setStep('payment')} />
            {session?.mode === 'redirect' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <CheckoutSummary />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step: Payment */}
        {step === 'payment' && (
          <motion.div key="payment-wrapper" layout>
            <PaymentSelector>
              {(method) => renderPaymentForm(method)}
            </PaymentSelector>

            {/* Error toast */}
            <AnimatePresence>
              {(submitError || paymentError) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3"
                >
                  <p className="text-sm text-red-600">
                    {paymentError || submitError || t('error_generic')}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitError('');
                      setPaymentError(null);
                    }}
                    className="mt-1 text-xs text-red-500 hover:underline"
                  >
                    {t('dismiss')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary */}
            {session?.mode === 'redirect' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <CheckoutSummary />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step: Processing */}
        {step === 'processing' && <ProcessingScreen />}

        {/* Step: Success */}
        {step === 'success' && <SuccessScreen />}
      </AnimatePresence>
    </div>
  );
}
