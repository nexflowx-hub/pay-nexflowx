'use client';

// ─── NeXFlowX Additional Fields Step (Progressive Profiling - Step 2) ───────
// Dynamically renders fields based on collected_fields from the API.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, FileText, Phone, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import { isValidNIF } from '@/lib/checkout/utils';
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter out email field (already collected)
  const fields = (session?.collected_fields || []).filter((f) => f.key !== 'email');
  const hasFields = fields.length > 0;

  const validateField = (field: CollectedField, value: string): string => {
    if (field.required && !value.trim()) {
      return t('error_required');
    }
    if (field.validation === 'nif' && value.trim() && !isValidNIF(value)) {
      return t('nif_invalid');
    }
    if (field.validation === 'email' && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return t('email_invalid');
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = customer[field.key] || '';
      const error = validateField(field, value);
      if (error) newErrors[field.key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 300));
    setIsSubmitting(false);
    onNext();
  };

  if (!hasFields) {
    // No additional fields needed, skip
    onNext();
    return null;
  }

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
                  {t(`${field.key}_label` as keyof typeof import('@/lib/checkout/i18n').dictionaries['en']) || field.label || field.key}
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
                      if (errors[field.key]) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next[field.key];
                          return next;
                        });
                      }
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
                <AnimatePresence>
                  {errors[field.key] && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-red-500"
                    >
                      {errors[field.key]}
                    </motion.p>
                  )}
                </AnimatePresence>
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
              disabled={isSubmitting}
              className="h-11 flex-1 gap-1 font-semibold transition-all"
              style={{ backgroundColor: session?.branding.primary_color }}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  {t('continue_btn')}
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
