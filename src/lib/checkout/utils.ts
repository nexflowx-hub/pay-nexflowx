// ─── NeXFlowX Checkout Utilities ─────────────────────────────────────────────

/**
 * Format a number as currency.
 */
export function formatCurrency(amount: number, currency: string, suffix?: string): string {
  const formatted = new Intl.NumberFormat('pt-PT', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formatted} ${suffix || currency}`;
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate Portuguese NIF (9 digits).
 */
export function isValidNIF(nif: string): boolean {
  return /^\d{9}$/.test(nif.replace(/\s/g, ''));
}

/**
 * Validate Portuguese mobile number (9 digits starting with 9).
 */
export function isValidPTMobile(phone: string): boolean {
  return /^9\d{8}$/.test(phone.replace(/\s/g, ''));
}

/**
 * Generate a mock PIX code.
 */
export function generatePixCode(amount: number, merchant: string): string {
  return `00020126580014br.gov.bcb.pix0136${merchant}5204000053039865802BR5925${merchant}6009SAO PAULO62070503***63041D3D.${amount.toFixed(2)}`;
}

/**
 * Generate a mock PIX QR code as data URL (simple SVG placeholder).
 */
export function generateQRDataUrl(code: string): string {
  // In production, this would use a QR code library. For demo, return a placeholder SVG.
  const size = 200;
  const cells = 25;
  const cellSize = size / cells;

  // Deterministic "random" pattern from the code
  let seed = 0;
  for (let i = 0; i < code.length; i++) {
    seed = ((seed << 5) - seed + code.charCodeAt(i)) | 0;
  }

  const pixels: string[] = [];
  // Corner markers
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const isCorner =
        (r < 7 && c < 7) ||
        (r < 7 && c >= cells - 7) ||
        (r >= cells - 7 && c < 7);
      const isCornerBorder =
        isCorner &&
        (r === 0 || r === 6 || c === 0 || c === 6 || c === cells - 1 || c === cells - 7 ||
         r === cells - 1 || r === cells - 7);
      const isCornerInner =
        isCorner &&
        !isCornerBorder &&
        r >= 2 && r <= 4 && c >= 2 && c <= 4;

      const isCornerArea2 =
        r < 7 && c >= cells - 7;
      const isCornerArea3 =
        r >= cells - 7 && c < 7;
      const isCornerBorder2 =
        isCornerArea2 &&
        (r === 0 || r === 6 || c === cells - 1 || c === cells - 7);
      const isCornerInner2 =
        isCornerArea2 &&
        !isCornerBorder2 &&
        r >= 2 && r <= 4 && c >= cells - 5 && c <= cells - 3;
      const isCornerBorder3 =
        isCornerArea3 &&
        (r === cells - 1 || r === cells - 7 || c === 0 || c === 6);
      const isCornerInner3 =
        isCornerArea3 &&
        !isCornerBorder3 &&
        r >= cells - 5 && r <= cells - 3 && c >= 2 && c <= 4;

      let fill = false;
      if (isCornerBorder || isCornerBorder2 || isCornerBorder3 || isCornerInner || isCornerInner2 || isCornerInner3) {
        fill = true;
      } else if (!isCorner) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        fill = seed % 3 === 0;
      }

      if (fill) {
        pixels.push(`<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#000"/>`);
      }
    }
  }

  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#fff"/>${pixels.join('')}</svg>`)}`;
}

/**
 * Copy text to clipboard.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
