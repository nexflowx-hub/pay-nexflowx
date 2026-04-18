// ─── NeXFlowX Native Card Engine ─────────────────────────────────────────────
// NeXFlowX's own card form. No external SDK. Card data is collected client-side
// and sent to the backend for processing (ideal for PCI-compliant server flow).

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock, Loader2, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import type { ProviderData } from '@/lib/checkout/types';

export interface EngineAdapterProps {
  provider: ProviderData;
  onTokenize: (data: { token: string; engineData?: Record<string, unknown> }) => void;
  isProcessing: boolean;
  primaryColor: string;
}

export function NativeEngine({ provider, onTokenize, isProcessing, primaryColor }: EngineAdapterProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const customer = useCheckoutStore((s) => s.customer);
  const { t } = useTranslation(locale);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState(customer.name || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, '').substring(0, 16);
    const parts = v.match(/.{1,4}/g);
    return parts ? parts.join(' ') : '';
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) return v.substring(0, 2) + '/' + v.substring(2);
    return v;
  };

  const detectCardBrand = (number: string): string => {
    const digits = number.replace(/\s/g, '');
    if (digits.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
    if (digits.startsWith('3')) return 'amex';
    return 'unknown';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Required';
    if (cardExpiry.length < 5) newErrors.cardExpiry = 'Required';
    if (cardCvc.length < 3) newErrors.cardCvc = 'Required';
    if (!cardName.trim()) newErrors.cardName = t('name_required');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Tokenize: in native mode, we pass card data directly.
    // In production, this would use a PCI-compliant iframe or server-side tokenization.
    const brand = detectCardBrand(cardNumber);
    const [expMonth, expYear] = cardExpiry.split('/');

    onTokenize({
      token: `nexflowx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
      engineData: {
        card_last4: cardNumber.replace(/\s/g, '').slice(-4),
        card_brand: brand,
        exp_month: expMonth,
        exp_year: '20' + expYear,
        cardholder_name: cardName,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Native engine badge */}
      <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
        <Shield className="size-4 text-emerald-600" />
        <Badge variant="outline" className="border-emerald-300 text-emerald-700 text-[10px] font-semibold uppercase tracking-wider bg-emerald-100">
          {t('engine_native_badge')}
        </Badge>
        <span className="text-xs text-emerald-600">{t('engine_native_desc')}</span>
      </div>

      {/* Card number */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">{t('card_number')}</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(formatCardNumber(e.target.value));
              if (errors.cardNumber) setErrors((p) => ({ ...p, cardNumber: '' }));
            }}
            placeholder={t('card_number_placeholder')}
            className="h-11 pl-10 font-mono tracking-wider"
            autoComplete="cc-number"
          />
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">{t('card_expiry')}</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              inputMode="numeric"
              value={cardExpiry}
              onChange={(e) => {
                setCardExpiry(formatExpiry(e.target.value));
                if (errors.cardExpiry) setErrors((p) => ({ ...p, cardExpiry: '' }));
              }}
              placeholder={t('card_expiry_placeholder')}
              className="h-11 pl-10 font-mono"
              autoComplete="cc-exp"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">{t('card_cvc')}</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              inputMode="numeric"
              value={cardCvc}
              onChange={(e) => {
                setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 4));
                if (errors.cardCvc) setErrors((p) => ({ ...p, cardCvc: '' }));
              }}
              placeholder={t('card_cvc_placeholder')}
              className="h-11 pl-10 font-mono"
              autoComplete="cc-csc"
            />
          </div>
        </div>
      </div>

      {/* Cardholder name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">{t('card_name')}</label>
        <Input
          type="text"
          value={cardName}
          onChange={(e) => {
            setCardName(e.target.value);
            if (errors.cardName) setErrors((p) => ({ ...p, cardName: '' }));
          }}
          placeholder={t('card_name_placeholder')}
          className="h-11"
          autoComplete="cc-name"
        />
      </div>

      {/* Submit */}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isProcessing}
          className="h-12 w-full gap-2 text-base font-semibold transition-all"
          style={{ backgroundColor: primaryColor }}
        >
          {isProcessing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <Lock className="size-4" />
              {t('pay_now')}
            </>
          )}
        </Button>
      </motion.div>

      <p className="text-center text-xs text-gray-400">
        {t('footer_secure')}
      </p>
    </form>
  );
}
