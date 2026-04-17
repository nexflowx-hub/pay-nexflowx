'use client';

// ─── NeXFlowX Additional Fields Step (Zero-Friction — Step 2) ───────────────
// ALL fields are optional. No validation blocking. Clean labels (no "(Opcional)").
// Exception: Tax ID / NIF keeps its "(Opcional)" suffix.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, FileText, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import type { CollectedField } from '@/lib/checkout/types';

interface FieldsStepProps {
  onNext: () => void;
}

function getFieldIcon(key: string) {
  switch (key) {
    case 'name': return <User className="size-4" />;
    case 'address': return <MapPin className="size-4" />;
    case 'city': return <MapPin className="size-4" />;
    case 'postal_code': return <MapPin className="size-4" />;
    case 'nif': return <FileText className="size-4" />;
    case 'phone': return <Phone className="size-4" />;
    default: return <User className="size-4" />;
  }
}

export function FieldsStep({ onNext }: FieldsStepProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const customer = useCheckoutStore((s) => s.customer);
  const setCustomer = useCheckoutStore((s) => s.setCustomer);
  const session = useCheckoutStore((s) => s.session);
  const { t } = useTranslation(locale);

  // Filter out email field (already collected in step 1)
  const fields = (session?.collected_fields || []).filter((f) => f.key !== 'email');
  const hasFields = fields.length > 0;

  if (!hasFields) {
    onNext();
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Zero-friction: NO validation. Just advance.
    onNext();
  };

  // Get label for a field — NIF gets "(Opcional)", all others get clean labels
  const getFieldLabel = (field: CollectedField): string => {
    const i18nKey = `${field.key}_label`;
    const baseLabel = t(i18nKey as keyof typeof import('@/lib/checkout/i18n').dictionaries['en']) || field.label || field.key;
    // Only NIF gets the "(Opcional)" suffix
    if (field.key === 'nif') {
      return `${baseLabel} (${t('optional_suffix')})`;
    }
    return baseLabel;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="fields-step"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex size-7 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500">
              ✓
            </div>
            <span className="text-sm text-gray-500">{t('step_contact')}</span>
          </div>
          <div className="ml-3.5 flex flex-col gap-1">
            <div className="h-px w-0.5 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div
                className="flex size-7 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: session?.branding.primary_color }}
              >
                2
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{t('step_details')}</h2>
            </div>
            <div className="ml-9 mt-1 flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200" />
              <div
                className="flex size-7 items-center justify-center rounded-full text-xs font-bold border-2"
                style={{
                  borderColor: session?.branding.primary_color + '40',
                  color: session?.branding.primary_color + '80',
                }}
              >
                3
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence>
            {fields.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 15, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="overflow-hidden space-y-1.5"
              >
                <label className="text-sm font-medium text-gray-700" htmlFor={field.key}>
                  {getFieldLabel(field)}
                </label>
                <div className="relative">
                  {getFieldIcon(field.key) && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {getFieldIcon(field.key)}
                    </span>
                  )}
                  <Input
                    id={field.key}
                    type={field.validation === 'email' ? 'email' : 'text'}
                    value={customer[field.key] || ''}
                    onChange={(e) => {
                      setCustomer({ [field.key]: e.target.value });
                    }}
                    placeholder={
                      t(`${field.key}_placeholder` as keyof typeof import('@/lib/checkout/i18n').dictionaries['en']) ||
                      field.placeholder ||
                      ''
                    }
                    className={getFieldIcon(field.key) ? 'h-11 pl-10' : 'h-11'}
                    autoComplete={field.key}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => useCheckoutStore.getState().goBack()}
              className="h-11 gap-1"
            >
              <ArrowLeft className="size-4" />
              {t('back')}
            </Button>
            <Button
              type="submit"
              className="h-11 flex-1 gap-1 font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: session?.branding.primary_color }}
            >
              {t('continue_btn')}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
