'use client';

// ─── NeXFlowX Processing Screen ─────────────────────────────────────────────
// Full-page processing overlay with animation.

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';

export function ProcessingScreen() {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const { t } = useTranslation(locale);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[300px] flex-col items-center justify-center py-12"
    >
      {/* Animated spinner */}
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="size-16 rounded-full"
          style={{
            border: `3px solid ${session?.branding.primary_color}20`,
            borderTopColor: session?.branding.primary_color,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2
            className="size-5 animate-spin"
            style={{ color: session?.branding.primary_color }}
          />
        </div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-base font-semibold text-gray-900"
      >
        {t('processing_title')}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-1 text-sm text-gray-500"
      >
        {t('processing_desc')}
      </motion.p>

      {/* Animated dots */}
      <div className="mt-3 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="size-1.5 rounded-full"
            style={{ backgroundColor: session?.branding.primary_color }}
          />
        ))}
      </div>
    </motion.div>
  );
}
