// ─── NeXFlowX Checkout Types ─────────────────────────────────────────────────
// Server-Driven UI (SDUI) types for the zero-redirect checkout system.
// The backend defines what payment methods are available, what fields to collect,
// and how each method should render — the frontend is a pure interpreter.

// ─── Primitives ──────────────────────────────────────────────────────────────

export type Locale = 'pt' | 'en' | 'es' | 'fr';

export type FieldType = 'email' | 'name' | 'address' | 'city' | 'postal_code' | 'country' | 'nif' | 'phone';

export type ProductType = 'digital' | 'physical';

export type CheckoutStep = 'loading' | 'email' | 'fields' | 'payment' | 'processing' | 'success';

// ─── Payment Method Type (SDUI — extensible) ─────────────────────────────────
// New values: credit_card, mbway_native, pix_static, bank_transfer.
// The `| string` suffix allows future method types without a type change.

export type PaymentMethodType =
  | 'credit_card'
  | 'mbway_native'
  | 'pix_static'
  | 'bank_transfer'
  | string;

// ─── Payment Status (SDUI — full lifecycle) ──────────────────────────────────

export type PaymentStatus =
  | 'idle'
  | 'pending'
  | 'processing'
  | 'gateway_confirmed'
  | 'failed'
  | 'expired'
  | string;

// ─── Payment Engine (multi-provider architecture) ────────────────────────────

export type PaymentEngine = 'native' | 'stripe' | 'viva' | 'sumup' | 'rede' | 'paypal' | 'iframe' | string;

// ─── Provider Data (per-method engine config) ────────────────────────────────
// The backend tells the frontend HOW to render each payment method.

export interface ProviderData {
  /** Engine identifier: 'native', 'stripe', 'viva', 'sumup', 'rede', 'paypal', 'iframe', or custom */
  engine: PaymentEngine;
  /** Publishable/api key for the provider */
  publishable_key?: string;
  /** Merchant identifier */
  merchant_id?: string;
  /** Account ID (e.g., Stripe Connect) */
  account_id?: string;
  /** On-demand script URL to inject */
  script_url?: string;
  /** Generic iframe URL for iframe engine */
  iframe_url?: string;
  /** Target container ID for SDK injection */
  container_id?: string;
  /** Provider-specific metadata */
  metadata?: Record<string, string | number | boolean>;
  /** Display label override */
  label?: string;
  /** Display icon override (URL) */
  icon_url?: string;
}

// ─── Available Method (SDUI — drives all frontend rendering) ─────────────────
// Each method is a self-describing object from the server.
// The frontend iterates over `available_methods` and renders accordingly.

export interface AvailableMethod {
  /** Unique method identifier (used in PaymentSubmission.method_id) */
  id: string;
  /** Method type — drives which component to render */
  type: PaymentMethodType;
  /** Display label (e.g. "Visa / Mastercard", "MB WAY") */
  label: string;
  /** Optional description text */
  description?: string;
  /** Icon URL for the method badge */
  icon_url?: string;
  /** Engine & SDK configuration for this method */
  provider_data: ProviderData;
}

// ─── Branding Config (from API) ─────────────────────────────────────────────

export interface BrandingConfig {
  primary_color: string;
  accent_color: string;
  logo_url: string;
  merchant_name: string;
  support_email?: string;
}

// ─── Collected Fields (from API) ────────────────────────────────────────────

export interface CollectedField {
  key: FieldType;
  label?: string;
  required: boolean;
  placeholder?: string;
  validation?: 'email' | 'phone' | 'nif' | 'text';
}

// ─── Product ────────────────────────────────────────────────────────────────

export interface CheckoutProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: ProductType;
  image_url?: string;
  quantity?: number;
}

// ─── Checkout Session (SDUI — from core API) ────────────────────────────────
// This is the server-driven payload that fully defines the checkout experience.
// No hardcoded payment methods — everything comes from `available_methods`.

export interface CheckoutSession {
  /** Transaction ID (used in URL: /checkout/:txId) */
  tx_id: string;
  /** Display mode: embedded (iframe/widget) or redirect (full page) */
  mode: 'embedded' | 'redirect';
  /** Merchant branding configuration */
  branding: BrandingConfig;
  /** Fields to collect from the customer */
  collected_fields: CollectedField[];
  /** Products in this checkout */
  products: CheckoutProduct[];
  /** Available payment methods (SDUI — drives all rendering) */
  available_methods: AvailableMethod[];
  /** Redirect URL after successful payment */
  return_url?: string;
  /** Redirect URL if user cancels */
  cancel_url?: string;
  /** Preferred locale */
  locale?: Locale;
  /** ISO 8601 expiry timestamp */
  expires_at: string;
}

// ─── Customer Data ──────────────────────────────────────────────────────────

export interface CustomerData {
  email: string;
  name?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  nif?: string;
  phone?: string;
}

// ─── Payment Submission ─────────────────────────────────────────────────────

export interface PaymentSubmission {
  /** Transaction ID from CheckoutSession */
  tx_id: string;
  /** Customer data (fields collected during checkout) */
  customer: CustomerData;
  /** Method ID from available_methods[] */
  method_id: string;
  /** Method type from available_methods[].type */
  method_type: PaymentMethodType;
  /** Payment amount */
  amount: number;
  /** Currency code (ISO 4217) */
  currency: string;
  /** Which engine processed this payment */
  engine?: PaymentEngine;
  /** Token from the payment engine SDK (Stripe, Viva, etc.) */
  card_token?: string;
  /** Additional engine-specific payload */
  engine_data?: Record<string, unknown>;
  /** MB WAY phone number */
  phone?: string;
}

// ─── Payment Response ───────────────────────────────────────────────────────

export interface PaymentResponse {
  /** Unique payment ID (used for polling) */
  payment_id: string;
  /** Transaction ID */
  tx_id: string;
  /** Current payment status */
  status: PaymentStatus;
  /** Method type used */
  method_type: PaymentMethodType;
  // ─── PIX fields ─────────────────────────────────────
  pix_code?: string;
  pix_qr_base64?: string;
  pix_key?: string;
  // ─── Bank Transfer fields ───────────────────────────
  iban?: string;
  swift_bic?: string;
  bank_name?: string;
  account_holder?: string;
  reference?: string;
  // ─── General ────────────────────────────────────────
  return_url?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

// ─── Polling Response ───────────────────────────────────────────────────────

export interface PollingResponse {
  payment_id: string;
  tx_id: string;
  status: PaymentStatus;
  method_type: PaymentMethodType;
  return_url?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

// ─── Order Summary ──────────────────────────────────────────────────────────

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  items: number;
}

// ─── Legacy Aliases (for gradual migration) ─────────────────────────────────
// These allow existing frontend code to compile during the migration period.

/** @deprecated Use 'credit_card' */
export type CardMethodType = 'card';

/** @deprecated Use PaymentResponse.payment_id */
export type PaymentResponseId = string;

/** @deprecated Use CheckoutSession.tx_id */
export type SessionId = string;
