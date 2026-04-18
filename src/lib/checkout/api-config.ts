// ─── NeXFlowX API Configuration ───────────────────────────────────────────────
// Central API configuration with environment variable support.
// All backend routes import from here to proxy requests to the core API.

export const API_CONFIG = {
  /** Core API base URL — configurable via env var */
  coreUrl: process.env.NEXFLOWX_API_URL || 'https://api-core.nexflowx.tech',
  /** Core API key for Bearer auth — set via env var in production */
  coreKey: process.env.NEXFLOWX_API_KEY || '',
} as const;

/** Build standard headers for core API requests (Content-Type + optional Auth) */
export function getCoreHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (API_CONFIG.coreKey) {
    headers['Authorization'] = `Bearer ${API_CONFIG.coreKey}`;
  }
  return headers;
}
