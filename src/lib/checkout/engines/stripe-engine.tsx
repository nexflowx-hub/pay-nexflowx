// ─── NeXFlowX Stripe Engine Adapter ──────────────────────────────────────────
// Loads stripe.js ON DEMAND when user selects credit card with Stripe engine.
// Uses @stripe/stripe-js for tokenization.
// In production: import { loadStripe } from '@stripe/stripe-js'
// For demo: simulates the Stripe integration flow.

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader2, AlertCircle, RefreshCw, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { usePaymentScript } from './use-payment-script';
import type { ProviderData } from '@/lib/checkout/types';
import type { EngineAdapterProps } from './native-engine';

const STRIPE_JS_URL = 'https://js.stripe.com/v3/';

export function StripeEngine({ provider, onTokenize, isProcessing, primaryColor }: EngineAdapterProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const { t } = useTranslation(locale);

  const [cardReady, setCardReady] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const containerId = provider.container_id || 'stripe-card-element';

  // Load Stripe.js ON DEMAND
  const { isLoaded, isLoading, error: scriptError, reload } = usePaymentScript({
    url: provider.script_url || STRIPE_JS_URL,
    globalName: 'Stripe',
    enabled: true,
    timeoutMs: 15000,
  });

  // Initialize Stripe Elements after script loads
  useEffect(() => {
    if (!isLoaded || cardReady) return;

    // In production with real @stripe/stripe-js:
    // const stripe = await loadStripe(provider.publishable_key!);
    // const elements = stripe.elements();
    // const card = elements.create('card');
    // card.mount(`#${containerId}`);

    // Demo simulation: simulate Stripe CardElement initialization
    const timer = setTimeout(() => {
      setCardReady(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [isLoaded, cardReady, containerId]);

  const handleSubmit = useCallback(async () => {
    if (!cardReady) return;

    // In production:
    // const { token, error } = await stripe.createToken(cardElement);
    // if (error) { setCardError(error.message); return; }
    // onTokenize({ token: token.id, engineData: { ... } });

    // Demo simulation
    setCardError(null);
    onTokenize({
      token: `pm_stripe_${Date.now()}`,
      engineData: {
        provider: 'stripe',
        card_last4: '4242',
        card_brand: 'visa',
      },
    });
  }, [cardReady, onTokenize]);

  // ─── Loading state ──────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-8 space-y-3">
        <Loader2 className="size-8 animate-spin text-indigo-500" />
        <p className="text-sm text-gray-500">{t('engine_loading_stripe')}</p>
      </div>
    );
  }

  // ─── Error state ────────────────────────────────────────
  if (scriptError) {
    return (
      <div className="flex flex-col items-center py-6 space-y-4">
        <AlertCircle className="size-10 text-red-400" />
        <p className="text-sm text-red-600 text-center">{t('engine_error')}</p>
        <p className="text-xs text-gray-400 text-center max-w-xs">{scriptError}</p>
        <Button variant="outline" onClick={reload} className="gap-2">
          <RefreshCw className="size-4" />
          {t('engine_error_retry')}
        </Button>
      </div>
    );
  }

  // ─── Ready state ────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Stripe engine badge */}
      <div className="flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-2">
        <svg className="size-4 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19l-.893 5.549C4.887 22.27 7.352 23.073 10.056 23.073c2.642 0 4.739-.624 6.223-1.789 1.655-1.305 2.513-3.236 2.513-5.675-.029-4.18-2.585-5.792-6.816-7.46z"/>
        </svg>
        <Badge variant="outline" className="border-indigo-300 text-indigo-700 text-[10px] font-semibold uppercase tracking-wider bg-indigo-100">
          Stripe
        </Badge>
        <span className="text-xs text-indigo-600">{t('engine_provider_badge', { engine: 'Stripe' })}</span>
      </div>

      {/* Stripe CardElement container (real SDK mounts here) */}
      <div
        id={containerId}
        className="rounded-lg border border-gray-200 bg-white p-3 min-h-[44px] transition-all"
        style={{ borderColor: cardError ? '#ef4444' : undefined }}
      >
        {/* In production, Stripe SDK renders its CardElement iframe here.
            For demo, we show a simulated card element. */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-400">
            <CreditCard className="size-4" />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="h-8 flex-1 rounded bg-gray-50 border border-gray-200 px-3 flex items-center">
              <span className="text-sm text-gray-400 font-mono">4242 4242 4242 4242</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card error */}
      {cardError && (
        <p className="text-xs text-red-500">{cardError}</p>
      )}

      {/* Submit */}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          type="button"
          disabled={isProcessing || !cardReady}
          onClick={handleSubmit}
          className="h-12 w-full gap-2 text-base font-semibold transition-all text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {isProcessing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <Lock className="size-4" />
              {t('pay_now')}
            </>
          )}
        </Button>
      </motion.div>

      <p className="text-center text-xs text-gray-400">
        {t('footer_secure')}
      </p>
    </div>
  );
}
