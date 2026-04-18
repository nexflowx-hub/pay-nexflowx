// ─── GET /api/checkout/session?txId=xxx ──────────────────────────────────────
// Pure proxy to NeXFlowX Core API.
// Forwards the transaction ID and returns the SDUI checkout session payload.
//
// Proxy: GET {NEXFLOWX_API_URL}/api/v1/checkout-session/:txId
// No mocks. No in-memory stores. Pure pass-through.

import { NextResponse } from 'next/server';
import { API_CONFIG, getCoreHeaders } from '@/lib/checkout/api-config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txId = searchParams.get('txId');

  if (!txId) {
    return NextResponse.json(
      { error: 'Missing required parameter: txId' },
      { status: 400 }
    );
  }

  try {
    const coreUrl = `${API_CONFIG.coreUrl}/api/v1/checkout-session/${encodeURIComponent(txId)}`;

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

    // Forward the response with cache control for session data
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[session/proxy] Core API unavailable:', err);
    return NextResponse.json(
      {
        error: 'Checkout service temporarily unavailable',
        detail: 'The core payment API is not responding. Please try again in a moment.',
      },
      { status: 502 }
    );
  }
}
