'use client';

// ─── NeXFlowX Multi-Engine Card Payment Wrapper ─────────────────────────────
// This is NOT a hardcoded Stripe form. This is a CAMALEON wrapper that:
//
// 1. Reads the `engine` field from session.provider_data.card
// 2. Dynamically loads the appropriate engine adapter (Stripe, Viva, SumUp, etc.)
// 3. Each adapter loads its SDK script ON DEMAND via useEffect (NOT in layout.tsx)
// 4. Falls back to NeXFlowX Native if engine is 'native' or unknown
//
// Architecture:
//   PaymentCard (this wrapper)
//   └── Engine Adapter (resolved from registry at runtime)
//       ├── NativeEngine  → NeXFlowX native card form (no external SDK)
//       ├── StripeEngine  → Loads stripe.js → CardElement
//       ├── VivaEngine    → Loads vivapayments → IFrame injection
//       ├── SumUpEngine   → Loads sumup.js → Card form
//       ├── RedeEngine    → Rede/Cielo (Brazil)
//       ├── IframeEngine  → Generic iframe slot
//       └── (custom)      → Any engine registered at runtime
//
// MB WAY & PIX remain NATIVE NeXFlowX:
//   - Frontend collects minimal data (phone / nothing)
//   - Backend handles bank selection (Viva, Stripe, Elitepay, etc.) invisibly

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { getEngineComponent, getEngineLoadingKey } from '@/lib/checkout/engines/registry';
import type { PaymentSubmission, PaymentResponse, ProviderData } from '@/lib/checkout/types';

interface CardPaymentProps {
  onSubmitPayment: (submission: PaymentSubmission) => Promise<PaymentResponse>;
}

// ─── Engine Loading Skeleton ─────────────────────────────────────────────────

function EngineLoadingSkeleton({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center py-8 space-y-4">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="size-10 rounded-full border-2 border-gray-200 border-t-gray-500"
        />
        <Layers className="absolute inset-0 m-auto size-4 text-gray-400" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-600">{message}</p>
        <p className="text-xs text-gray-400">Loading payment engine...</p>
      </div>
    </div>
  );
}

// ─── Multi-Engine Wrapper Component ──────────────────────────────────────────

export function CardPayment({ onSubmitPayment }: CardPaymentProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const customer = useCheckoutStore((s) => s.customer);
  const summary = useCheckoutStore((s) => s.orderSummary);
  const setPaymentStatus = useCheckoutStore((s) => s.setPaymentStatus);
  const setPaymentResponse = useCheckoutStore((s) => s.setPaymentResponse);
  const setPaymentError = useCheckoutStore((s) => s.setPaymentError);
  const setStep = useCheckoutStore((s) => s.setStep);
  const { t } = useTranslation(locale);

  // ─── Resolve Engine ──────────────────────────────────
  const provider: ProviderData | undefined = session?.provider_data?.card;
  const engine = provider?.engine || 'native';

  // ─── Dynamic Engine Component (lazy) ─────────────────
  const [EngineComponent, setEngineComponent] = useState<React.ComponentType<{
    provider: ProviderData;
    onTokenize: (data: { token: string; engineData?: Record<string, unknown> }) => void;
    isProcessing: boolean;
    primaryColor: string;
  }> | null>(null);

  const [loadError, setLoadError] = useState<string | null>(null);

  // Lazy-load the engine component on mount
  useEffect(() => {
    let cancelled = false;

    async function loadEngine() {
      try {
        const loader = getEngineComponent(engine);
        const Component = await loader();
        if (!cancelled) {
          setEngineComponent(() => Component);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'Failed to load engine');
        }
      }
    }

    loadEngine();

    return () => {
      cancelled = true;
    };
  }, [engine]);

  // ─── Payment Processing ──────────────────────────────
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTokenize = useCallback(
    async (data: { token: string; engineData?: Record<string, unknown> }) => {
      if (!session || !summary) return;

      setIsProcessing(true);
      setStep('processing');
      setPaymentStatus('processing');

      try {
        const response = await onSubmitPayment({
          session_id: session.id,
          customer,
          method: 'card',
          amount: summary.total,
          currency: summary.currency,
          engine,
          card_token: data.token,
          engine_data: data.engineData,
        });

        setPaymentResponse(response);

        if (response.status === 'confirmed') {
          setPaymentStatus('confirmed');
          setStep('success');
        } else {
          setPaymentError(t('error_payment_failed'));
          setStep('payment');
        }
      } catch {
        setPaymentError(t('error_generic'));
        setStep('payment');
      } finally {
        setIsProcessing(false);
      }
    },
    [session, summary, customer, engine, onSubmitPayment, setPaymentStatus, setPaymentResponse, setPaymentError, setStep, t]
  );

  // ─── Engine load error ───────────────────────────────
  if (loadError) {
    return (
      <div className="flex flex-col items-center py-8 space-y-4">
        <AlertTriangle className="size-10 text-amber-400" />
        <p className="text-sm text-red-600 text-center">{t('engine_error')}</p>
        <p className="text-xs text-gray-400 text-center max-w-xs">{loadError}</p>
        <Button
          variant="outline"
          onClick={() => {
            setLoadError(null);
            setEngineComponent(null);
          }}
          className="gap-2"
        >
          <RefreshCw className="size-4" />
          {t('engine_error_retry')}
        </Button>
      </div>
    );
  }

  // ─── Loading engine ──────────────────────────────────
  if (!EngineComponent) {
    const loadingMessage = t(getEngineLoadingKey(engine));
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <EngineLoadingSkeleton message={loadingMessage} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // ─── Render Engine ───────────────────────────────────
  const primaryColor = session?.branding.primary_color || '#0d9488';

  return (
    <div className="space-y-3">
      {/* Multi-Engine header indicator */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Layers className="size-3" />
        <span>{t('engine_provider_badge', { engine: engine === 'native' ? t('engine_native_badge') : engine })}</span>
      </div>

      {/* Engine adapter component */}
      <Suspense fallback={<EngineLoadingSkeleton message={t(getEngineLoadingKey(engine))} />}>
        <EngineComponent
          provider={provider || { engine: 'native' }}
          onTokenize={handleTokenize}
          isProcessing={isProcessing}
          primaryColor={primaryColor}
        />
      </Suspense>
    </div>
  );
}
