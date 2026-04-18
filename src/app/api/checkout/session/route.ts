// ─── GET /api/checkout/session ──────────────────────────────────────────────
// Returns the checkout session configuration with branding, fields, products,
// and per-method provider_data (multi-engine architecture).
//
// MULTI-ENGINE ARCHITECTURE:
// Each payment method has a `provider_data` object that tells the frontend
// which engine to use. The frontend reads `provider_data.card.engine` and
// dynamically loads the appropriate adapter (Stripe, Viva, SumUp, etc.).
//
// MB WAY & PIX are ALWAYS "native" — the frontend collects minimal data
// (phone / nothing) and the backend handles bank routing invisibly.

import { NextResponse } from 'next/server';
import type { CheckoutSession, CheckoutMode, PaymentMethodType, FieldType, ProductType, CollectedField, ProviderData } from '@/lib/checkout/types';

// ─── Provider Configurations (multi-engine) ──────────────────────────────────
// In production, these come from the merchant's configuration in the database.
// The backend can swap engines at runtime without frontend changes.

const PROVIDER_CONFIGS: Record<PaymentMethodType, ProviderData> = {
  card: {
    engine: 'native', // Change to 'stripe', 'viva', 'sumup', etc. to switch engine
    // --- Stripe example (uncomment to use) ---
    // engine: 'stripe',
    // publishable_key: 'pk_live_...',
    // script_url: 'https://js.stripe.com/v3/',
    // container_id: 'stripe-card-element',
    //
    // --- Viva Wallet example (uncomment to use) ---
    // engine: 'viva',
    // publishable_key: 'your-viva-token',
    // merchant_id: 'your-merchant-id',
    // script_url: 'https://demo.vivapayments.com/web/checkout/v2/js',
    // container_id: 'viva-card-container',
    // metadata: { sandbox: true },
    //
    // --- SumUp example (uncomment to use) ---
    // engine: 'sumup',
    // publishable_key: 'your-checkout-id',
    // merchant_id: 'your-merchant-code',
    // script_url: 'https://gateway.sumup.com/assets/js/checkout.js',
    // container_id: 'sumup-card-container',
    //
    // --- Generic IFrame example ---
    // engine: 'iframe',
    // iframe_url: 'https://payment-provider.com/checkout?token=abc',
  },

  // MB WAY is always native — NeXFlowX handles backend bank routing
  mbway: {
    engine: 'native',
    metadata: {
      backend_routing: true,
      // Backend can route to: Viva, Stripe, SIBS, or any acquirer
      // The frontend just collects the phone number
    },
  },

  // PIX is always native — NeXFlowX generates QR and processes payment
  pix: {
    engine: 'native',
    metadata: {
      backend_routing: true,
      // Backend generates PIX code and QR code
      // Frontend just displays the QR and polls for confirmation
    },
  },

  // IBAN / Bank Transfer is always native
  iban: {
    engine: 'native',
    metadata: {
      backend_routing: true,
    },
  },
};

// ─── Mock Data (in production this would come from a database) ──────────────

function createMockSession(mode: CheckoutMode): CheckoutSession {
  const branding = {
    primary_color: '#0d9488',   // teal-600
    accent_color: '#059669',    // emerald-600
    logo_url: '/merchant-logo.png',
    merchant_name: 'NovaSoft',
    support_email: 'suporte@novasoft.pt',
  };

  // Zero-Friction: ALL fields are optional (required: false).
  // The frontend never blocks on empty fields.
  const collected_fields: CollectedField[] = mode === 'mini-store'
    ? [
        { key: 'email' as FieldType, required: false, placeholder: 'seu@email.com', validation: 'email' },
        { key: 'name' as FieldType, required: false, placeholder: 'Nome Completo' },
        { key: 'nif' as FieldType, required: false, placeholder: '123456789', validation: 'nif' },
        { key: 'phone' as FieldType, required: false, placeholder: '+351 912 345 678' },
      ]
    : [
        { key: 'email' as FieldType, required: false, placeholder: 'seu@email.com', validation: 'email' },
        { key: 'name' as FieldType, required: false, placeholder: 'Nome Completo' },
        { key: 'address' as FieldType, required: false, placeholder: 'Rua, Número, Apartamento' },
        { key: 'city' as FieldType, required: false, placeholder: 'Lisboa' },
        { key: 'postal_code' as FieldType, required: false, placeholder: '1000-001' },
        { key: 'nif' as FieldType, required: false, placeholder: '123456789', validation: 'nif' },
        { key: 'phone' as FieldType, required: false, placeholder: '+351 912 345 678' },
      ];

  const products = mode === 'mini-store'
    ? [{
        id: 'prod_001',
        name: 'NovaSoft Pro - Licença Anual',
        description: 'Plataforma completa de gestão empresarial com análise avançada, relatórios automatizados e integração com mais de 50 serviços. Inclui suporte prioritário e formação online.',
        price: 299.90,
        currency: 'EUR',
        type: 'digital' as ProductType,
        image_url: '/product-demo.png',
        quantity: 1,
      }]
    : [
        {
          id: 'prod_001',
          name: 'NovaSoft Pro - Licença Anual',
          description: 'Plataforma completa de gestão empresarial',
          price: 249.90,
          currency: 'EUR',
          type: 'digital' as ProductType,
          quantity: 1,
        },
        {
          id: 'prod_002',
          name: 'NovaSoft Analytics Add-on',
          description: 'Módulo avançado de análise e relatórios',
          price: 49.90,
          currency: 'EUR',
          type: 'digital' as ProductType,
          quantity: 1,
        },
      ];

  const enabled_methods: PaymentMethodType[] = ['card', 'mbway', 'pix', 'iban'];

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  return {
    id: 'sess_' + Math.random().toString(36).substring(2, 15),
    mode,
    branding,
    collected_fields,
    products,
    enabled_methods,
    provider_data: { ...PROVIDER_CONFIGS },
    expires_at: expiresAt,
  };
}

// ─── Route Handler ──────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = (searchParams.get('mode') || 'mini-store') as CheckoutMode;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const session = createMockSession(mode);

  return NextResponse.json(session);
}
