'use client';

// ─── NeXFlowX Checkout Footer ───────────────────────────────────────────────
// Real payment brand logos sourced from official brand assets.
// SVG logos loaded from /public/logos for crisp rendering.

import React from 'react';
import { motion } from 'framer-motion';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';

// ─── Inline Mastercard (two overlapping circles — clean & realistic) ────────
function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mastercard"
    >
      <circle cx="56" cy="48" r="40" fill="#EB001B" />
      <circle cx="104" cy="48" r="40" fill="#F79E1B" />
      <path d="M80 16.7a40 40 0 010 62.6 40 40 0 000-62.6z" fill="#FF5F00" />
    </svg>
  );
}

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
      className="mt-auto w-full border-t bg-gray-50/80 dark:bg-gray-950/80"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        {/* Payment brand logos */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo row */}
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
            {/* VISA */}
            <img
              src="/logos/visa.svg"
              alt="Visa"
              className="h-6 sm:h-7 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
              loading="lazy"
            />
            {/* Mastercard */}
            <MastercardLogo className="h-6 sm:h-7 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200" />
            {/* Separator */}
            <div className="mx-0.5 h-5 w-px bg-gray-300 dark:bg-gray-700" />
            {/* MB WAY */}
            <img
              src="/logos/mbway.svg"
              alt="MB WAY"
              className="h-6 sm:h-7 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
              loading="lazy"
            />
            {/* PIX */}
            <img
              src="/logos/pix.png"
              alt="PIX"
              className="h-6 sm:h-7 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
              loading="lazy"
            />
            {/* SEPA */}
            <img
              src="/logos/sepa.png"
              alt="SEPA"
              className="h-6 sm:h-7 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
              loading="lazy"
            />
          </div>

          {/* Security badges row */}
          <div className="flex items-center gap-4">
            {/* SSL Lock */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <svg
                className="size-4 text-green-600 dark:text-green-400"
                viewBox="0 0 24 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="12"
                  width="18"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M7 12V8a5 5 0 0110 0v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
                <line
                  x1="12"
                  y1="20"
                  x2="12"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>SSL 256-bit</span>
            </div>
            {/* PCI DSS Badge */}
            <svg
              className="size-5 opacity-60"
              viewBox="0 0 24 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="PCI DSS"
            >
              <path
                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                fill="#004B87"
                fillOpacity="0.1"
                stroke="#004B87"
                strokeWidth="1"
              />
              <text
                x="12"
                y="14"
                textAnchor="middle"
                fill="#004B87"
                fontSize="4.5"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                PCI
              </text>
              <text
                x="12"
                y="19"
                textAnchor="middle"
                fill="#004B87"
                fontSize="3"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
                opacity="0.7"
              >
                DSS
              </text>
            </svg>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 tracking-wide">
              PCI DSS
            </span>
          </div>

          <div className="h-px w-full max-w-sm bg-gray-200 dark:bg-gray-800" />

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer transition-colors">
              {t('footer_terms')}
            </span>
            <span className="text-xs text-gray-300 dark:text-gray-700">|</span>
            <span className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer transition-colors">
              {t('footer_privacy')}
            </span>
            <span className="text-xs text-gray-300 dark:text-gray-700">|</span>
            <span className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer transition-colors">
              {t('footer_refund')}
            </span>
          </div>

          {/* Powered by */}
          <div className="text-center">
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              {t('powered_by')}{' '}
              <span className="font-semibold text-gray-500 dark:text-gray-400">NeXFlowX</span>
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
