'use client';

// ─── NeXFlowX Checkout Provider ─────────────────────────────────────────────
// Wraps the entire checkout and injects dynamic branding CSS variables.

import React, { useEffect, useMemo } from 'react';
import { useCheckoutStore } from '@/lib/checkout/store';
import type { CheckoutSession } from '@/lib/checkout/types';

interface CheckoutProviderProps {
  children: React.ReactNode;
  session: CheckoutSession;
}

export function CheckoutProvider({ children, session }: CheckoutProviderProps) {
  const setSession = useCheckoutStore((s) => s.setSession);

  useEffect(() => {
    setSession(session);
  }, [session, setSession]);

  // Inject dynamic CSS variables from branding
  const style = useMemo(() => {
    const { primary_color, accent_color } = session.branding;
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --checkout-primary: ${primary_color};
              --checkout-primary-foreground: #ffffff;
              --checkout-accent: ${accent_color};
              --checkout-accent-foreground: #ffffff;
            }
          `,
        }}
      />
    );
  }, [session.branding]);

  return (
    <>
      {style}
      {children}
    </>
  );
}
