// ─── NeXFlowX Checkout Types ─────────────────────────────────────────────────
// Strict TypeScript types for the zero-redirect checkout system.

export type CheckoutMode = 'cart' | 'mini-store';

export type PaymentMethodType = 'card' | 'mbway' | 'pix' | 'iban';

export type CheckoutStep = 'loading' | 'email' | 'fields' | 'payment' | 'processing' | 'success';

export type PaymentStatus = 'idle' | 'pending' | 'processing' | 'confirmed' | 'failed';

export type Locale = 'pt' | 'en' | 'es' | 'fr';

export type FieldType = 'email' | 'name' | 'address' | 'city' | 'postal_code' | 'country' | 'nif' | 'phone';

export type ProductType = 'digital' | 'physical';

// ─── Payment Engines (multi-provider architecture) ─────────────────────────

export type PaymentEngine = 'native' | 'stripe' | 'viva' | 'sumup' | 'rede' | 'paypal' | 'iframe' | string;

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

export interface PaymentMethodConfig {
  type: PaymentMethodType;
  provider: ProviderData;
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

// ─── Checkout Session (from API) ────────────────────────────────────────────

export interface CheckoutSession {
  id: string;
  mode: CheckoutMode;
  branding: BrandingConfig;
  collected_fields: CollectedField[];
  products: CheckoutProduct[];
  enabled_methods: PaymentMethodType[];
  /** Per-method provider configuration (engine, keys, script URLs) */
  provider_data: Record<PaymentMethodType, ProviderData>;
  success_url?: string;
  cancel_url?: string;
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
  session_id: string;
  customer: CustomerData;
  method: PaymentMethodType;
  amount: number;
  currency: string;
  /** Which engine processed this payment */
  engine?: PaymentEngine;
  /** Token from the payment engine SDK (Stripe, Viva, etc.) */
  card_token?: string;
  /** Additional engine-specific payload */
  engine_data?: Record<string, unknown>;
  // MB WAY-specific
  phone?: string;
  // PIX-specific (server generates)
  // IBAN-specific
}

// ─── Payment Response ───────────────────────────────────────────────────────

export interface PaymentResponse {
  id: string;
  status: PaymentStatus;
  method: PaymentMethodType;
  // PIX-specific
  pix_code?: string;
  pix_qr_base64?: string;
  // IBAN-specific
  iban?: string;
  bank_name?: string;
  account_holder?: string;
  reference?: string;
  // General
  created_at: string;
  updated_at: string;
}

// ─── Polling Response ───────────────────────────────────────────────────────

export interface PollingResponse {
  payment_id: string;
  status: PaymentStatus;
  updated_at: string;
  receipt_url?: string;
}

// ─── Order Summary ──────────────────────────────────────────────────────────

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  items: number;
}
