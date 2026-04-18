// ─── NeXFlowX Viva Wallet Engine Adapter ─────────────────────────────────────
// Loads Viva Wallet's script ON DEMAND and provides a div container where
// the Viva SDK injects its own IFrame for card data collection.
//
// Viva Wallet uses a tokenization flow:
// 1. Backend creates a payment order → gets orderCode
// 2. Frontend loads Viva SDK script
// 3. SDK renders an IFrame with card fields inside a target div
// 4. User fills card → SDK tokenizes → callback returns cardToken
// 5. Backend charges using the cardToken

'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw, Lock, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { usePaymentScript } from './use-payment-script';
import type { ProviderData } from '@/lib/checkout/types';
import type { EngineAdapterProps } from './native-engine';

const VIVA_SANDBOX_URL = 'https://demo.vivapayments.com/web/checkout/v2/js';
const VIVA_PRODUCTION_URL = 'https://www.vivapayments.com/web/checkout/v2/js';

export function VivaEngine({ provider, onTokenize, isProcessing, primaryColor }: EngineAdapterProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const { t } = useTranslation(locale);

  const [sdkReady, setSdkReady] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const containerId = provider.container_id || 'viva-card-container';
  const isSandbox = provider.metadata?.sandbox !== false;
  const scriptUrl = provider.script_url || (isSandbox ? VIVA_SANDBOX_URL : VIVA_PRODUCTION_URL);

  // Load Viva script ON DEMAND
  const { isLoaded, isLoading, error: scriptError, reload } = usePaymentScript({
    url: scriptUrl,
    globalName: 'VivaPayments',
    enabled: true,
    attributes: {
      'data-viva': 'checkout',
    },
    timeoutMs: 15000,
  });

  // Initialize Viva SDK after script loads
  useEffect(() => {
    if (!isLoaded || sdkReady) return;

    // In production with real Viva SDK:
    // VivaPayments.wallet.checkout.setup({
    //   authToken: provider.publishable_key,
    //   color: primaryColor,
    //   baseurl: isSandbox ? 'https://demo.vivapayments.com' : 'https://www.vivapayments.com',
    //   paymentMethods: { card: { enabled: true } },
    //   sessionId: provider.merchant_id, // Viva session ID from backend
    //   container: containerId,
    //   onSuccess: (event) => {
    //     onTokenize({ token: event.cardToken, engineData: { ... } });
    //   },
    //   onError: (event) => { setCardError(event.message); },
    // });

    // Demo simulation
    const timer = setTimeout(() => {
      setSdkReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [isLoaded, sdkReady, containerId, provider.publishable_key, provider.merchant_id, isSandbox, primaryColor, onTokenize]);

  const handleSubmit = useCallback(async () => {
    if (!sdkReady) return;

    setCardError(null);
    onTokenize({
      token: `viva_${Date.now()}`,
      engineData: {
        provider: 'viva',
        card_last4: '8888',
        card_brand: 'mastercard',
        transactionId: `txn_${Math.random().toString(36).substring(2, 15)}`,
      },
    });
  }, [sdkReady, onTokenize]);

  // ─── Loading state ──────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-8 space-y-3">
        <Loader2 className="size-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-500">{t('engine_loading_viva')}</p>
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
      {/* Viva engine badge */}
      <div className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2">
        <Wallet className="size-4 text-blue-600" />
        <Badge variant="outline" className="border-blue-300 text-blue-700 text-[10px] font-semibold uppercase tracking-wider bg-blue-100">
          Viva Wallet
        </Badge>
        <span className="text-xs text-blue-600">{t('engine_provider_badge', { engine: 'Viva Wallet' })}</span>
        {isSandbox && (
          <Badge variant="outline" className="border-amber-300 text-amber-700 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 ml-auto">
            SANDBOX
          </Badge>
        )}
      </div>

      {/* Viva IFrame injection container */}
      <div ref={containerRef} id={containerId} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {/* In production, Viva Wallet SDK injects its own IFrame here.
            The SDK renders card number, expiry, and CVC fields inside.
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
