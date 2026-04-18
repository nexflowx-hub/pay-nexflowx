// ─── POST /api/checkout/submit ──────────────────────────────────────────────
// Pure proxy to NeXFlowX Core API.
// Forwards the entire payment submission body and returns the payment response.
//
// Proxy: POST {NEXFLOWX_API_URL}/api/v1/checkout-submit
// No mocks. No in-memory stores. Pure pass-through.

import { NextResponse } from 'next/server';
import { API_CONFIG, getCoreHeaders } from '@/lib/checkout/api-config';

export async function POST(request: Request) {
  try {
    // Read the request body from the client
    const body = await request.json();

    // Validate minimum required fields
    if (!body.tx_id) {
      return NextResponse.json(
        { error: 'Missing required field: tx_id' },
        { status: 400 }
      );
    }

    if (!body.method_id) {
      return NextResponse.json(
        { error: 'Missing required field: method_id' },
        { status: 400 }
      );
    }

    const coreUrl = `${API_CONFIG.coreUrl}/api/v1/checkout-submit`;

    const coreResponse = await fetch(coreUrl, {
      method: 'POST',
      headers: getCoreHeaders(),
      body: JSON.stringify(body),
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

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[submit/proxy] Core API unavailable:', err);
    return NextResponse.json(
      {
        error: 'Payment service temporarily unavailable',
        detail: 'The core payment API is not responding. Please try again in a moment.',
      },
      { status: 502 }
    );
  }
}
