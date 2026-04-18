# Checkout - Encrypted

> NeXFlowX — Orquestrador Financeiro White-Label. Sistema de Checkout Zero-Redirects de Alta Conversão com criptografia bancária.

<p align="center">
  <img src="public/logo.svg" alt="NeXFlowX Secure" width="48" />
</p>

<p align="center">
  <strong>Next.js 16</strong> · <strong>TypeScript 5</strong> · <strong>Tailwind CSS 4</strong> · <strong>shadcn/ui</strong> · <strong>Framer Motion</strong> · <strong>Zustand</strong>
</p>

---

## Visão Geral

O **NeXFlowX Checkout** é um sistema de checkout white-label de produção, concebido como front-end server-driven para a plataforma SaaS NeXFlowX. O comprador nunca abandona a página — todo o fluxo de pagamento acontece *in-page*, com transições suaves e feedback visual em tempo real.

A UI é **100% ditada pelo backend** (Server-Driven UI): o frontend é um interpretador puro que renderiza métodos de pagamento, campos de formulário e branding com base na resposta da API Core.

### Pilares Arquiteturais

| # | Pilar | Descrição |
|---|-------|-----------|
| 1 | **Server-Driven UI (SDUI)** | Frontend zero regras hard-coded — tudo ditado por `available_methods` da API |
| 2 | **Multi-Engine Payment Wrapper** | Arquitetura "Camaleão das Fintechs" com adapters para Stripe, Viva, SumUp, IFrame e NeXFlowX Nativo |
| 3 | **Progressive Profiling** | Formulário inteligente que mostra/esconde campos com base em `collected_fields` da API |
| 4 | **Zero-Redirect In-Page Payment** | 4 métodos de pagamento nativos sem qualquer redirecionamento externo |
| 5 | **Defensive Programming** | Safe-reduce, payload validation, fallback arrays — nunca crasha por dados ausentes |
| 6 | **Globalização i18n** | Suporte a 4 idiomas (PT, EN, ES, FR) com deteção automática — zero texto hard-coded |

---

## Stack Tecnológica

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| Next.js | 16 | Framework React com App Router |
| TypeScript | 5 | Tipagem estática estrita |
| Tailwind CSS | 4 | Sistema de estilos utilitário |
| shadcn/ui | New York | Biblioteca de componentes UI |
| Framer Motion | 12 | Animações e transições |
| Zustand | 5 | Gestão de estado do cliente |
| Prisma | 6 | ORM para base de dados (SQLite) |
| Lucide React | — | Ícones |

---

## Arquitetura SDUI (Server-Driven UI)

O frontend não possui nenhuma regra de negócio hard-coded. Toda a experiência de checkout é definida pela resposta JSON da API Core (`api-core.nexflowx.tech`).

### Fluxo de Inicialização

```
URL: pay.nexflowx.tech?txId=tx_abc123
          │
          ▼
GET /api/checkout/session?txId=tx_abc123  →  Proxy →  api-core.nexflowx.tech
          │
          ▼
CheckoutSession JSON {
  tx_id, mode, branding, collected_fields,
  products, taxes, available_methods, return_url
}
          │
          ▼
setSession() → Zustand store → UI renderizada
```

### `available_methods` — O Coração do SDUI

O array `available_methods` é retornado pela API e contém a descrição completa de cada método de pagamento:

```json
{
  "available_methods": [
    {
      "id": "method_stripe_card",
      "type": "credit_card",
      "label": "Visa / Mastercard",
      "description": "Pagamento seguro por cartão",
      "icon_url": "https://cdn.example.com/visa.svg",
      "provider_data": {
        "engine": "stripe",
        "publishable_key": "pk_live_...",
        "script_url": "https://js.stripe.com/v3/"
      }
    },
    {
      "id": "method_mbway",
      "type": "mbway_native",
      "label": "MB WAY",
      "provider_data": {
        "engine": "native",
        "metadata": { "phone_prefix": "+351" }
      }
    }
  ]
}
```

O frontend itera este array e renderiza o componente correto com base em `type`:

| `type` | Componente | Comportamento |
|--------|-----------|---------------|
| `credit_card` | `CardPayment` (Multi-Engine) | Seleciona adapter pelo `provider_data.engine` |
| `mbway_native` | `MbWayPayment` | Telemóvel + radar polling |
| `pix_static` | `PixPayment` | QR Code + clipboard + polling |
| `bank_transfer` | `IbanPayment` | Dados bancários + confirmação |

---

## Multi-Engine Payment Architecture

O componente `CardPayment` não está hard-coded a nenhum provedor. Funciona como um **wrapper multi-engine** que seleciona o adapter correto com base em `provider_data.engine`:

```
CardPayment
├── engine: "native"   → NativeEngine (NeXFlowX Nativo)
├── engine: "stripe"   → StripeEngine (Stripe.js on-demand)
├── engine: "viva"     → VivaEngine (Viva Wallet IFrame)
├── engine: "sumup"    → SumUpEngine (SumUp SDK)
├── engine: "iframe"   → IFrameEngine (Generic IFrame slot)
└── engine: "custom"   → registerEngine() at runtime
```

### Características

- **On-Demand Script Injection**: SDKs de terceiros são carregados apenas quando o utilizador seleciona pagamento por cartão (via `usePaymentScript` hook)
- **Registry Pattern**: Registo central de adapters com lazy-loading e extensibilidade via `registerEngine()`
- **Native NeXFlowX**: MB WAY e PIX são processados nativamente — o frontend recolhe dados mínimos, o backend orquestra o routing bancário

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/checkout/
│   │   ├── session/route.ts      # GET — Proxy → api-core.nexflowx.tech
│   │   ├── submit/route.ts       # POST — Proxy → api-core.nexflowx.tech
│   │   └── status/route.ts       # GET — Proxy → api-core.nexflowx.tech
│   ├── globals.css               # Variáveis CSS + tema checkout
│   ├── layout.tsx                # Root layout (SEO: noindex, favicon cadeado)
│   └── page.tsx                  # Entry point (txId-based session fetch)
│
├── components/checkout/
│   ├── checkout-body.tsx         # Orquestrador: type-based routing
│   ├── checkout-footer.tsx       # Footer: logos, badges SSL/PCI, legal
│   ├── checkout-header.tsx       # Header: logo merchant + seletor idioma
│   ├── checkout-layout.tsx       # Dual-mode: split-screen / centered
│   ├── checkout-provider.tsx     # Injeção de CSS variables de branding
│   ├── checkout-summary.tsx      # Resumo: produtos + subtotal + taxas + total
│   ├── email-step.tsx            # Step 1: Email (zero-friction, sempre ativo)
│   ├── fields-step.tsx           # Step 2: Campos dinâmicos (API-driven)
│   ├── payment-card.tsx          # Multi-Engine Wrapper (credit_card)
│   ├── payment-iban.tsx          # Transferência bancária (bank_transfer)
│   ├── payment-mbway.tsx         # MB WAY Nativo (mbway_native)
│   ├── payment-pix.tsx           # PIX Nativo (pix_static)
│   ├── payment-selector.tsx      # SDUI: itera available_methods
│   ├── processing-screen.tsx     # Spinner de processamento
│   ├── skeleton-loader.tsx       # Skeleton loaders
│   ├── success-screen.tsx        # Sucesso + auto-close/redirect (5s)
│   └── legal-dialog.tsx          # Drawer/Dialog: termos, privacidade, devoluções
│
├── hooks/
│   ├── use-mobile.ts             # Detecção de viewport mobile
│   └── use-polling.ts            # Hook genérico de polling (3s interval)
│
└── lib/checkout/
    ├── api-config.ts             # Configuração do proxy API Core
    ├── engines/
    │   ├── index.ts              # Barrel export
    │   ├── registry.ts           # Engine registry (lazy-load adapters)
    │   ├── use-payment-script.ts # On-demand <script> injection hook
    │   ├── native-engine.tsx     # NeXFlowX Nativo (Shield badge)
    │   ├── stripe-engine.tsx     # Stripe adapter (stripe.js on-demand)
    │   ├── viva-engine.tsx       # Viva Wallet adapter (IFrame)
    │   ├── sumup-engine.tsx      # SumUp adapter
    │   └── iframe-engine.tsx     # Generic IFrame adapter
    ├── i18n.ts                   # 4 idiomas (PT, EN, ES, FR) — 100+ chaves
    ├── legal-templates.ts        # Conteúdo legal estático multilingue
    ├── store.ts                  # Zustand store (defensive programming)
    ├── types.ts                  # 30+ interfaces TypeScript
    └── utils.ts                  # Formatação, validação, QR, clipboard
```

---

## API Routes (Secure Proxy)

Todos os endpoints são proxies seguros para a API Core. Nenhum dado mock é retornado.

### `GET /api/checkout/session?txId={txId}`

Proxy para `api-core.nexflowx.tech/api/v1/checkout-session/:txId`.

**Headers:**
```
Authorization: Bearer {NEXFLOWX_API_KEY}
X-Request-ID: {uuid}
```

**Response (200):**
```json
{
  "tx_id": "tx_abc123",
  "mode": "embedded",
  "branding": {
    "primary_color": "#0d9488",
    "accent_color": "#059669",
    "logo_url": "https://cdn.merchant.com/logo.png",
    "merchant_name": "NovaSoft"
  },
  "collected_fields": [
    { "key": "email", "required": true, "validation": "email" },
    { "key": "name", "required": true }
  ],
  "products": [
    {
      "id": "prod_001",
      "name": "NovaSoft Pro",
      "price": 299.90,
      "currency": "EUR",
      "type": "digital",
      "image_url": "https://cdn.merchant.com/product.png",
      "quantity": 1
    }
  ],
  "taxes": [
    { "name": "IVA 23%", "rate": 0.23, "amount": 68.98 }
  ],
  "available_methods": [
    { "id": "method_card", "type": "credit_card", "label": "Cartão", "provider_data": { "engine": "native" } },
    { "id": "method_mbway", "type": "mbway_native", "label": "MB WAY", "provider_data": { "engine": "native" } },
    { "id": "method_pix", "type": "pix_static", "label": "PIX", "provider_data": { "engine": "native" } },
    { "id": "method_iban", "type": "bank_transfer", "label": "Transferência", "provider_data": { "engine": "native" } }
  ],
  "return_url": "https://merchant.com/order/success",
  "expires_at": "2025-01-15T12:00:00Z"
}
```

### `POST /api/checkout/submit`

Proxy para `api-core.nexflowx.tech/api/v1/checkout-submit`.

**Request:**
```json
{
  "tx_id": "tx_abc123",
  "customer": { "email": "user@example.com", "name": "João" },
  "method_id": "method_mbway",
  "method_type": "mbway_native",
  "amount": 368.88,
  "currency": "EUR",
  "phone": "+351912345678"
}
```

### `GET /api/checkout/status?payment_id={id}`

Proxy para `api-core.nexflowx.tech/api/v1/checkout-status/:payment_id`.

Usado pelo polling silencioso (3s interval) para métodos assíncronos.

---

## Defensive Programming

O frontend foi hardenizado contra payloads parciais ou malformados do backend:

| Proteção | Local | Detalhe |
|----------|-------|---------|
| **Safe-reduce** | `store.ts` | `(session.products \|\| []).reduce(...)` — nunca crasha se array for `undefined` |
| **Safe-some** | `email-step.tsx` | `(session?.collected_fields \|\| []).some(...)` |
| **Safe-find** | `store.ts`, `payment-selector.tsx` | `(session.available_methods \|\| []).find(...)` |
| **Payload validation** | `store.ts` `setSession()` | Rejeita sessions sem `branding.primary_color` ou `tx_id` |
| **Optional arrays** | `types.ts` | `products?`, `taxes?`, `available_methods?`, `collected_fields?` — todos opcionais |
| **TaxLineItem** | `types.ts` | Se `taxes` vem do backend, usa os valores; senão, fallback 23% IVA |
| **Currency fallback** | `store.ts` | `products[0]?.currency \|\| 'EUR'` |

---

## Fluxo de Estados

```
                    ┌──────────┐
                    │  loading │ ← Skeleton loader
                    └────┬─────┘
                         │ API session loaded
                         ▼
                    ┌──────────┐
                    │  email   │ ← Zero-friction (sempre ativo)
                    └────┬─────┘
                         │ continue
                    ┌────▼─────┐
                    │  fields  │ ← Apenas se collected_fields ≠ email
                    └────┬─────┘
                         │ continue
                    ┌────▼─────┐
                    │ payment  │ ← SDUI: available_methods
                    └────┬─────┘
                         │ submit → POST /api/checkout/submit
              ┌──────────┼──────────┐
              │                     │
         ┌────▼────┐          ┌─────▼─────┐
         │  sync  │          │   async   │
         │ (card) │          │(mbway,pix)│
         └────┬────┘          └─────┬─────┘
              │                     │ polling 3s
              │              ┌──────▼──────┐
              │              │  pending    │
              │              └──────┬──────┘
              │                     │ gateway_confirmed
              └──────────┬──────────┘
                    ┌────▼─────┐
                    │processing│
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │ success  │ ← Auto-close/redirect (5s)
                    └──────────┘
```

---

## SEO & Segurança

```typescript
// layout.tsx metadata
{
  title: { template: "Pagamento Seguro | %s", default: "Pagamento Seguro" },
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" }
}
```

- `noindex, nofollow` — checkout nunca indexado por motores de busca
- `theme-color: #0d9488` — cor do cadeado na barra do browser
- Favicon: cadeado de segurança (gradiente teal)
- Zero referências a frameworks nos metadados
- Título dinâmico: `Pagamento Seguro | {merchant_name}`

---

## Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- Bun

### Variáveis de Ambiente (`.env.example`)

```bash
# ─── NeXFlowX Core API ───────────────────────────
NEXFLOWX_CORE_URL=https://api-core.nexflowx.tech
NEXFLOWX_API_KEY=your_api_key_here

# ─── Payment Providers (Publishable Keys) ────────
NEXT_PUBLIC_STRIPE_PK=pk_live_...
NEXT_PUBLIC_VIVA_MERCHANT_ID=...
NEXT_PUBLIC_SUMUP_MERCHANT_ID=...
```

### Setup

```bash
# Instalar dependências
bun install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Iniciar servidor de desenvolvimento
bun run dev

# Lint
bun run lint
```

---

## Extensibilidade

### Adicionar um Novo Método de Pagamento

1. O backend adiciona uma nova entrada em `available_methods` com um `type` único
2. Criar componente `payment-{type}.tsx` em `src/components/checkout/`
3. Registar o route no switch de `checkout-body.tsx`
4. O frontend renderiza automaticamente — zero mudanças no PaymentSelector (SDUI)

### Adicionar um Novo Engine de Cartão

```typescript
import { registerEngine } from '@/lib/checkout/engines';

registerEngine('rede', {
  loader: () => import('./rede-engine'),
  label: 'Rede',
});
```

### Adicionar um Novo Idioma

1. Adicionar dicionário em `i18n.ts` (`dictionaries['de']`)
2. Registar em `supportedLocales`, `localeLabels`, `localeFlags`

---

## Licença

Este projeto é propriedade da **NeXFlowX**. Todos os direitos reservados.

---

<p align="center">
  <img src="public/logo.svg" alt="🔒" width="32" />
  <strong>NeXFlowX</strong> — Orquestrador Financeiro White-Label<br/>
  <em>Checkout - Encrypted — Zero-Redirects de Alta Conversão</em>
</p>
