// ─── NeXFlowX Checkout Types ─────────────────────────────────────────────────
// Strict TypeScript types for the zero-redirect checkout system.

export type CheckoutMode = 'cart' | 'mini-store';

export type PaymentMethodType = 'card' | 'mbway' | 'pix' | 'iban';

export type CheckoutStep = 'loading' | 'email' | 'fields' | 'payment' | 'processing' | 'success';

export type PaymentStatus = 'idle' | 'pending' | 'processing' | 'confirmed' | 'failed';

export type Locale = 'pt' | 'en' | 'es' | 'fr';

export type FieldType = 'email' | 'name' | 'address' | 'city' | 'postal_code' | 'country' | 'nif' | 'phone';

export type ProductType = 'digital' | 'physical';

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
  // Card-specific
  card_token?: string;
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
