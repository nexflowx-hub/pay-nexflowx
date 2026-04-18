// ─── NeXFlowX Checkout Store (Zustand) ──────────────────────────────────────
// SDUI-aware store: all UI driven by available_methods from the API.

import { create } from 'zustand';
import type {
  CheckoutSession,
  CheckoutStep,
  PaymentStatus,
  Locale,
  CustomerData,
  PaymentResponse,
  OrderSummary,
  AvailableMethod,
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

  // Payment — SDUI: selected by method ID (from available_methods)
  selectedMethodId: string | null;
  paymentStatus: PaymentStatus;
  paymentResponse: PaymentResponse | null;
  paymentError: string | null;

  // Computed
  orderSummary: OrderSummary | null;

  // Computed getter helpers
  /** Resolve the full AvailableMethod object for the currently selected method */
  get selectedMethod(): AvailableMethod | null;

  // Actions
  setSession: (session: CheckoutSession) => void;
  setLoadingSession: (loading: boolean) => void;
  setStep: (step: CheckoutStep) => void;
  goBack: () => void;
  setLocale: (locale: Locale) => void;
  setCustomer: (data: Partial<CustomerData>) => void;
  setSelectedMethodId: (methodId: string) => void;
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
  selectedMethodId: null as string | null,
  paymentStatus: 'idle' as PaymentStatus,
  paymentResponse: null,
  paymentError: null,
  orderSummary: null,
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  ...initialState,
  locale: detectLocale(),

  // Computed: resolve selectedMethod from selectedMethodId + available_methods
  get selectedMethod(): AvailableMethod | null {
    const { session, selectedMethodId } = get();
    if (!session || !selectedMethodId) return null;
    return session.available_methods.find((m) => m.id === selectedMethodId) ?? null;
  },

  setSession: (session) => {
    const subtotal = session.products.reduce((acc, p) => acc + p.price * (p.quantity || 1), 0);
    const tax = Math.round(subtotal * 0.23 * 100) / 100; // 23% IVA
    const total = Math.round((subtotal + tax) * 100) / 100;
    const items = session.products.reduce((acc, p) => acc + (p.quantity || 1), 0);

    set({
      session,
      isLoadingSession: false,
      step: 'email',
      selectedMethodId: session.available_methods[0]?.id ?? null,
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

  setSelectedMethodId: (methodId) => set({ selectedMethodId: methodId }),

  setPaymentStatus: (status) => set({ paymentStatus: status }),

  setPaymentResponse: (response) => set({ paymentResponse: response }),

  setPaymentError: (error) => set({ paymentError: error }),

  reset: () => set(initialState),
}));
