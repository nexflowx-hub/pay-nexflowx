'use client';

// ─── NeXFlowX Checkout Footer ───────────────────────────────────────────────

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, ShieldCheck } from 'lucide-react';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';

export function CheckoutFooter() {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const { t } = useTranslation(locale);

  if (!session) return null;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-auto w-full border-t bg-gray-50/80"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        {/* Security badges */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Lock className="size-3.5" />
              <span>SSL 256-bit</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShieldCheck className="size-3.5" />
              <span>PCI DSS</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <CreditCard className="size-3.5" />
              <span>Visa / MC / Amex</span>
            </div>
          </div>

          <div className="hidden h-3 w-px bg-gray-300 sm:block" />

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {t('footer_terms')}
            </span>
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {t('footer_privacy')}
            </span>
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {t('footer_refund')}
            </span>
          </div>
        </div>

        {/* Powered by */}
        <div className="mt-3 text-center">
          <span className="text-[11px] text-gray-400">
            {t('powered_by')}{' '}
            <span className="font-semibold text-gray-500">NeXFlowX</span>
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
