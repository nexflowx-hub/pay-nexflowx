'use client';

// ─── NeXFlowX Checkout Page ─────────────────────────────────────────────────
// Main entry point. Reads txId from URL and fetches session from API (SDUI).

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCheckoutStore } from '@/lib/checkout/store';
import { CheckoutProvider } from '@/components/checkout/checkout-provider';
import { CheckoutLayout } from '@/components/checkout/checkout-layout';
import { CheckoutHeader } from '@/components/checkout/checkout-header';
import { CheckoutBody } from '@/components/checkout/checkout-body';
import { CheckoutFooter } from '@/components/checkout/checkout-footer';
import { LegalViewer } from '@/components/checkout/legal-dialog';
import { CheckoutSummary } from '@/components/checkout/checkout-summary';
import { CheckoutSkeleton } from '@/components/checkout/skeleton-loader';
import { useTranslation } from '@/lib/checkout/i18n';
import type { CheckoutSession } from '@/lib/checkout/types';

// ─── Main Checkout Page ─────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const locale = useCheckoutStore((s) => s.locale);
  const { t } = useTranslation(locale);

  const fetchSession = useCallback(async (txId: string) => {
    setIsLoading(true);
    setError('');
    useCheckoutStore.getState().reset();

    try {
      const res = await fetch(`/api/checkout/session?txId=${encodeURIComponent(txId)}`);
      if (!res.ok) throw new Error('Failed to fetch session');
      const data: CheckoutSession = await res.json();
      setSession(data);
    } catch {
      setError(t('error_generic'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txId = params.get('txId');

    if (!txId) {
      setError(t('error_session_no_txid'));
      setIsLoading(false);
      return;
    }

    fetchSession(txId);
  }, [fetchSession, t]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {isLoading && (
        <div className="mx-auto w-full max-w-lg px-4 py-8">
          <CheckoutSkeleton />
        </div>
      )}

      {error && (
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center max-w-sm">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                const txId = params.get('txId');
                if (txId) fetchSession(txId);
              }}
              className="mt-3 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              {t('retry')}
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {session && !isLoading && (
          <motion.div
            key={session.tx_id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-screen flex-col"
          >
            <CheckoutProvider session={session}>
              <CheckoutHeader />

              <CheckoutLayout>
                {session.mode === 'embedded' && (
                  <div className="mb-6 flex lg:hidden">
                    <CheckoutSummary />
                  </div>
                )}
                <CheckoutBody />
              </CheckoutLayout>

              <CheckoutFooter />
              <LegalViewer />
            </CheckoutProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
