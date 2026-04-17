'use client';

// ─── NeXFlowX Email Step (Progressive Profiling - Step 1) ───────────────────
// For digital products: ask email first, then expand to payment.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { isValidEmail } from '@/lib/checkout/utils';

interface EmailStepProps {
  onNext: () => void;
}

export function EmailStep({ onNext }: EmailStepProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const customer = useCheckoutStore((s) => s.customer);
  const setCustomer = useCheckoutStore((s) => s.setCustomer);
  const session = useCheckoutStore((s) => s.session);
  const step = useCheckoutStore((s) => s.step);
  const goBack = useCheckoutStore((s) => s.goBack);
  const { t } = useTranslation(locale);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFields = session?.collected_fields.some((f) => f.key !== 'email');
  const needsFieldsStep = hasFields && session?.mode === 'cart';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!customer.email.trim()) {
      setError(t('email_required'));
      return;
    }

    if (!isValidEmail(customer.email)) {
      setError(t('email_invalid'));
      return;
    }

    setIsSubmitting(true);
    // Simulate brief validation
    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);

    if (needsFieldsStep) {
      useCheckoutStore.getState().setStep('fields');
    } else {
      onNext();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="email-step"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="flex size-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: session?.branding.primary_color }}
            >
              1
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{t('step_contact')}</h2>
          </div>
          <div className="ml-9 mt-1 flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-200" />
            <div
              className="flex size-7 items-center justify-center rounded-full text-xs font-bold border-2"
              style={{
                borderColor: session?.branding.primary_color + '40',
                color: session?.branding.primary_color + '80',
              }}
            >
              2
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              {t('email_label')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) => {
                  setCustomer({ email: e.target.value });
                  if (error) setError('');
                }}
                placeholder={t('email_placeholder')}
                className="h-12 pl-10 text-base"
                autoComplete="email"
                autoFocus
              />
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

          {/* Continue button */}
          <Button
            type="submit"
            disabled={isSubmitting || !customer.email}
            className="h-12 w-full text-base font-semibold transition-all"
            style={{
              backgroundColor: session?.branding.primary_color,
            }}
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                {t('continue_btn')}
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
