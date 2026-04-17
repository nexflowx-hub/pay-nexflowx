'use client';

// ─── NeXFlowX Email Step (Zero-Friction — Step 1) ──────────────────────────
// Email is NOT a blocker. The Continue button is always enabled.
// Soft validation: only show a hint if the user typed something invalid.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
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
  const { t } = useTranslation(locale);

  const [hint, setHint] = useState('');

  const hasFields = session?.collected_fields.some((f) => f.key !== 'email');
  const needsFieldsStep = hasFields && session?.mode === 'cart';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Soft validation — only warn if user typed something but it's invalid
    if (customer.email.trim() && !isValidEmail(customer.email)) {
      setHint(t('email_invalid'));
      return;
    }

    setHint('');
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
          {/* Email input — always optional, no blocker */}
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
                  if (hint) setHint('');
                }}
                placeholder={t('email_placeholder')}
                className="h-12 pl-10 text-base"
                autoComplete="email"
                autoFocus
              />
            </div>
            <AnimatePresence>
              {hint && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-amber-600"
                >
                  {hint}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Continue button — ALWAYS ACTIVE (zero friction) */}
          <Button
            type="submit"
            className="h-12 w-full text-base font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: session?.branding.primary_color,
            }}
          >
            {t('continue_btn')}
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
