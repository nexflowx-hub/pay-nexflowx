// ─── NeXFlowX SumUp Engine Adapter ──────────────────────────────────────────
// Loads SumUp's script ON DEMAND for card tokenization.
// SumUp uses a lightweight card form that can be embedded in any container.
//
// Flow:
// 1. Backend creates a checkout → gets checkoutId
// 2. Frontend loads SumUp SDK
// 3. SDK renders payment form in target container
// 4. User fills card → SDK returns token
// 5. Backend charges using the token

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { usePaymentScript } from './use-payment-script';
import type { ProviderData } from '@/lib/checkout/types';
import type { EngineAdapterProps } from './native-engine';

const SUMUP_SCRIPT_URL = 'https://gateway.sumup.com/assets/js/checkout.js';

export function SumUpEngine({ provider, onTokenize, isProcessing, primaryColor }: EngineAdapterProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const { t } = useTranslation(locale);

  const [sdkReady, setSdkReady] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const containerId = provider.container_id || 'sumup-card-container';

  // Load SumUp script ON DEMAND
  const { isLoaded, isLoading, error: scriptError, reload } = usePaymentScript({
    url: provider.script_url || SUMUP_SCRIPT_URL,
    globalName: 'SumUpCheckout',
    enabled: true,
    timeoutMs: 15000,
  });

  // Initialize SumUp after script loads
  useEffect(() => {
    if (!isLoaded || sdkReady) return;

    // In production with real SumUp SDK:
    // SumUpCheckout.render({
    //   id: provider.merchant_id, // SumUp merchant code
    //   checkoutId: provider.publishable_key, // SumUp checkout ID from backend
    //   container: { id: containerId },
    //   onTokenCreated: (token) => {
    //     onTokenize({ token: token, engineData: { ... } });
    //   },
    //   onError: (error) => { setCardError(error.message); },
    // });

    // Demo simulation
    const timer = setTimeout(() => {
      setSdkReady(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [isLoaded, sdkReady, containerId, provider.merchant_id, provider.publishable_key, onTokenize]);

  const handleSubmit = useCallback(async () => {
    if (!sdkReady) return;

    setCardError(null);
    onTokenize({
      token: `sumup_${Date.now()}`,
      engineData: {
        provider: 'sumup',
        card_last4: '1000',
        card_brand: 'visa',
      },
    });
  }, [sdkReady, onTokenize]);

  // ─── Loading state ──────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-8 space-y-3">
        <Loader2 className="size-8 animate-spin text-violet-500" />
        <p className="text-sm text-gray-500">{t('engine_loading_sumup')}</p>
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
      {/* SumUp engine badge */}
      <div className="flex items-center gap-2 rounded-lg bg-violet-50 border border-violet-200 px-3 py-2">
        <Zap className="size-4 text-violet-600" />
        <Badge variant="outline" className="border-violet-300 text-violet-700 text-[10px] font-semibold uppercase tracking-wider bg-violet-100">
          SumUp
        </Badge>
        <span className="text-xs text-violet-600">{t('engine_provider_badge', { engine: 'SumUp' })}</span>
      </div>

      {/* SumUp card form container */}
      <div id={containerId} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {/* In production, SumUp SDK renders its card form here.
            For demo, we show a simulated container. */}
        <div className="p-4 space-y-3">
          <div className="h-10 rounded-md bg-gray-50 border border-gray-200 px-3 flex items-center">
            <span className="text-sm text-gray-400 font-mono">Card Number</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 rounded-md bg-gray-50 border border-gray-200 px-3 flex items-center">
              <span className="text-sm text-gray-400 font-mono">MM/YY</span>
            </div>
            <div className="h-10 rounded-md bg-gray-50 border border-gray-200 px-3 flex items-center">
              <span className="text-sm text-gray-400 font-mono">CVC</span>
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
          disabled={isProcessing || !sdkReady}
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
