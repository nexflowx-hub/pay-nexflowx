// ─── NeXFlowX Payment Engine Adapters ────────────────────────────────────────
// Each adapter is an isolated component that:
// 1. Loads its SDK script on demand (via usePaymentScript)
// 2. Renders the appropriate UI (SDK elements, iframe, or native form)
// 3. Calls onTokenize callback when payment data is ready
//
// The Multi-Engine Wrapper (payment-card.tsx) reads the engine field from
// provider_data and renders the correct adapter automatically.
//
// Architecture:
//   PaymentCard (Wrapper)
//   ├── NativeEngine  → NeXFlowX native card form (no external SDK)
//   ├── StripeEngine  → Loads stripe.js, renders CardElement
//   ├── VivaEngine    → Loads vivapayments script, creates iframe slot
//   ├── SumUpEngine   → Loads sumup script, renders card token
//   ├── RedeEngine    → Loads Rede/Cielo script, renders card form
//   ├── IframeEngine  → Generic iframe for any provider URL
//   └── (custom)      → Any future engine via the registry

export { NativeEngine } from './native-engine';
export { StripeEngine } from './stripe-engine';
export { VivaEngine } from './viva-engine';
export { SumUpEngine } from './sumup-engine';
export { IframeEngine } from './iframe-engine';
export { getEngineComponent, getEngineLoadingKey, isNativeEngine } from './registry';
