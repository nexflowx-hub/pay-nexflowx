'use client';

// ─── Payment Brand SVG Icons ─────────────────────────────────────────────────
// Clean, professional inline SVG icons for payment methods.
// No external images — fully self-contained and themeable via `color` prop.

import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

// ─── VISA ────────────────────────────────────────────────────────────────────

export function VisaIcon({ className, color = '#1A1F71' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
    >
      <rect width="48" height="32" rx="4" fill={color} fillOpacity="0.06" />
      <path
        d="M17.5 21.5h-3l1.9-10.8h3l-1.9 10.8zm12.8-10.6c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3.1 1.2.6 1.6.9 1.6 1.4 0 .8-.9 1.1-1.8 1.1-1.2 0-1.8-.2-2.8-.6l-.4-.2-.4 2.5c.7.3 2 .6 3.3.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.2-2.5-3-1-.5-1.7-.9-1.7-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.4-2.4zm7.7-.2h-2.3c-.7 0-1.3.2-1.6.9l-4.5 10.1h3.2l.6-1.7h3.9l.4 1.7h2.8l-2.5-10zm-3.7 6.5l1.3-3.4.4 1.1c0 0 .4 1 .6 1.6l-.1.7h-2.2zm-17.3-6.5l-3 7.3-.3-1.7c-.5-1.8-2.2-3.7-4.1-4.7l2.8 9.6h3.2l4.8-10.5h-3.4z"
        fill={color}
      />
      <path
        d="M9.7 10.7h4.9l.3 0h2.6l-2.3 10.8h-3l-1.9-10.8h-.6z"
        fill={color}
        fillOpacity="0.3"
      />
    </svg>
  );
}

// ─── Mastercard ──────────────────────────────────────────────────────────────

export function MastercardIcon({ className, color = '#252525' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastercard"
    >
      <rect width="48" height="32" rx="4" fill={color} fillOpacity="0.06" />
      <circle cx="19" cy="16" r="7" fill="#EB001B" />
      <circle cx="29" cy="16" r="7" fill="#F79E1B" />
      <path
        d="M24 10.5a7 7 0 010 11 7 7 0 000-11z"
        fill="#FF5F00"
      />
    </svg>
  );
}

// ─── American Express ────────────────────────────────────────────────────────

export function AmexIcon({ className, color = '#006FCF' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="American Express"
    >
      <rect width="48" height="32" rx="4" fill={color} fillOpacity="0.06" />
      <path
        d="M6 11h6.5l2 4.5 2-4.5H23v10.2l5-10.2h4l5.2 10.5V11h4v10h-3l-4.5-9v9h-5.5l-1-2.3h-4.5l-1 2.3h-3L16 11zm6 1.5l-3 7h2l.6-1.5h3l.6 1.5h2l-3-7h-2.2zm.7 1.5l.9 2.3h-1.8l.9-2.3z"
        fill={color}
      />
    </svg>
  );
}

// ─── MB WAY ──────────────────────────────────────────────────────────────────

export function MbWayIcon({ className, color = '#003C71' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MB WAY"
    >
      <rect width="48" height="32" rx="4" fill={color} fillOpacity="0.06" />
      {/* MB WAY stylized icon — phone + signal waves */}
      <rect x="19" y="8" width="10" height="16" rx="1.5" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="21" r="1" fill={color} />
      <line x1="21" y1="10" x2="27" y2="10" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Signal waves */}
      <path d="M31 12c1.7 1.7 1.7 4.3 0 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M33.5 9.5c3 3 3 8 0 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M13 18c-1.7-1.7-1.7-4.3 0-6" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M10.5 20.5c-3-3-3-8 0-11" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}

// ─── PIX ─────────────────────────────────────────────────────────────────────

export function PixIcon({ className, color = '#32BCAD' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PIX"
    >
      <rect width="48" height="32" rx="4" fill={color} fillOpacity="0.06" />
      {/* PIX diamond icon (inspired by the official Banco Central logo) */}
      <path
        d="M24 6L14 16l10 10 10-10L24 6z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M24 10L18 16l6 6 6-6-6-6z"
        fill={color}
        fillOpacity="0.15"
      />
      <path
        d="M24 6L14 16h20L24 6z"
        fill={color}
        fillOpacity="0.08"
      />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fill={color}
        fontSize="5"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        letterSpacing="1.5"
      >
        PIX
      </text>
    </svg>
  );
}

// ─── PCI DSS Shield ─────────────────────────────────────────────────────────

export function PciDssIcon({ className, color = '#004B87' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PCI DSS"
    >
      <path
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1"
      />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        fill={color}
        fontSize="4.5"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        PCI
      </text>
      <text
        x="12"
        y="19"
        textAnchor="middle"
        fill={color}
        fontSize="3"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        opacity="0.7"
      >
        DSS
      </text>
    </svg>
  );
}

// ─── SSL Lock ────────────────────────────────────────────────────────────────

export function SslLockIcon({ className, color = '#4CAF50' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SSL Secure"
    >
      <rect x="3" y="12" width="18" height="12" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" />
      <path d="M7 12V8a5 5 0 0110 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="18" r="2" fill={color} />
      <line x1="12" y1="20" x2="12" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
