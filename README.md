# NeXFlowX Checkout

> Orquestrador Financeiro White-Label — Sistema de Checkout Zero-Redirects de Alta Conversão

<p align="center">
  <img src="public/logo.svg" alt="NeXFlowX" width="48" />
</p>

<p align="center">
  <strong>Next.js 16</strong> · <strong>TypeScript</strong> · <strong>Tailwind CSS 4</strong> · <strong>shadcn/ui</strong> · <strong>Framer Motion</strong> · <strong>Zustand</strong>
</p>

---

## Visão Geral

O **NeXFlowX Checkout** é um sistema de checkout de produção completo, concebido como componente white-label para plataformas SaaS. O comprador nunca abandona a página — todo o fluxo de pagamento acontece *in-page*, com transições suaves e feedback visual em tempo real.

### Pilares Arquiteturais

| # | Pilar | Descrição |
|---|-------|-----------|
| 1 | **Dual-Mode & Branding Dinâmico** | Dois layouts (Mini-Store e Carrinho) com injeção de cores/logo da marca em tempo real |
| 2 | **Progressive Profiling** | Formulário inteligente que mostra/esconde campos com base na configuração da API |
| 3 | **Zero-Redirect In-Page Payment** | 4 métodos de pagamento nativos sem qualquer redirecionamento externo |
| 4 | **Automação de Sucesso** | Polling silencioso com transição automática para a página de sucesso |
| 5 | **Globalização i18n** | Suporte a 4 idiomas (PT, EN, ES, FR) com deteção automática |

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
| Prisma | 6 | ORM para base de dados |
| Zod | 4 | Validação de schemas |
| Lucide React | 0.525 | Ícones |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/checkout/
│   │   ├── session/route.ts      # GET - Retorna sessão de checkout
│   │   ├── submit/route.ts       # POST - Submete pagamento
│   │   └── status/route.ts       # GET  - Polling de status do pagamento
│   ├── globals.css               # Variáveis CSS + tema checkout
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Página principal (entry point)
│
├── components/checkout/
│   ├── checkout-body.tsx         # Orquestrador do fluxo (steps)
│   ├── checkout-footer.tsx       # Footer com badges de segurança
│   ├── checkout-header.tsx       # Header com logo + seletor de idioma
│   ├── checkout-layout.tsx       # Dual-mode layout (split-screen / centered)
│   ├── checkout-provider.tsx     # Injeção de CSS variables de branding
│   ├── checkout-summary.tsx      # Resumo do pedido (produtos + totais)
│   ├── email-step.tsx            # Step 1: Email (Progressive Profiling)
│   ├── fields-step.tsx           # Step 2: Campos dinâmicos (API-driven)
│   ├── payment-card.tsx          # Cartão de crédito (UI para Elements SDK)
│   ├── payment-iban.tsx          # Transferência bancária (IBAN)
│   ├── payment-mbway.tsx         # MB WAY (telemóvel + radar polling)
│   ├── payment-pix.tsx           # PIX (QR Code + cópia + polling)
│   ├── payment-selector.tsx      # Seleção de método de pagamento
│   ├── processing-screen.tsx     # Ecrã de processamento
│   ├── skeleton-loader.tsx       # Skeleton loaders impecáveis
│   └── success-screen.tsx        # Ecrã de sucesso animado
│
├── hooks/
│   ├── use-mobile.ts             # Detecção de viewport mobile
│   ├── use-polling.ts            # Hook genérico de polling para pagamentos async
│   └── use-toast.ts              # Hook de notificações toast
│
└── lib/checkout/
    ├── i18n.ts                   # Sistema i18n (4 idiomas, 100+ chaves cada)
    ├── store.ts                  # Zustand store (estado global do checkout)
    ├── types.ts                  # TypeScript types (25+ interfaces)
    └── utils.ts                  # Utilitários (formatação, validação, QR, clipboard)
```

---

## Funcionalidades Detalhadas

### 1. Dual-Mode & Branding Dinâmico

O checkout suporta dois modos de apresentação:

#### Mini-Store (Link Fixo)
- **Desktop:** Ecrã dividido — painel esquerdo com showcase do produto sobre fundo gradiente, formulário à direita
- **Mobile:** Banner gradiente com imagem do produto + formulário colapsado abaixo
- Ideal para páginas de produto e links de pagamento direto

#### Carrinho
- Layout centralizado em coluna única
- Resumo do pedido abaixo dos steps de formulário
- Ideal para fluxos de checkout multi-produto

#### Injeção de Branding
```typescript
interface BrandingConfig {
  primary_color: string;   // Ex: "#0d9488"
  accent_color: string;    // Ex: "#059669"
  logo_url: string;        // URL do logo do lojista
  merchant_name: string;   // Nome da marca
  support_email?: string;
}
```
As cores são injetadas como CSS custom properties (`--checkout-primary`, `--checkout-accent`) pelo `CheckoutProvider`, garantindo que todos os botões, badges e indicadores de progresso refletem a identidade visual da marca.

---

### 2. Progressive Profiling

O formulário recolhe dados de forma inteligente e progressiva:

```
┌─────────────────────────────────────┐
│ Step 1: Email                       │  ← Sempre presente
│ [email@exemplo.com        ] [→]    │
├─────────────────────────────────────┤
│ Step 2: Campos Adicionais           │  ← Apenas se necessario
│ [Nome Completo            ]        │
│ [NIF (opcional)           ]        │
│ [                     ] [Continuar] │
├─────────────────────────────────────┤
│ Step 3: Pagamento                   │
│ [Cartão] [MB WAY] [PIX] [IBAN]    │
└─────────────────────────────────────┘
```

**Comportamento por tipo de produto:**
- **Digital:** Email → Pagamento (steps 2 colapsado)
- **Físico:** Email → Morada/Nome/NIF → Pagamento (step 2 expandido)

Cada campo é controlado pela API via `collected_fields`:

```typescript
interface CollectedField {
  key: 'email' | 'name' | 'address' | 'city' | 'postal_code' | 'nif' | 'phone';
  label?: string;          // Override do label (usa tradução por defeito)
  required: boolean;       // Obrigatoriedade
  placeholder?: string;    // Placeholder customizado
  validation?: 'email' | 'phone' | 'nif' | 'text';
}
```

---

### 3. Interface de Pagamento In-Page (Zero Redirects)

#### Cartão de Crédito
- Input com formatação automática (número → `4242 4242 4242 4242`, exp → `MM/YY`)
- Campos: Número, Data de Validade, CVC, Nome no Cartão
- Preparado para injetar Stripe/Paddle Elements SDK nativamente
- Pagamento instantâneo (síncrono)

#### MB WAY
- Input de telemóvel com prefixo `+351` fixo e máscara `912 345 678`
- Validação de 9 dígitos iniciados por 9
- Após submissão: animação de radar com pulso + ícone MB WAY
- Polling silencioso a cada 3 segundos
- Timeout após 3 minutos com opção de retry

#### PIX
- Geração automática de QR Code via SVG determinístico
- Código PIX "Copiar e Colar" com botão de cópia para clipboard
- Instruções visuais passo-a-passo
- Auto-inicia pagamento no mount
- Polling silencioso com indicador de espera

#### Transferência Bancária (IBAN)
- Apresentação estruturada: IBAN, Banco, Referência, Titular
- Botão de cópia individual por campo
- CTA "Já efetuei a transferência"
- Estado de confirmação com ícone de escudo e mensagem de verificação

---

### 4. Automação de Sucesso (Polling Silencioso)

Hook `usePaymentPolling` para métodos assíncronos (MB WAY, PIX, IBAN):

```typescript
const { isPolling, attempts, status, stop } = usePaymentPolling({
  paymentId: string | null,    // ID do pagamento retornado pelo backend
  enabled: boolean,            // Ativar/desativar polling
  intervalMs?: number,         // Intervalo (default: 3000ms)
  maxAttempts?: number,        // Tentativas máximas (default: 100)
  onSuccess?: () => void,      // Callback quando status === 'confirmed'
  onTimeout?: () => void,      // Callback ao atingir maxAttempts
});
```

**Fluxo:**
```
Pagamento submetido → Pending → Polling (3s) → Confirmed → Success Screen
                                        ↘ Failed → Error message
                                        ↘ Timeout → Retry option
```

A transição para a Success Screen é completamente automática e invisível para o utilizador.

---

### 5. Globalização i18n

#### Idiomas Suportados

| Código | Idioma | Bandeira |
|--------|--------|----------|
| `pt` | Português | 🇵🇹 |
| `en` | English | 🇬🇧 |
| `es` | Español | 🇪🇸 |
| `fr` | Français | 🇫🇷 |

#### Detecção Automática

O sistema tenta detetar o idioma do utilizador via `navigator.language`:

```typescript
// navigator.language === "pt-PT" → locale = "pt"
// navigator.language === "en-US" → locale = "en"
// navigator.language === "es-ES" → locale = "es"
// navigator.language === "fr-FR" → locale = "fr"
// navigator.language === "de-DE" → locale = "en" (fallback)
```

#### Uso no Componente

```typescript
import { useTranslation } from '@/lib/checkout/i18n';

function MyComponent() {
  const locale = useCheckoutStore((s) => s.locale);
  const { t } = useTranslation(locale);

  return <h1>{t('secure_checkout')}</h1>; // "Checkout Seguro" em PT
}
```

#### Seletor de Idioma

Dropdown elegante no header com bandeiras e nomes dos idiomas, permitindo ao comprador alterar o idioma em tempo real sem recarregar a página.

---

## API Routes

### `GET /api/checkout/session?mode={mode}`

Retorna a sessão de checkout configurada.

**Query Parameters:**
| Parâmetro | Tipo | Valores | Descrição |
|-----------|------|---------|-----------|
| `mode` | string | `mini-store`, `cart` | Modo de layout |

**Response:**
```json
{
  "id": "sess_abc123",
  "mode": "mini-store",
  "branding": {
    "primary_color": "#0d9488",
    "accent_color": "#059669",
    "logo_url": "/merchant-logo.png",
    "merchant_name": "NovaSoft"
  },
  "collected_fields": [
    { "key": "email", "required": true, "validation": "email" },
    { "key": "name", "required": true },
    { "key": "nif", "required": false, "validation": "nif" }
  ],
  "products": [
    {
      "id": "prod_001",
      "name": "NovaSoft Pro",
      "price": 299.90,
      "currency": "EUR",
      "type": "digital",
      "image_url": "/product-demo.png",
      "quantity": 1
    }
  ],
  "enabled_methods": ["card", "mbway", "pix", "iban"],
  "expires_at": "2025-01-15T12:00:00Z"
}
```

---

### `POST /api/checkout/submit`

Submete o pagamento.

**Request Body:**
```json
{
  "session_id": "sess_abc123",
  "customer": { "email": "user@example.com", "name": "João" },
  "method": "mbway",
  "amount": 369.00,
  "currency": "EUR",
  "phone": "+351 912345678"
}
```

**Response (MB WAY):**
```json
{
  "id": "pay_xyz789",
  "status": "pending",
  "method": "mbway",
  "phone": "+351 912345678",
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

**Response (PIX):**
```json
{
  "id": "pay_pix456",
  "status": "pending",
  "method": "pix",
  "pix_code": "00020126580014br.gov.bcb...",
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

**Response (Cartão):**
```json
{
  "id": "pay_card789",
  "status": "confirmed",
  "method": "card",
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:01Z"
}
```

---

### `GET /api/checkout/status?payment_id={id}`

Endpoint de polling para verificar o estado de pagamentos assíncronos.

**Query Parameters:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `payment_id` | string | ID do pagamento |

**Response:**
```json
{
  "payment_id": "pay_xyz789",
  "status": "pending",
  "updated_at": "2025-01-15T10:00:05Z"
}
```

---

## Fluxo de Estados (State Machine)

```
                    ┌──────────┐
                    │  loading │
                    └────┬─────┘
                         │ API session carregada
                         ▼
                    ┌──────────┐
                    │  email   │─────── digital ────┐
                    └────┬─────┘                    │
                         │ continue                  │
                    ┌────▼─────┐                    │
                    │  fields  │                    │
                    └────┬─────┘                    │
                         │ continue                  │
                    ┌────▼─────┐◄───────────────────┘
                    │ payment  │
                    └────┬─────┘
                         │ submit
              ┌──────────┼──────────┐
              │          │          │
         ┌────▼────┐ ┌───▼────┐ ┌──▼─────────┐
         │ sync   │ │ async  │ │  iban      │
         │ (card) │ │(mbway, │ │ (transfer) │
         └────┬────┘ │ pix)   │ └──┬─────────┘
              │      └───┬────┘    │ confirm
              │          │ polling │
              │      ┌───▼────┐    │
              │      │pending │    │
              │      └───┬────┘    │
              │          │ confirmed│
              └──────────┼─────────┘
                    ┌────▼─────┐
                    │processing│
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │ success  │
                    └──────────┘
```

---

## Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- Bun (recomendado) ou npm

### Instalar Dependências

```bash
bun install
```

### Configurar Base de Dados

```bash
bun run db:push
```

### Iniciar Servidor de Desenvolvimento

```bash
bun run dev
```

O servidor arranca em `http://localhost:3000`.

### Linting

```bash
bun run lint
```

---

## Configuração de Branding

O branding é totalmente dinâmico e controlado pela API. Para personalizar:

```typescript
// Na resposta do endpoint /api/checkout/session
{
  "branding": {
    "primary_color": "#0d9488",   // Cor principal (botões, badges, indicadores)
    "accent_color": "#059669",    // Cor secundária (gradientes, destaques)
    "logo_url": "https://cdn.lojista.com/logo.png",
    "merchant_name": "Nome da Loja"
  }
}
```

As cores são injetadas como CSS custom properties:

```css
:root {
  --checkout-primary: #0d9488;
  --checkout-primary-foreground: #ffffff;
  --checkout-accent: #059669;
  --checkout-accent-foreground: #ffffff;
}
```

---

## Extensibilidade

### Adicionar um Novo Método de Pagamento

1. **Tipos:** Adicionar o tipo em `PaymentMethodType` em `types.ts`
2. **Config:** Adicionar a config visual em `payment-selector.tsx` (`methodConfig`)
3. **Componente:** Criar `src/components/checkout/payment-{method}.tsx`
4. **Selector:** Importar e renderizar no `CheckoutBody`
5. **API:** Adicionar o handler no `submit/route.ts`

### Adicionar um Novo Idioma

1. Adicionar a entrada no dicionário `dictionaries` em `i18n.ts`
2. Adicionar o código em `supportedLocales`
3. Adicionar label e flag em `localeLabels` / `localeFlags`

### Integração com Gateway de Pagamento Real

O componente `payment-card.tsx` está preparado para injetar Elements SDK nativamente:

```tsx
// Substituir os inputs simulados pelo SDK
<div id="card-elements-container">
  {/* Stripe: <CardElement /> */}
  {/* Paddle: <PaddleCard /> */}
</div>
```

---

## Segurança

- Encriptação SSL em todo o trânsito de dados
- Tokenização de dados de cartão (preparado para Stripe/Paddle)
- Sem armazenamento de dados sensíveis no cliente
- Polling via endpoints autenticados
- CORS configurado para o domínio da loja

---

## Licença

Este projeto é propriedade da **NeXFlowX**. Todos os direitos reservados.

---

<p align="center">
  <strong>NeXFlowX</strong> — Orquestrador Financeiro White-Label<br/>
  <em>Checkout Zero-Redirects de Alta Conversão</em>
</p>
