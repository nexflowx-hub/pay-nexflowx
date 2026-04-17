'use client';

// ─── NeXFlowX Checkout Page ─────────────────────────────────────────────────
// Main entry point. Fetches session from API and renders the checkout.

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
import type { CheckoutSession, CheckoutMode } from '@/lib/checkout/types';

// ─── Mode Switcher (demo) ───────────────────────────────────────────────────

function ModeSwitcher({ mode, onModeChange }: { mode: CheckoutMode; onModeChange: (m: CheckoutMode) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex overflow-hidden rounded-full border bg-white shadow-lg">
        <button
          onClick={() => onModeChange('mini-store')}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'mini-store'
              ? 'bg-teal-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Mini-Store
        </button>
        <button
          onClick={() => onModeChange('cart')}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'cart'
              ? 'bg-teal-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Cart
        </button>
      </div>
    </div>
  );
}

// ─── Main Checkout Page ─────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [mode, setMode] = useState<CheckoutMode>('mini-store');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSession = useCallback(async (m: CheckoutMode) => {
    setIsLoading(true);
    setError('');
    useCheckoutStore.getState().reset();

    try {
      const res = await fetch(`/api/checkout/session?mode=${m}`);
      if (!res.ok) throw new Error('Failed to fetch session');
      const data: CheckoutSession = await res.json();
      setSession(data);
    } catch {
      setError('Failed to load checkout session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession(mode);
  }, [mode, fetchSession]);

  const handleModeChange = (newMode: CheckoutMode) => {
    setMode(newMode);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {isLoading && (
        <div className="mx-auto w-full max-w-lg px-4 py-8">
          <CheckoutSkeleton />
        </div>
      )}

      {error && (
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => fetchSession(mode)}
              className="mt-3 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {session && !isLoading && (
          <motion.div
            key={session.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-screen flex-col"
          >
            <CheckoutProvider session={session}>
              {/* Mini-store mode has its own header in the layout, but we add the global header */}
              {mode === 'cart' && <CheckoutHeader />}

              <CheckoutLayout>
                {mode === 'mini-store' && (
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

      {/* Demo mode switcher */}
      <ModeSwitcher mode={mode} onModeChange={handleModeChange} />
    </div>
  );
}
