// ─── NeXFlowX Engine Registry ────────────────────────────────────────────────
// Central registry that maps engine identifiers to their React adapter components.
// To add a new engine, simply create an adapter and register it here.

import React from 'react';
import type { PaymentEngine } from '@/lib/checkout/types';
import type { EngineAdapterProps } from './native-engine';

// ─── Engine Registry Map ─────────────────────────────────────────────────────

type EngineComponent = React.ComponentType<EngineAdapterProps>;

const engineRegistry = new Map<string, () => Promise<EngineComponent>>();

// Register built-in engines (lazy-loaded for code splitting)
engineRegistry.set('native', async () => {
  const { NativeEngine } = await import('./native-engine');
  return NativeEngine as unknown as EngineComponent;
});

engineRegistry.set('stripe', async () => {
  const { StripeEngine } = await import('./stripe-engine');
  return StripeEngine as unknown as EngineComponent;
});

engineRegistry.set('viva', async () => {
  const { VivaEngine } = await import('./viva-engine');
  return VivaEngine as unknown as EngineComponent;
});

engineRegistry.set('sumup', async () => {
  const { SumUpEngine } = await import('./sumup-engine');
  return SumUpEngine as unknown as EngineComponent;
});

engineRegistry.set('iframe', async () => {
  const { IframeEngine } = await import('./iframe-engine');
  return IframeEngine as unknown as EngineComponent;
});

// Rede/Cielo (Brazil) uses similar flow to Stripe
engineRegistry.set('rede', async () => {
  const { IframeEngine } = await import('./iframe-engine');
  return IframeEngine as unknown as EngineComponent;
});

// PayPal (card via PayPal)
engineRegistry.set('paypal', async () => {
  const { IframeEngine } = await import('./iframe-engine');
  return IframeEngine as unknown as EngineComponent;
});

// ─── Registry Functions ─────────────────────────────────────────────────────

/**
 * Get the engine component for a given engine identifier.
 * Falls back to native engine if not found.
 */
export function getEngineComponent(engine: PaymentEngine): () => Promise<EngineComponent> {
  const loader = engineRegistry.get(engine);
  if (!loader) {
    // Unknown engine → fall back to native
    console.warn(`[NeXFlowX] Unknown engine "${engine}", falling back to native`);
    return engineRegistry.get('native')!;
  }
  return loader;
}

/**
 * Check if an engine is native (NeXFlowX built-in, no external SDK).
 */
export function isNativeEngine(engine: PaymentEngine): boolean {
  return engine === 'native';
}

/**
 * Get the i18n loading key for a specific engine.
 */
export function getEngineLoadingKey(engine: PaymentEngine): string {
  const keyMap: Record<string, string> = {
    stripe: 'engine_loading_stripe',
    viva: 'engine_loading_viva',
    sumup: 'engine_loading_sumup',
    rede: 'engine_loading_rede',
    paypal: 'engine_loading_paypal',
  };
  return keyMap[engine] || 'engine_loading';
}

/**
 * Register a custom engine at runtime.
 */
export function registerEngine(engine: PaymentEngine, loader: () => Promise<EngineComponent>): void {
  engineRegistry.set(engine, loader);
}
