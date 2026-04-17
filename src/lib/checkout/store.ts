// ─── NeXFlowX Checkout Store (Zustand) ──────────────────────────────────────

import { create } from 'zustand';
import type {
  CheckoutSession,
  CheckoutStep,
  PaymentMethodType,
  PaymentStatus,
  Locale,
  CustomerData,
  PaymentResponse,
  OrderSummary,
} from './types';
import { detectLocale } from './i18n';

interface CheckoutState {
  // Session
  session: CheckoutSession | null;
  isLoadingSession: boolean;

  // Flow
  step: CheckoutStep;
  previousStep: CheckoutStep | null;

  // Locale
  locale: Locale;

  // Customer
  customer: CustomerData;

  // Payment
  selectedMethod: PaymentMethodType | null;
  paymentStatus: PaymentStatus;
  paymentResponse: PaymentResponse | null;
  paymentError: string | null;

  // Computed
  orderSummary: OrderSummary | null;

  // Actions
  setSession: (session: CheckoutSession) => void;
  setLoadingSession: (loading: boolean) => void;
  setStep: (step: CheckoutStep) => void;
  goBack: () => void;
  setLocale: (locale: Locale) => void;
  setCustomer: (data: Partial<CustomerData>) => void;
  setSelectedMethod: (method: PaymentMethodType) => void;
  setPaymentStatus: (status: PaymentStatus) => void;
  setPaymentResponse: (response: PaymentResponse | null) => void;
  setPaymentError: (error: string | null) => void;
  reset: () => void;
}

const initialCustomer: CustomerData = {
  email: '',
};

const initialState = {
  session: null,
  isLoadingSession: true,
  step: 'loading' as CheckoutStep,
  previousStep: null,
  locale: 'en' as Locale,
  customer: initialCustomer,
  selectedMethod: null,
  paymentStatus: 'idle' as PaymentStatus,
  paymentResponse: null,
  paymentError: null,
  orderSummary: null,
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  ...initialState,
  locale: detectLocale(),

  setSession: (session) => {
    const subtotal = session.products.reduce((acc, p) => acc + p.price * (p.quantity || 1), 0);
    const tax = Math.round(subtotal * 0.23 * 100) / 100; // 23% IVA
    const total = Math.round((subtotal + tax) * 100) / 100;
    const items = session.products.reduce((acc, p) => acc + (p.quantity || 1), 0);

    set({
      session,
      isLoadingSession: false,
      step: 'email',
      selectedMethod: session.enabled_methods[0] || null,
      orderSummary: {
        subtotal,
        tax,
        total,
        currency: session.products[0]?.currency || 'EUR',
        items,
      },
    });
  },

  setLoadingSession: (loading) => set({ isLoadingSession: loading }),

  setStep: (step) => set((state) => ({ step, previousStep: state.step })),

  goBack: () =>
    set((state) => {
      if (state.previousStep) {
        const prev = state.previousStep;
        return { step: prev, previousStep: null };
      }
      return {};
    }),

  setLocale: (locale) => set({ locale }),

  setCustomer: (data) =>
    set((state) => ({
      customer: { ...state.customer, ...data },
    })),

  setSelectedMethod: (method) => set({ selectedMethod: method }),

  setPaymentStatus: (status) => set({ paymentStatus: status }),

  setPaymentResponse: (response) => set({ paymentResponse: response }),

  setPaymentError: (error) => set({ paymentError: error }),

  reset: () => set(initialState),
}));
