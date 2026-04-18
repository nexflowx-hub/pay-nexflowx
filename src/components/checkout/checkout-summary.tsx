'use client';

// ─── NeXFlowX Checkout Summary ──────────────────────────────────────────────
// Displays the order summary with product details, subtotal, generic tax line, and total.
// Tax line is ALWAYS visible (even if zero) — no hardcoded percentages.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { formatCurrency } from '@/lib/checkout/utils';
import { useState } from 'react';

export function CheckoutSummary() {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const summary = useCheckoutStore((s) => s.orderSummary);
  const { t } = useTranslation(locale);
  const [expanded, setExpanded] = useState(false);

  if (!session || !summary) return null;

  const { products, mode } = session;
  const isMiniStore = mode === 'embedded';

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{t('order_summary')}</h3>
          {products.length > 1 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              {products.length} {t('items')}
            </button>
          )}
        </div>

        {/* Product line items */}
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : isMiniStore ? 'auto' : 'auto' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="mt-3 flex gap-3"
              >
                {isMiniStore ? (
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        {!expanded && isMiniStore && (
                          <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{product.description}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(product.price * (product.quantity || 1), product.currency, '€')}
                        </p>
                        {(product.quantity || 1) > 1 && (
                          <Badge variant="secondary" className="mt-0.5 text-[10px]">
                            ×{product.quantity}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                          <Package className="size-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          {expanded && (
                            <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{product.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(product.price * (product.quantity || 1), product.currency, '€')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mini-store full description */}
        {isMiniStore && products[0] && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-xs leading-relaxed text-gray-500"
          >
            {products[0].description}
          </motion.p>
        )}
      </div>

      <Separator />

      {/* Totals */}
      <div className="p-4 sm:p-5">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t('subtotal')}</span>
            <span className="text-gray-700">{formatCurrency(summary.subtotal, summary.currency, '€')}</span>
          </div>
          {/* Generic tax line — ALWAYS visible, no hardcoded percentages */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t('taxes_fees')}</span>
            <span className={summary.tax === 0 ? 'text-gray-400' : 'text-gray-700'}>
              {formatCurrency(summary.tax, summary.currency, '€')}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-base font-bold text-gray-900">{t('total')}</span>
            <span
              className="text-lg font-bold"
              style={{ color: session.branding.primary_color }}
            >
              {formatCurrency(summary.total, summary.currency, '€')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
