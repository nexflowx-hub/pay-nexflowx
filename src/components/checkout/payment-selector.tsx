'use client';

// ─── NeXFlowX Payment Selector ─────────────────────────────────────────────
// Tab-based payment method selection with elegant cards and brand icons.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { VisaIcon, MastercardIcon, AmexIcon, MbWayIcon, PixIcon } from './payment-icons';
import type { PaymentMethodType } from '@/lib/checkout/types';

interface PaymentSelectorProps {
  children: (method: PaymentMethodType) => React.ReactNode;
}

const methodConfig: Record<
  PaymentMethodType,
  {
    icon: React.ReactNode;
    brands: React.ReactNode;
    titleKey: string;
    descKey: string;
  }
> = {
  card: {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    brands: (
      <div className="flex items-center gap-1.5">
        <VisaIcon className="h-4 w-auto" color="currentColor" />
        <MastercardIcon className="h-4 w-auto" color="currentColor" />
        <AmexIcon className="h-4 w-auto" color="currentColor" />
      </div>
    ),
    titleKey: 'card_title',
    descKey: 'card_desc',
  },
  mbway: {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="10" height="16" x="7" y="4" rx="1.5" />
        <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
    brands: <MbWayIcon className="h-5 w-auto" color="currentColor" />,
    titleKey: 'mbway_title',
    descKey: 'mbway_desc',
  },
  pix: {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="2" transform="rotate(45 12 12)" />
      </svg>
    ),
    brands: <PixIcon className="h-5 w-auto" color="currentColor" />,
    titleKey: 'pix_title',
    descKey: 'pix_desc',
  },
  iban: {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M3 10h18" />
        <path d="M12 3l9 7-9 7-9-7 9-7z" />
      </svg>
    ),
    brands: (
      <span className="text-[10px] font-medium tracking-wide opacity-60">IBAN / SWIFT</span>
    ),
    titleKey: 'iban_title',
    descKey: 'iban_desc',
  },
};

export function PaymentSelector({ children }: PaymentSelectorProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const selectedMethod = useCheckoutStore((s) => s.selectedMethod);
  const setSelectedMethod = useCheckoutStore((s) => s.setSelectedMethod);
  const { t } = useTranslation(locale);

  const [expandedMethod, setExpandedMethod] = useState<PaymentMethodType | null>(null);

  if (!session) return null;

  const { enabled_methods, branding } = session;

  const handleSelect = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    setExpandedMethod(method);
  };

  const activeMethod = expandedMethod || selectedMethod;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="payment-selector"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex size-7 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500">
              ✓
            </div>
            <span className="text-sm text-gray-500">{t('step_contact')}</span>
          </div>
          <div className="ml-3.5 flex flex-col items-start gap-1">
            <div
              className="flex size-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: branding.primary_color }}
            >
              <Check className="size-3" />
            </div>
            <div className="ml-9 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">{t('step_payment')}</h2>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-900">{t('payment_method')}</h3>

        {/* Method cards */}
        <div className="space-y-2">
          {enabled_methods.map((method) => {
            const config = methodConfig[method];
            const isActive = activeMethod === method;

            return (
              <motion.button
                key={method}
                type="button"
                onClick={() => handleSelect(method)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200',
                  isActive
                    ? 'border-transparent shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                )}
                style={
                  isActive
                    ? {
                        borderColor: branding.primary_color,
                        backgroundColor: branding.primary_color + '08',
                      }
                    : undefined
                }
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
              >
                <div
                  className={cn(
                    'flex size-11 items-center justify-center rounded-xl transition-colors',
                    isActive ? 'text-white' : 'bg-gray-100 text-gray-500'
                  )}
                  style={isActive ? { backgroundColor: branding.primary_color } : undefined}
                >
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      isActive ? 'text-gray-900' : 'text-gray-700'
                    )}
                  >
                    {t(config.titleKey)}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-gray-400">
                    {config.brands}
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex size-5 items-center justify-center rounded-full shrink-0"
                    style={{ backgroundColor: branding.primary_color }}
                  >
                    <Check className="size-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Active method content */}
        <AnimatePresence mode="wait">
          {activeMethod && (
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border bg-gray-50/50 p-4 sm:p-5">
                {children(activeMethod)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
