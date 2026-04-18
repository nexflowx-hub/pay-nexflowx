// ─── NeXFlowX Checkout i18n ─────────────────────────────────────────────────
// Lightweight dictionary-based translation system with auto-detection.

import type { Locale } from './types';

// ─── Translation Dictionaries ───────────────────────────────────────────────

type TranslationKeys = typeof dictionaries['en'];

const dictionaries = {
  pt: {
    // Header
    secure_checkout: 'Checkout - Encrypted',
    powered_by: 'Processado por',
    change_language: 'Alterar idioma',

    // Steps
    step_contact: 'Informações de Contacto',
    step_details: 'Dados Adicionais',
    step_payment: 'Método de Pagamento',

    // Email step
    email_label: 'Endereço de Email',
    email_placeholder: 'seu@email.com',
    email_required: 'O email é obrigatório',
    email_invalid: 'Insira um email válido',
    continue_btn: 'Continuar',

    // Fields
    name_label: 'Nome Completo',
    name_placeholder: 'João Silva',
    name_required: 'O nome é obrigatório',
    address_label: 'Morada',
    address_placeholder: 'Rua, Número, Apartamento',
    city_label: 'Cidade',
    city_placeholder: 'Lisboa',
    postal_code_label: 'Código Postal',
    postal_code_placeholder: '1000-001',
    nif_label: 'NIF',
    nif_placeholder: '123456789',
    nif_invalid: 'NIF deve ter 9 dígitos',
    phone_label: 'Telefone',
    phone_placeholder: '+351 912 345 678',
    contact_label: 'Contacto (Tel / WhatsApp)',
    contact_placeholder: '+351 912 345 678',
    optional_suffix: 'Opcional',

    // Payment methods
    payment_method: 'Método de Pagamento',
    card_title: 'Cartão de Crédito',
    card_desc: 'Visa, Mastercard, Amex',
    card_number: 'Número do Cartão',
    card_number_placeholder: '4242 4242 4242 4242',
    card_expiry: 'Data de Validade',
    card_expiry_placeholder: 'MM/AA',
    card_cvc: 'CVC',
    card_cvc_placeholder: '123',
    card_name: 'Nome no Cartão',
    card_name_placeholder: 'João Silva',
    pay_now: 'Pagar Agora',

    // Engine system
    engine_loading: 'A carregar motor de pagamento...',
    engine_loading_stripe: 'A carregar Stripe...',
    engine_loading_viva: 'A carregar Viva Wallet...',
    engine_loading_sumup: 'A carregar SumUp...',
    engine_loading_rede: 'A carregar Rede...',
    engine_loading_paypal: 'A carregar PayPal...',
    engine_error: 'Erro ao carregar motor de pagamento',
    engine_error_retry: 'Tentar novamente',
    engine_native_badge: 'Nativo',
    engine_native_desc: 'Processado diretamente pela NeXFlowX',
    engine_provider_badge: 'Motor: {engine}',
    mbway_native_badge: 'NeXFlowX Nativo',
    mbway_native_desc: 'Banco selecionado automaticamente pelo backend',
    pix_native_badge: 'NeXFlowX Nativo',
    pix_native_desc: 'QR gerado e processado pela NeXFlowX',

    mbway_title: 'MB WAY',
    mbway_desc: 'Pague pela sua app MB WAY',
    mbway_phone_label: 'Número Telemóvel',
    mbway_phone_placeholder: '912 345 678',
    mbway_invalid_phone: 'Número deve ter 9 dígitos',
    mbway_send_btn: 'Enviar Pedido MB WAY',
    mbway_polling_title: 'A aprovar pagamento...',
    mbway_polling_desc: 'Abra a sua app MB WAY e confirme o pagamento',
    mbway_timeout: 'Tempo esgotado. Tente novamente.',
    mbway_approved: 'Pagamento aprovado!',

    pix_title: 'PIX',
    pix_desc: 'Escaneie o QR Code ou copie o código',
    pix_copy_btn: 'Copiar Código PIX',
    pix_copied: 'Copiado!',
    pix_instructions: '1. Abra a app do seu banco\n2. Selecione PIX\n3. Escaneie o QR Code ou cole o código\n4. Confirme o pagamento',
    pix_waiting: 'À espera do pagamento PIX...',

    iban_title: 'Transferência Bancária',
    iban_desc: 'Pague por transferência para a conta abaixo',
    iban_bank: 'Banco',
    iban_account: 'IBAN',
    iban_holder: 'Titular da Conta',
    iban_reference: 'Referência',
    iban_copy_btn: 'Copiar IBAN',
    iban_confirm_btn: 'Já efetuei a transferência',
    iban_confirm_title: 'Pagamento Registado',
    iban_confirm_desc: 'O seu pagamento será verificado em até 2 dias úteis. Receberá uma confirmação por email.',
    iban_instructions: 'Faça uma transferência para os dados abaixo e clique em "Já efetuei a transferência" quando terminar.',

    // Summary
    order_summary: 'Resumo do Pedido',
    subtotal: 'Subtotal',
    tax: 'IVA',
    taxes_fees: 'Taxas e Encargos',
    total: 'Total',
    items: 'itens',
    quantity: 'Qtd',

    // Success
    success_title: 'Pagamento Confirmado!',
    success_subtitle: 'O seu pedido foi processado com sucesso.',
    success_order_id: 'N.º do Pedido',
    success_email_sent: 'Enviámos a confirmação para',
    success_download: 'Aceder ao Produto',
    success_back: 'Voltar à Loja',
    success_thank_you: 'Obrigado pela sua compra!',

    // Processing
    processing_title: 'A processar pagamento...',
    processing_desc: 'Por favor aguarde enquanto confirmamos o seu pagamento.',
    please_wait: 'Aguarde...',

    // Errors
    error_generic: 'Ocorreu um erro. Tente novamente.',
    error_payment_failed: 'Falha no pagamento. Tente outro método.',
    error_session_expired: 'Sessão expirada.',
    error_required: 'Este campo é obrigatório',

    // Footer
    footer_secure: 'Pagamento 100% seguro e criptografado',
    footer_terms: 'Termos e Condições',
    footer_privacy: 'Política de Privacidade',
    footer_refund: 'Política de Devoluções',

    // Misc
    currency_prefix: '',
    currency_suffix: '€',
    close: 'Fechar',
    back: 'Voltar',
    or: 'ou',
    dismiss: 'Fechar',

    // SDUI errors
    error_session_no_txid: 'ID de transação não encontrado na URL.',
    retry: 'Tentar novamente',
    redirecting_in: 'A redirecionar em {seconds}s...',
    redirect_close: 'Pode fechar esta janela',
    method_not_supported: 'Método de pagamento não suportado',
    loading_session: 'A carregar sessão de pagamento...',
  },
  en: {
    secure_checkout: 'Checkout - Encrypted',
    powered_by: 'Processed by',
    change_language: 'Change language',

    step_contact: 'Contact Information',
    step_details: 'Additional Details',
    step_payment: 'Payment Method',

    email_label: 'Email Address',
    email_placeholder: 'you@email.com',
    email_required: 'Email is required',
    email_invalid: 'Enter a valid email',
    continue_btn: 'Continue',

    name_label: 'Full Name',
    name_placeholder: 'John Doe',
    name_required: 'Name is required',
    address_label: 'Address',
    address_placeholder: 'Street, Number, Apartment',
    city_label: 'City',
    city_placeholder: 'London',
    postal_code_label: 'Postal Code',
    postal_code_placeholder: 'SW1A 1AA',
    nif_label: 'Tax ID',
    nif_placeholder: '123456789',
    nif_invalid: 'Tax ID must be valid',
    phone_label: 'Phone',
    phone_placeholder: '+44 20 7946 0958',
    contact_label: 'Contact (Phone / WhatsApp)',
    contact_placeholder: '+44 20 7946 0958',
    optional_suffix: 'Optional',

    payment_method: 'Payment Method',
    card_title: 'Credit Card',
    card_desc: 'Visa, Mastercard, Amex',
    card_number: 'Card Number',
    card_number_placeholder: '4242 4242 4242 4242',
    card_expiry: 'Expiry Date',
    card_expiry_placeholder: 'MM/YY',
    card_cvc: 'CVC',
    card_cvc_placeholder: '123',
    card_name: 'Name on Card',
    card_name_placeholder: 'John Doe',
    pay_now: 'Pay Now',

    engine_loading: 'Loading payment engine...',
    engine_loading_stripe: 'Loading Stripe...',
    engine_loading_viva: 'Loading Viva Wallet...',
    engine_loading_sumup: 'Loading SumUp...',
    engine_loading_rede: 'Loading Rede...',
    engine_loading_paypal: 'Loading PayPal...',
    engine_error: 'Failed to load payment engine',
    engine_error_retry: 'Try again',
    engine_native_badge: 'Native',
    engine_native_desc: 'Processed directly by NeXFlowX',
    engine_provider_badge: 'Engine: {engine}',
    mbway_native_badge: 'NeXFlowX Native',
    mbway_native_desc: 'Bank selected automatically by backend',
    pix_native_badge: 'NeXFlowX Native',
    pix_native_desc: 'QR generated and processed by NeXFlowX',

    mbway_title: 'MB WAY',
    mbway_desc: 'Pay via your MB WAY app',
    mbway_phone_label: 'Mobile Number',
    mbway_phone_placeholder: '912 345 678',
    mbway_invalid_phone: 'Number must be 9 digits',
    mbway_send_btn: 'Send MB WAY Request',
    mbway_polling_title: 'Approving payment...',
    mbway_polling_desc: 'Open your MB WAY app and confirm the payment',
    mbway_timeout: 'Timed out. Please try again.',
    mbway_approved: 'Payment approved!',

    pix_title: 'PIX',
    pix_desc: 'Scan the QR Code or copy the code',
    pix_copy_btn: 'Copy PIX Code',
    pix_copied: 'Copied!',
    pix_instructions: '1. Open your bank app\n2. Select PIX\n3. Scan QR Code or paste the code\n4. Confirm payment',
    pix_waiting: 'Waiting for PIX payment...',

    iban_title: 'Bank Transfer',
    iban_desc: 'Pay by bank transfer to the account below',
    iban_bank: 'Bank',
    iban_account: 'IBAN',
    iban_holder: 'Account Holder',
    iban_reference: 'Reference',
    iban_copy_btn: 'Copy IBAN',
    iban_confirm_btn: 'I have completed the transfer',
    iban_confirm_title: 'Payment Registered',
    iban_confirm_desc: 'Your payment will be verified within 2 business days. You will receive a confirmation email.',
    iban_instructions: 'Make a transfer to the details below and click "I have completed the transfer" when done.',

    order_summary: 'Order Summary',
    subtotal: 'Subtotal',
    tax: 'Tax',
    taxes_fees: 'Taxes & Fees',
    total: 'Total',
    items: 'items',
    quantity: 'Qty',

    success_title: 'Payment Confirmed!',
    success_subtitle: 'Your order has been processed successfully.',
    success_order_id: 'Order No.',
    success_email_sent: 'We sent a confirmation to',
    success_download: 'Access Product',
    success_back: 'Back to Store',
    success_thank_you: 'Thank you for your purchase!',

    processing_title: 'Processing Payment...',
    processing_desc: 'Please wait while we confirm your payment.',
    please_wait: 'Please wait...',

    error_generic: 'An error occurred. Please try again.',
    error_payment_failed: 'Payment failed. Try another method.',
    error_session_expired: 'Session expired.',
    error_required: 'This field is required',

    footer_secure: '100% secure and encrypted payment',
    footer_terms: 'Terms & Conditions',
    footer_privacy: 'Privacy Policy',
    footer_refund: 'Refund Policy',

    currency_prefix: '',
    currency_suffix: '€',
    close: 'Close',
    back: 'Back',
    or: 'or',
    dismiss: 'Dismiss',

    // SDUI errors
    error_session_no_txid: 'Transaction ID not found in URL.',
    retry: 'Try again',
    redirecting_in: 'Redirecting in {seconds}s...',
    redirect_close: 'You can close this window',
    method_not_supported: 'Payment method not supported',
    loading_session: 'Loading payment session...',
  },
  es: {
    secure_checkout: 'Checkout - Encrypted',
    powered_by: 'Procesado por',
    change_language: 'Cambiar idioma',

    step_contact: 'Información de Contacto',
    step_details: 'Datos Adicionales',
    step_payment: 'Método de Pago',

    email_label: 'Correo Electrónico',
    email_placeholder: 'tu@email.com',
    email_required: 'El email es obligatorio',
    email_invalid: 'Introduce un email válido',
    continue_btn: 'Continuar',

    name_label: 'Nombre Completo',
    name_placeholder: 'Juan García',
    name_required: 'El nombre es obligatorio',
    address_label: 'Dirección',
    address_placeholder: 'Calle, Número, Apartamento',
    city_label: 'Ciudad',
    city_placeholder: 'Madrid',
    postal_code_label: 'Código Postal',
    postal_code_placeholder: '28001',
    nif_label: 'NIF',
    nif_placeholder: '12345678A',
    nif_invalid: 'NIF debe ser válido',
    phone_label: 'Teléfono',
    phone_placeholder: '+34 91 123 4567',
    contact_label: 'Contacto (Tel / WhatsApp)',
    contact_placeholder: '+34 91 123 4567',
    optional_suffix: 'Opcional',

    payment_method: 'Método de Pago',
    card_title: 'Tarjeta de Crédito',
    card_desc: 'Visa, Mastercard, Amex',
    card_number: 'Número de Tarjeta',
    card_number_placeholder: '4242 4242 4242 4242',
    card_expiry: 'Fecha de Caducidad',
    card_expiry_placeholder: 'MM/AA',
    card_cvc: 'CVC',
    card_cvc_placeholder: '123',
    card_name: 'Nombre en la Tarjeta',
    card_name_placeholder: 'Juan García',
    pay_now: 'Pagar Ahora',

    engine_loading: 'Cargando motor de pago...',
    engine_loading_stripe: 'Cargando Stripe...',
    engine_loading_viva: 'Cargando Viva Wallet...',
    engine_loading_sumup: 'Cargando SumUp...',
    engine_loading_rede: 'Cargando Rede...',
    engine_loading_paypal: 'Cargando PayPal...',
    engine_error: 'Error al cargar el motor de pago',
    engine_error_retry: 'Intentar de nuevo',
    engine_native_badge: 'Nativo',
    engine_native_desc: 'Procesado directamente por NeXFlowX',
    engine_provider_badge: 'Motor: {engine}',
    mbway_native_badge: 'NeXFlowX Nativo',
    mbway_native_desc: 'Banco seleccionado automáticamente por el backend',
    pix_native_badge: 'NeXFlowX Nativo',
    pix_native_desc: 'QR generado y procesado por NeXFlowX',

    mbway_title: 'MB WAY',
    mbway_desc: 'Pague a través de su app MB WAY',
    mbway_phone_label: 'Número Móvil',
    mbway_phone_placeholder: '912 345 678',
    mbway_invalid_phone: 'El número debe tener 9 dígitos',
    mbway_send_btn: 'Enviar Solicitud MB WAY',
    mbway_polling_title: 'Aprobando pago...',
    mbway_polling_desc: 'Abra su app MB WAY y confirme el pago',
    mbway_timeout: 'Tiempo agotado. Inténtelo de nuevo.',
    mbway_approved: '¡Pago aprobado!',

    pix_title: 'PIX',
    pix_desc: 'Escanea el código QR o copia el código',
    pix_copy_btn: 'Copiar Código PIX',
    pix_copied: '¡Copiado!',
    pix_instructions: '1. Abra la app de su banco\n2. Seleccione PIX\n3. Escanee el QR o pegue el código\n4. Confirme el pago',
    pix_waiting: 'Esperando el pago PIX...',

    iban_title: 'Transferencia Bancaria',
    iban_desc: 'Pague por transferencia a la cuenta inferior',
    iban_bank: 'Banco',
    iban_account: 'IBAN',
    iban_holder: 'Titular de la Cuenta',
    iban_reference: 'Referencia',
    iban_copy_btn: 'Copiar IBAN',
    iban_confirm_btn: 'Ya he realizado la transferencia',
    iban_confirm_title: 'Pago Registrado',
    iban_confirm_desc: 'Su pago será verificado en 2 días hábiles. Recibirá un email de confirmación.',
    iban_instructions: 'Realice una transferencia a los datos abajo y haga clic en "Ya he realizado la transferencia" cuando termine.',

    order_summary: 'Resumen del Pedido',
    subtotal: 'Subtotal',
    tax: 'IVA',
    taxes_fees: 'Impuestos y Cargos',
    total: 'Total',
    items: 'artículos',
    quantity: 'Cant',

    success_title: '¡Pago Confirmado!',
    success_subtitle: 'Su pedido se ha procesado con éxito.',
    success_order_id: 'N.º de Pedido',
    success_email_sent: 'Enviamos la confirmación a',
    success_download: 'Acceder al Producto',
    success_back: 'Volver a la Tienda',
    success_thank_you: '¡Gracias por su compra!',

    processing_title: 'Procesando Pago...',
    processing_desc: 'Por favor espere mientras confirmamos su pago.',
    please_wait: 'Espere...',

    error_generic: 'Ocurrió un error. Inténtelo de nuevo.',
    error_payment_failed: 'Pago fallido. Intente otro método.',
    error_session_expired: 'Sesión expirada.',
    error_required: 'Este campo es obligatorio',

    footer_secure: 'Pago 100% seguro y cifrado',
    footer_terms: 'Términos y Condiciones',
    footer_privacy: 'Política de Privacidad',
    footer_refund: 'Política de Devoluciones',

    currency_prefix: '',
    currency_suffix: '€',
    close: 'Cerrar',
    back: 'Volver',
    or: 'o',
    dismiss: 'Cerrar',

    // SDUI errors
    error_session_no_txid: 'ID de transacción no encontrado en la URL.',
    retry: 'Intentar de nuevo',
    redirecting_in: 'Redirigiendo en {seconds}s...',
    redirect_close: 'Puede cerrar esta ventana',
    method_not_supported: 'Método de pago no compatible',
    loading_session: 'Cargando sesión de pago...',
  },
  fr: {
    secure_checkout: 'Checkout - Encrypted',
    powered_by: 'Traité par',
    change_language: 'Changer de langue',

    step_contact: 'Informations de Contact',
    step_details: 'Détails Supplémentaires',
    step_payment: 'Mode de Paiement',

    email_label: 'Adresse Email',
    email_placeholder: 'vous@email.com',
    email_required: "L'email est obligatoire",
    email_invalid: "Entrez un email valide",
    continue_btn: 'Continuer',

    name_label: 'Nom Complet',
    name_placeholder: 'Jean Dupont',
    name_required: 'Le nom est obligatoire',
    address_label: 'Adresse',
    address_placeholder: 'Rue, Numéro, Appartement',
    city_label: 'Ville',
    city_placeholder: 'Paris',
    postal_code_label: 'Code Postal',
    postal_code_placeholder: '75001',
    nif_label: 'NIF',
    nif_placeholder: '123456789',
    nif_invalid: 'Le NIF doit être valide',
    phone_label: 'Téléphone',
    phone_placeholder: '+33 1 23 45 67 89',
    contact_label: 'Contact (Tél / WhatsApp)',
    contact_placeholder: '+33 1 23 45 67 89',
    optional_suffix: 'Facultatif',

    payment_method: 'Mode de Paiement',
    card_title: 'Carte de Crédit',
    card_desc: 'Visa, Mastercard, Amex',
    card_number: 'Numéro de Carte',
    card_number_placeholder: '4242 4242 4242 4242',
    card_expiry: "Date d'Expiration",
    card_expiry_placeholder: 'MM/AA',
    card_cvc: 'CVC',
    card_cvc_placeholder: '123',
    card_name: 'Nom sur la Carte',
    card_name_placeholder: 'Jean Dupont',
    pay_now: 'Payer Maintenant',

    engine_loading: 'Chargement du moteur de paiement...',
    engine_loading_stripe: 'Chargement de Stripe...',
    engine_loading_viva: 'Chargement de Viva Wallet...',
    engine_loading_sumup: 'Chargement de SumUp...',
    engine_loading_rede: 'Chargement de Rede...',
    engine_loading_paypal: 'Chargement de PayPal...',
    engine_error: 'Échec du chargement du moteur',
    engine_error_retry: 'Réessayer',
    engine_native_badge: 'Natif',
    engine_native_desc: 'Traité directement par NeXFlowX',
    engine_provider_badge: 'Moteur : {engine}',
    mbway_native_badge: 'NeXFlowX Natif',
    mbway_native_desc: 'Banque sélectionnée automatiquement par le backend',
    pix_native_badge: 'NeXFlowX Natif',
    pix_native_desc: 'QR généré et traité par NeXFlowX',

    mbway_title: 'MB WAY',
    mbway_desc: 'Payez via votre app MB WAY',
    mbway_phone_label: 'Numéro Mobile',
    mbway_phone_placeholder: '912 345 678',
    mbway_invalid_phone: 'Le numéro doit avoir 9 chiffres',
    mbway_send_btn: "Envoyer la Demande MB WAY",
    mbway_polling_title: 'Approbation du paiement...',
    mbway_polling_desc: 'Ouvrez votre app MB WAY et confirmez le paiement',
    mbway_timeout: 'Délai expiré. Veuillez réessayer.',
    mbway_approved: 'Paiement approuvé !',

    pix_title: 'PIX',
    pix_desc: 'Scannez le code QR ou copiez le code',
    pix_copy_btn: 'Copier le Code PIX',
    pix_copied: 'Copié !',
    pix_instructions: "1. Ouvrez l'app de votre banque\n2. Sélectionnez PIX\n3. Scannez le QR ou collez le code\n4. Confirmez le paiement",
    pix_waiting: "En attente du paiement PIX...",

    iban_title: 'Virement Bancaire',
    iban_desc: 'Payez par virement au compte ci-dessous',
    iban_bank: 'Banque',
    iban_account: 'IBAN',
    iban_holder: 'Titulaire du Compte',
    iban_reference: 'Référence',
    iban_copy_btn: "Copier l'IBAN",
    iban_confirm_btn: "J'ai effectué le virement",
    iban_confirm_title: 'Paiement Enregistré',
    iban_confirm_desc: 'Votre paiement sera vérifié sous 2 jours ouvrables. Vous recevrez un email de confirmation.',
    iban_instructions: "Effectuez un virement vers les coordonnées ci-dessous et cliquez sur \"J'ai effectué le virement\" une fois terminé.",

    order_summary: 'Résumé de la Commande',
    subtotal: 'Sous-total',
    tax: 'TVA',
    taxes_fees: 'Taxes et Frais',
    total: 'Total',
    items: 'articles',
    quantity: 'Qté',

    success_title: 'Paiement Confirmé !',
    success_subtitle: 'Votre commande a été traitée avec succès.',
    success_order_id: 'N.° de Commande',
    success_email_sent: 'Nous avons envoyé la confirmation à',
    success_download: 'Accéder au Produit',
    success_back: "Retour à la Boutique",
    success_thank_you: 'Merci pour votre achat !',

    processing_title: 'Traitement du Paiement...',
    processing_desc: "Veuillez patienter pendant que nous confirmons votre paiement.",
    please_wait: 'Veuillez patienter...',

    error_generic: 'Une erreur est survenue. Veuillez réessayer.',
    error_payment_failed: 'Paiement échoué. Essayez un autre moyen.',
    error_session_expired: 'Session expirée.',
    error_required: 'Ce champ est obligatoire',

    footer_secure: 'Paiement 100% sécurisé et chiffré',
    footer_terms: "Conditions Générales",
    footer_privacy: 'Politique de Confidentialité',
    footer_refund: 'Politique de Retour',

    currency_prefix: '',
    currency_suffix: '€',
    close: 'Fermer',
    back: 'Retour',
    or: 'ou',
    dismiss: 'Fermer',

    // SDUI errors
    error_session_no_txid: "ID de transaction non trouvé dans l'URL.",
    retry: 'Réessayer',
    redirecting_in: 'Redirection dans {seconds}s...',
    redirect_close: 'Vous pouvez fermer cette fenêtre',
    method_not_supported: 'Méthode de paiement non supportée',
    loading_session: 'Chargement de la session de paiement...',
  },
} as const;

// ─── Locale Labels ──────────────────────────────────────────────────────────

export const localeLabels: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

export const localeFlags: Record<Locale, string> = {
  pt: '🇵🇹',
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
};

export const supportedLocales: Locale[] = ['pt', 'en', 'es', 'fr'];

// ─── Auto-detection ─────────────────────────────────────────────────────────

function detectLocale(): Locale {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language?.toLowerCase?.() || '';
    for (const locale of supportedLocales) {
      if (lang.startsWith(locale)) return locale;
    }
  }
  return 'en';
}

// ─── useTranslation Hook ────────────────────────────────────────────────────

import { useCallback } from 'react';

export type TranslationDictionary = typeof dictionaries['en'];

export function useTranslation(locale: Locale) {
  const t = useCallback(
    (key: keyof TranslationKeys, vars?: Record<string, string | number>): string => {
      let text = dictionaries[locale]?.[key] ?? dictionaries['en'][key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [locale]
  );

  return { t, locale, localeLabels, localeFlags, supportedLocales };
}

export { detectLocale };
export { dictionaries };
