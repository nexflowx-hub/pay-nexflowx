'use client';

// ─── NeXFlowX Success Screen ────────────────────────────────────────────────
// Beautiful in-page success confirmation with auto-close/redirect after 5 seconds.

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Mail,
  Sparkles,
  PartyPopper,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { formatCurrency } from '@/lib/checkout/utils';

const REDIRECT_SECONDS = 5;

export function SuccessScreen() {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const customer = useCheckoutStore((s) => s.customer);
  const summary = useCheckoutStore((s) => s.orderSummary);
  const paymentResponse = useCheckoutStore((s) => s.paymentResponse);
  const { t } = useTranslation(locale);

  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [closed, setClosed] = useState(false);

  // Derived values (must be before early return — no hooks below)
  const returnUrl = session?.return_url || '';

  // Auto-close/redirect countdown
  useEffect(() => {
    if (!session || !summary) return;

    if (countdown <= 0) {
      // Try to close window (if opened as popup)
      try {
        window.close();
      } catch {
        // Ignore errors
      }

      // Check if window was actually closed
      setTimeout(() => {
        if (!closed && typeof window !== 'undefined' && !window.closed) {
          if (returnUrl) {
            window.location.href = returnUrl;
          }
        }
      }, 300);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, returnUrl, closed, session, summary]);

  // Listen for beforeunload to detect if the window is being closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      setClosed(true);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Early return AFTER all hooks
  if (!session || !summary) return null;

  // Use payment_id from response (new API), fallback to tx_id
  const orderId = paymentResponse?.payment_id?.toUpperCase() || session.tx_id.toUpperCase().substring(0, 12);

  const showRedirectMessage = countdown <= 0 && !returnUrl;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto max-w-md"
    >
      {/* Success card */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
        {/* Top gradient bar */}
        <div
          className="h-2"
          style={{
            background: `linear-gradient(90deg, ${session.branding.primary_color}, ${session.branding.accent_color})`,
          }}
        />

        <div className="p-8 text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              duration: 0.8,
              delay: 0.2,
            }}
            className="mx-auto mb-6"
          >
            <div
              className="mx-auto flex size-20 items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(135deg, ${session.branding.primary_color}20, ${session.branding.accent_color}20)`,
              }}
            >
              <CheckCircle2
                className="size-12"
                style={{ color: session.branding.primary_color }}
              />
            </div>
          </motion.div>

          {/* Confetti decoration */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <PartyPopper className="size-5 text-amber-400" />
            <Sparkles className="size-4 text-amber-300" />
            <PartyPopper className="size-5 text-amber-400" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900"
          >
            {t('success_title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-sm text-gray-500"
          >
            {t('success_subtitle')}
          </motion.p>

          {/* Order details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 rounded-xl bg-gray-50 p-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{t('success_order_id')}</span>
                <span className="font-mono text-xs font-semibold text-gray-700">{orderId}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{t('total')}</span>
                <span className="text-lg font-bold" style={{ color: session.branding.primary_color }}>
                  {formatCurrency(summary.total, summary.currency, '€')}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{t('step_payment')}</span>
                <span className="font-medium text-gray-700 capitalize">
                  {paymentResponse?.method_type || (session.available_methods || [])[0]?.type || ''}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Email notification */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <Mail className="size-4" />
            <span>
              {t('success_email_sent')}{' '}
              <span className="font-medium text-gray-700">{customer.email}</span>
            </span>
          </motion.div>

          {/* Countdown / redirect message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-4 text-sm text-gray-400"
          >
            {countdown > 0 ? (
              <p>{t('redirecting_in', { seconds: countdown })}</p>
            ) : showRedirectMessage ? (
              <p>{t('redirect_close')}</p>
            ) : null}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-4 flex flex-col gap-3"
          >
            {(session.products || [])[0]?.type === 'digital' && (
              <Button
                className="h-11 w-full gap-2 font-semibold transition-all"
                style={{ backgroundColor: session.branding.primary_color }}
              >
                <Download className="size-4" />
                {t('success_download')}
              </Button>
            )}
            <Button variant="outline" className="h-11 w-full gap-2">
              {t('success_back')}
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>

          {/* Thank you */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-4 text-xs text-gray-400"
          >
            {t('success_thank_you')}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
