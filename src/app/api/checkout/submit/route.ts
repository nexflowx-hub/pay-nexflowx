// ─── POST /api/checkout/submit ──────────────────────────────────────────────
// Submits the payment and returns a payment response.

import { NextResponse } from 'next/server';
import type { PaymentSubmission, PaymentResponse, PaymentMethodType } from '@/lib/checkout/types';

// In-memory store for demo (production would use a real database)
const paymentStore = new Map<string, PaymentResponse>();

export async function POST(request: Request) {
  const body: PaymentSubmission = await request.json();

  const { session_id, customer, method, amount, currency, phone } = body;

  // Simulate processing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const paymentId = 'pay_' + Math.random().toString(36).substring(2, 15);
  const now = new Date().toISOString();

  let response: PaymentResponse;

  switch (method) {
    case 'card': {
      // Simulate instant confirmation for cards
      response = {
        id: paymentId,
        status: 'confirmed',
        method,
        created_at: now,
        updated_at: now,
      };
      break;
    }

    case 'mbway': {
      // MB WAY is async - starts pending
      response = {
        id: paymentId,
        status: 'pending',
        method,
        phone,
        created_at: now,
        updated_at: now,
      };
      // Simulate auto-confirmation after 15 seconds for demo
      setTimeout(() => {
        const stored = paymentStore.get(paymentId);
        if (stored && stored.status === 'pending') {
          stored.status = 'confirmed';
          stored.updated_at = new Date().toISOString();
        }
      }, 15000);
      break;
    }

    case 'pix': {
      // PIX - generate code and QR, async
      const pixCode = `00020126580014br.gov.bcb.pix0136novasoft5204000053039865404${amount.toFixed(2)}5802BR5925NOVASOFTECNOLOGIA6009SAOPAULO62070503***6304ABCD`;
      response = {
        id: paymentId,
        status: 'pending',
        method,
        pix_code: pixCode,
        created_at: now,
        updated_at: now,
      };
      // Simulate auto-confirmation after 20 seconds for demo
      setTimeout(() => {
        const stored = paymentStore.get(paymentId);
        if (stored && stored.status === 'pending') {
          stored.status = 'confirmed';
          stored.updated_at = new Date().toISOString();
        }
      }, 20000);
      break;
    }

    case 'iban': {
      // Bank transfer - manual confirmation
      response = {
        id: paymentId,
        status: 'pending',
        method,
        iban: 'PT50 1234 5678 9012 3456 78901',
        bank_name: 'Banco Novo',
        account_holder: 'NovaSoft Tecnologia Lda.',
        reference: `NF-${Date.now().toString(36).toUpperCase()}`,
        created_at: now,
        updated_at: now,
      };
      break;
    }

    default: {
      const exhaustive: never = method;
      throw new Error(`Unhandled payment method: ${exhaustive}`);
    }
  }

  // Store for polling
  paymentStore.set(paymentId, response);

  return NextResponse.json(response);
}

// ─── Helper for polling endpoint ────────────────────────────────────────────

export function getPaymentStatus(paymentId: string): PaymentResponse | undefined {
  return paymentStore.get(paymentId);
}
