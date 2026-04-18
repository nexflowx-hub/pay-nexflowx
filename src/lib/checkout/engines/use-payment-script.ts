// ─── NeXFlowX On-Demand Script Injector ──────────────────────────────────────
// Dynamically loads third-party payment SDK scripts ONLY when the user selects
// that payment method. No scripts in layout.tsx — zero bloat on initial load.

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ScriptState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UsePaymentScriptOptions {
  /** Script URL to inject (e.g., 'https://js.stripe.com/v3/') */
  url: string;
  /** Global variable to check if already loaded (e.g., 'Stripe') */
  globalName?: string;
  /** Whether to actually load the script (used to defer until needed) */
  enabled?: boolean;
  /** Script attributes (async, crossorigin, etc.) */
  attributes?: Record<string, string>;
  /** Timeout in ms before considering the script failed to load */
  timeoutMs?: number;
}

function checkScriptStatus(url: string, globalName?: string): 'loaded' | 'not_found' {
  if (globalName && typeof (globalThis as Record<string, unknown>)[globalName] !== 'undefined') {
    return 'loaded';
  }
  if (typeof document !== 'undefined' && document.querySelector(`script[src="${url}"]`) !== null) {
    return 'loaded';
  }
  return 'not_found';
}

export function usePaymentScript({
  url,
  globalName,
  enabled = true,
  attributes = {},
  timeoutMs = 15000,
}: UsePaymentScriptOptions): ScriptState & { reload: () => void } {
  // Reload counter to trigger re-injection
  const [reloadCount, setReloadCount] = useState(0);

  // Check pre-existing status synchronously on mount (before any effect)
  const initialStatus = typeof document !== 'undefined' ? checkScriptStatus(url, globalName) : 'not_found';

  const [state, setState] = useState<ScriptState>({
    isLoaded: initialStatus === 'loaded',
    isLoading: false,
    error: null,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Effect: only inject script if not already loaded and enabled
  // All setState calls are in ASYNC callbacks (onload, onerror, timeout) — not in the effect body
  useEffect(() => {
    if (!enabled) return;

    // Already loaded (initial check or from previous render)
    if (checkScriptStatus(url, globalName) === 'loaded') {
      return;
    }

    // Inject script tag (DOM manipulation only — no setState in effect body)
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    // Timeout handler (async callback — setState is fine here)
    timeoutRef.current = setTimeout(() => {
      setState({ isLoaded: false, isLoading: false, error: `Script load timeout (${timeoutMs}ms)` });
      script.remove();
    }, timeoutMs);

    // Script loaded successfully (async callback)
    script.addEventListener('load', () => {
      cleanup();
      setState({ isLoaded: true, isLoading: false, error: null });
    });

    // Script failed to load (async callback)
    script.addEventListener('error', () => {
      cleanup();
      setState({ isLoaded: false, isLoading: false, error: `Failed to load: ${url}` });
      script.remove();
    });

    document.head.appendChild(script);

    return () => {
      cleanup();
    };
  }, [enabled, url, reloadCount, globalName, attributes, timeoutMs, cleanup]);

  const reload = useCallback(() => {
    setReloadCount((c) => c + 1);
    setState({ isLoaded: false, isLoading: false, error: null });
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) existing.remove();
  }, [url]);

  // Derive final state: if isLoading was never set but we're waiting, compute it
  const isActivelyLoading = enabled && !state.isLoaded && !state.error;

  return {
    isLoaded: state.isLoaded,
    isLoading: state.isLoading || isActivelyLoading,
    error: state.error,
    reload,
  };
}
