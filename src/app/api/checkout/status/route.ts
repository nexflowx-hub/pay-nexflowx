// ─── GET /api/checkout/status ───────────────────────────────────────────────
// Polling endpoint to check payment status.

import { NextResponse } from 'next/server';
import { getPaymentStatus } from '../submit/route';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get('payment_id');

  if (!paymentId) {
    return NextResponse.json({ error: 'payment_id is required' }, { status: 400 });
  }

  const payment = getPaymentStatus(paymentId);

  if (!payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }

  // Simulate slight delay to feel realistic
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json({
    payment_id: payment.id,
    status: payment.status,
    updated_at: payment.updated_at,
  });
}
