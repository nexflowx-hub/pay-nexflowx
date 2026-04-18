// ─── NeXFlowX Generic IFrame Engine ─────────────────────────────────────────
// A universal adapter that embeds ANY payment provider's IFrame.
// Used for providers that offer their own hosted payment form via IFrame.
//
// The backend provides an iframe_url in provider_data, and this adapter
// creates a secure sandboxed IFrame with postMessage communication.

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ExternalLink, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import type { ProviderData } from '@/lib/checkout/types';
import type { EngineAdapterProps } from './native-engine';

export function IframeEngine({ provider, onTokenize, primaryColor }: EngineAdapterProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const { t } = useTranslation(locale);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iframeUrl = provider.iframe_url;

  // Listen for postMessage from the IFrame
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Validate origin in production!
      // if (event.origin !== new URL(iframeUrl).origin) return;

      const data = event.data;

      if (data?.type === 'payment_token') {
        onTokenize({
          token: data.token,
          engineData: {
            provider: provider.engine,
            ...data.metadata,
          },
        });
      }

      if (data?.type === 'payment_error') {
        setError(data.message || t('error_generic'));
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [iframeUrl, provider.engine, onTokenize, t]);

  if (!iframeUrl) {
    return (
      <div className="flex flex-col items-center py-6 space-y-3">
        <ExternalLink className="size-10 text-amber-400" />
        <p className="text-sm text-gray-500 text-center">
          {t('engine_error')}
        </p>
        <p className="text-xs text-gray-400 text-center max-w-xs">
          No iframe_url provided in provider_data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* IFrame engine badge */}
      <div className="flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
        <ExternalLink className="size-4 text-gray-500" />
        <Badge variant="outline" className="border-gray-300 text-gray-600 text-[10px] font-semibold uppercase tracking-wider bg-gray-100">
          {provider.engine.toUpperCase()}
        </Badge>
        <span className="text-xs text-gray-500">
          {t('engine_provider_badge', { engine: provider.engine })}
        </span>
      </div>

      {/* IFrame container */}
      <div className="relative rounded-lg border border-gray-200 bg-white overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <Loader2 className="size-6 animate-spin text-gray-400" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={iframeUrl}
          className="w-full min-h-[220px]"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError('Failed to load payment form')}
          title="Payment Form"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      <p className="text-center text-xs text-gray-400">
        {t('footer_secure')}
      </p>
    </div>
  );
}
