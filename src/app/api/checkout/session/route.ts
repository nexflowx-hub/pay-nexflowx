// ─── GET /api/checkout/session ──────────────────────────────────────────────
// Returns the checkout session configuration with branding, fields, and products.

import { NextResponse } from 'next/server';
import type { CheckoutSession, CheckoutMode, PaymentMethodType, FieldType, ProductType, CollectedField } from '@/lib/checkout/types';

// ─── Mock Data (in production this would come from a database) ──────────────

function createMockSession(mode: CheckoutMode): CheckoutSession {
  const branding = {
    primary_color: '#0d9488',   // teal-600
    accent_color: '#059669',    // emerald-600
    logo_url: '/merchant-logo.png',
    merchant_name: 'NovaSoft',
    support_email: 'suporte@novasoft.pt',
  };

  const collected_fields: CollectedField[] = mode === 'mini-store'
    ? [
        { key: 'email' as FieldType, required: true, placeholder: 'seu@email.com', validation: 'email' },
        { key: 'name' as FieldType, required: true, placeholder: 'Nome Completo' },
        { key: 'nif' as FieldType, required: false, placeholder: '123456789', validation: 'nif' },
      ]
    : [
        { key: 'email' as FieldType, required: true, placeholder: 'seu@email.com', validation: 'email' },
        { key: 'name' as FieldType, required: true, placeholder: 'Nome Completo' },
        { key: 'address' as FieldType, required: true, placeholder: 'Rua, Número, Apartamento' },
        { key: 'city' as FieldType, required: true, placeholder: 'Lisboa' },
        { key: 'postal_code' as FieldType, required: true, placeholder: '1000-001' },
        { key: 'nif' as FieldType, required: false, placeholder: '123456789', validation: 'nif' },
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
