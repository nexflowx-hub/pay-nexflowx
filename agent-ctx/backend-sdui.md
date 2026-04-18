# Task ID: backend-sdui — Backend SDUI Agent Work Record

## Objective
Refactor the backend layer for Server-Driven UI (SDUI) proxy architecture. Remove all mock data, create centralized API configuration, rewrite types, and convert all API routes to pure proxies to the NeXFlowX Core API.

## Files Created
1. **`.env.example`** — Template with all env vars (Core API URL/key, Stripe PK, Viva Wallet, SumUp)
2. **`.env.local`** — Local copy with placeholder values
3. **`src/lib/checkout/api-config.ts`** — Central API config module with `API_CONFIG` and `getCoreHeaders()`

## Files Rewritten
4. **`src/lib/checkout/types.ts`** — Complete SDUI type system overhaul
5. **`src/app/api/checkout/session/route.ts`** — Pure proxy (was mock)
6. **`src/app/api/checkout/submit/route.ts`** — Pure proxy (was mock with in-memory store)
7. **`src/app/api/checkout/status/route.ts`** — Pure proxy (was mock with setTimeout simulations)

## Key Type Changes
| Old | New |
|-----|-----|
| `PaymentMethodType = 'card' \| 'mbway' \| 'pix' \| 'iban'` | `'credit_card' \| 'mbway_native' \| 'pix_static' \| 'bank_transfer' \| string` |
| `PaymentStatus = 'idle' \| 'pending' \| 'processing' \| 'confirmed' \| 'failed'` | `'idle' \| 'pending' \| 'processing' \| 'gateway_confirmed' \| 'failed' \| 'expired' \| string` |
| `CheckoutSession.id` | `CheckoutSession.tx_id` |
| `CheckoutSession.mode: 'cart' \| 'mini-store'` | `CheckoutSession.mode: 'embedded' \| 'redirect'` |
| `CheckoutSession.enabled_methods` | `CheckoutSession.available_methods: AvailableMethod[]` |
| `CheckoutSession.provider_data` | Moved into `AvailableMethod.provider_data` |
| `PaymentSubmission.session_id` | `PaymentSubmission.tx_id` |
| `PaymentSubmission.method` | `PaymentSubmission.method_id` + `method_type` |
| `PaymentResponse.id` | `PaymentResponse.payment_id` |
| `PaymentResponse.method` | `PaymentResponse.method_type` |

## New Interfaces
- **`AvailableMethod`** — Self-describing payment method from server (id, type, label, description, icon_url, provider_data)

## Verification
- ✅ `bun run lint` — Zero ESLint errors
- ✅ Dev server compiles successfully (`✓ Compiled in 131ms`)
- ✅ API routes respond correctly (400 for missing txId as expected)

## Notes for Next Tasks
- Frontend components (store.ts, page.tsx, payment-selector.tsx, payment-card.tsx, checkout-body.tsx, etc.) still reference old property names
- The `PaymentMethodType` union includes `| string` so all comparisons compile, but runtime values need updating
- Frontend migration task should update: `session.id` → `session.tx_id`, `enabled_methods` → `available_methods`, method type literals, etc.
