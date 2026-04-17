'use client';

// ─── NeXFlowX Checkout Footer ───────────────────────────────────────────────
// Real payment brand SVGs, PCI DSS badge, SSL security indicators.

import React from 'react';
import { motion } from 'framer-motion';
import {
  VisaIcon,
  MastercardIcon,
  AmexIcon,
  MbWayIcon,
  PixIcon,
  PciDssIcon,
  SslLockIcon,
} from './payment-icons';
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
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        {/* Payment brand logos */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo row */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <VisaIcon className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <MastercardIcon className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <AmexIcon className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <div className="mx-1 h-5 w-px bg-gray-200" />
            <MbWayIcon className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <PixIcon className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>

          {/* Security badges row */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <SslLockIcon className="size-4" />
              <span>SSL 256-bit</span>
            </div>
            <PciDssIcon className="size-5 opacity-60" />
            <span className="text-[10px] font-semibold text-gray-400 tracking-wide">PCI DSS</span>
          </div>

          <div className="h-px w-full max-w-sm bg-gray-200" />

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {t('footer_terms')}
            </span>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {t('footer_privacy')}
            </span>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {t('footer_refund')}
            </span>
          </div>

          {/* Powered by */}
          <div className="text-center">
            <span className="text-[11px] text-gray-400">
              {t('powered_by')}{' '}
              <span className="font-semibold text-gray-500">NeXFlowX</span>
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
