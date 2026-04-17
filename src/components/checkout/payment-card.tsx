'use client';

// ─── NeXFlowX Card Payment Form ─────────────────────────────────────────────
// Credit card form UI prepared for native Elements SDK injection.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, Lock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCheckoutStore } from '@/lib/checkout/store';
import { useTranslation } from '@/lib/checkout/i18n';
import type { PaymentSubmission, PaymentResponse } from '@/lib/checkout/types';

interface CardPaymentProps {
  onSubmitPayment: (submission: PaymentSubmission) => Promise<PaymentResponse>;
}

export function CardPayment({ onSubmitPayment }: CardPaymentProps) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const customer = useCheckoutStore((s) => s.customer);
  const summary = useCheckoutStore((s) => s.orderSummary);
  const setPaymentStatus = useCheckoutStore((s) => s.setPaymentStatus);
  const setPaymentResponse = useCheckoutStore((s) => s.setPaymentResponse);
  const setPaymentError = useCheckoutStore((s) => s.setPaymentError);
  const setStep = useCheckoutStore((s) => s.setStep);
  const { t } = useTranslation(locale);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState(customer.name || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsProcessing(true);
    setStep('processing');
    setPaymentStatus('processing');

    try {
      const response = await onSubmitPayment({
        session_id: session!.id,
        customer: { ...customer, name: cardName },
        method: 'card',
        amount: summary!.total,
        currency: summary!.currency,
      });

      setPaymentResponse(response);

      if (response.status === 'confirmed') {
        setPaymentStatus('confirmed');
        setStep('success');
      } else {
        setPaymentError(t('error_payment_failed'));
        setStep('payment');
      }
    } catch {
      setPaymentError(t('error_generic'));
      setStep('payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {/* SDK injection placeholder comment */}
      {/* <div id="card-elements-container">
        In production, inject Stripe/Paddle card elements here via SDK.
      </div> */}

      <Button
        type="submit"
        disabled={isProcessing}
        className="h-12 w-full gap-2 text-base font-semibold transition-all"
        style={{ backgroundColor: session?.branding.primary_color }}
      >
        {isProcessing ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <Lock className="size-4" />
            {t('pay_now')} {summary && `— ${summary.total.toFixed(2)}€`}
          </>
        )}
      </Button>

      <p className="text-center text-xs text-gray-400">
        🔒 {t('footer_secure')}
      </p>
    </form>
  );
}
