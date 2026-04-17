'use client';

// ─── NeXFlowX Checkout Layout ───────────────────────────────────────────────
// Dual-mode layout: 'cart' (centered) and 'mini-store' (split-screen).

import React from 'react';
import { useCheckoutStore } from '@/lib/checkout/store';

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  const session = useCheckoutStore((s) => s.session);
  const step = useCheckoutStore((s) => s.step);

  if (!session) return null;

  const { mode, branding } = session;
  const isMiniStore = mode === 'mini-store';
  const isSuccess = step === 'success';

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-lg">{children}</div>
      </div>
    );
  }

  if (isMiniStore) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Desktop: Split layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:min-h-screen">
          {/* Left: Product showcase */}
          <div
            className="relative flex flex-col justify-between overflow-hidden p-8 xl:p-12"
            style={{
              background: `linear-gradient(135deg, ${branding.primary_color}, ${branding.accent_color})`,
            }}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10" />
              <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
              <div className="absolute right-20 top-1/2 h-40 w-40 rounded-full bg-white/5" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <img
                  src={branding.logo_url}
                  alt={branding.merchant_name}
                  className="h-8 w-8 rounded-md border-2 border-white/30 object-cover"
                />
                <span className="text-sm font-medium text-white/90">{branding.merchant_name}</span>
              </div>
            </div>

            {/* Product showcase */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-8">
              <div className="mb-6 rounded-2xl border-2 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <img
                  src={session.products[0]?.image_url || '/product-demo.png'}
                  alt={session.products[0]?.name}
                  className="h-48 w-48 rounded-xl object-cover shadow-2xl xl:h-56 xl:w-56"
                />
              </div>
              <h2 className="text-center text-2xl font-bold text-white xl:text-3xl">
                {session.products[0]?.name}
              </h2>
              <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-white/80">
                {session.products[0]?.description}
              </p>
            </div>

            {/* Bottom trust signal */}
            <div className="relative z-10 flex items-center gap-2 text-sm text-white/70">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Checkout seguro encriptado</span>
            </div>
          </div>

          {/* Right: Checkout form */}
          <div className="flex flex-col bg-white lg:overflow-y-auto">
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-8 xl:px-8">
              {children}
            </div>
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="flex flex-col lg:hidden">
          {/* Mobile product banner */}
          {session.products[0]?.image_url && (
            <div className="relative overflow-hidden p-6 pb-8" style={{
              background: `linear-gradient(135deg, ${branding.primary_color}, ${branding.accent_color})`,
            }}>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
              </div>
              <div className="relative z-10 flex gap-4">
                <img
                  src={session.products[0].image_url}
                  alt={session.products[0].name}
                  className="size-16 rounded-lg border-2 border-white/20 object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white">{session.products[0].name}</h2>
                  <p className="mt-1 text-xs text-white/80 line-clamp-2">{session.products[0].description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile form */}
          <div className="flex-1 bg-white px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-md">{children}</div>
          </div>
        </div>
      </div>
    );
  }

  // Cart mode: Centered single column
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        {children}
      </div>
    </div>
  );
}
