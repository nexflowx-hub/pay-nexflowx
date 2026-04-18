// ─── GET /api/checkout/status?payment_id=xxx ─────────────────────────────────
// Pure proxy to NeXFlowX Core API.
// Forwards the payment_id and returns the current payment status.
//
// Proxy: GET {NEXFLOWX_API_URL}/api/v1/checkout-status/:payment_id
// No mocks. No in-memory stores. Pure pass-through.
//
// Status mapping: if core returns 'gateway_confirmed', it is forwarded as-is
// so the frontend can handle the full SDUI status lifecycle.

import { NextResponse } from 'next/server';
import { API_CONFIG, getCoreHeaders } from '@/lib/checkout/api-config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get('payment_id');

  if (!paymentId) {
    return NextResponse.json(
      { error: 'Missing required parameter: payment_id' },
      { status: 400 }
    );
  }

  try {
    const coreUrl = `${API_CONFIG.coreUrl}/api/v1/checkout-status/${encodeURIComponent(paymentId)}`;

    const coreResponse = await fetch(coreUrl, {
      method: 'GET',
      headers: getCoreHeaders(),
    });

    if (!coreResponse.ok) {
      const errorBody = await coreResponse.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'Core API error',
          status: coreResponse.status,
          detail: errorBody || undefined,
        },
        { status: coreResponse.status }
      );
    }

    const data = await coreResponse.json();

    // Forward the response as-is — frontend handles all status values
    // including 'gateway_confirmed' from the SDUI status lifecycle
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[status/proxy] Core API unavailable:', err);
    return NextResponse.json(
      {
        error: 'Payment service temporarily unavailable',
        detail: 'The core payment API is not responding. Please try again in a moment.',
      },
      { status: 502 }
    );
  }
}
