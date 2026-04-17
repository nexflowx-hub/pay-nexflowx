'use client';

// ─── NeXFlowX Checkout Header ───────────────────────────────────────────────
// Shows merchant logo, secure badge, and language selector.

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation, localeLabels, localeFlags, type Locale } from '@/lib/checkout/i18n';

export function CheckoutHeader() {
  const session = useCheckoutStore((s) => s.session);
  const locale = useCheckoutStore((s) => s.locale);
  const setLocale = useCheckoutStore((s) => s.setLocale);
  const { t } = useTranslation(locale);

  if (!session) return null;

  const { branding, mode } = session;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full border-b bg-white/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Merchant Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border bg-white shadow-sm">
            <img
              src={branding.logo_url}
              alt={branding.merchant_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-gray-900">{branding.merchant_name}</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Secure badge */}
          <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 sm:flex">
            <Shield className="size-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">{t('secure_checkout')}</span>
          </div>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1.5 rounded-full border bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{ '--tw-ring-color': branding.primary_color } as React.CSSProperties}
                aria-label={t('change_language')}
              >
                <Globe className="size-3.5" />
                <span className="hidden sm:inline">{localeLabels[locale]}</span>
                <span className="sm:hidden">{localeFlags[locale]}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {(Object.keys(localeLabels) as Locale[]).map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={locale === loc ? 'bg-accent font-medium' : ''}
                >
                  <span className="mr-2">{localeFlags[loc]}</span>
                  {localeLabels[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
