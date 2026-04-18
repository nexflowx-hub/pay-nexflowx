'use client';

// ─── NeXFlowX Legal Document Dialog ─────────────────────────────────────────
// Responsive legal viewer: Drawer on mobile (swipeable), Dialog on desktop.
// Zero API calls — all content is static with dynamic {store_name} injection.
// Keeps user on the checkout page (no navigation, no data loss).

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCheckoutStore } from '@/lib/checkout/store';
import { getLegalContent } from '@/lib/checkout/legal-templates';
import type { LegalDocType } from '@/lib/checkout/legal-templates';
import { FileText, ShieldCheck, RotateCcw, X } from 'lucide-react';

// ─── Icon mapping for each doc type ─────────────────────────────────────────
const docIcons: Record<LegalDocType, React.ReactNode> = {
  terms: <FileText className="size-5 text-teal-600 dark:text-teal-400" />,
  privacy: <ShieldCheck className="size-5 text-teal-600 dark:text-teal-400" />,
  refund: <RotateCcw className="size-5 text-teal-600 dark:text-teal-400" />,
};

// ─── Legal Dialog Context ───────────────────────────────────────────────────
interface LegalDialogContext {
  docType: LegalDocType;
  open: boolean;
  onClose: () => void;
}

let openDialog: ((ctx: LegalDialogContext) => void) | null = null;
let closeDialog: (() => void) | null = null;

export function openLegalDialog(docType: LegalDocType) {
  if (openDialog) {
    openDialog({ docType, open: true, onClose: () => {} });
  }
}

// ─── Legal Content Renderer ─────────────────────────────────────────────────
function LegalContent({ docType }: { docType: LegalDocType }) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const storeName = session?.branding?.merchant_name || 'Loja';

  const { title, content } = getLegalContent(docType, locale, storeName);

  return (
    <div className="legal-content leading-relaxed text-sm text-gray-700 dark:text-gray-300 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:ml-4 [&_ul]:list-disc [&_li]:mb-1 [&_em]:text-xs [&_em]:block [&_em]:mt-6 [&_em]:pt-4 [&_em]:border-t"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// ─── Mobile: Bottom Drawer ──────────────────────────────────────────────────
function LegalDrawer({ docType, open, onClose }: LegalDialogContext) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const storeName = session?.branding?.merchant_name || 'Loja';
  const { title } = getLegalContent(docType, locale, storeName);

  return (
    <Drawer open={open} onClose={onClose} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent className="max-h-[92vh]">
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <div className="flex items-center gap-2">
            {docIcons[docType]}
            <DrawerTitle className="text-base">{title}</DrawerTitle>
          </div>
          <DrawerClose asChild>
            <button
              className="flex size-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="Fechar"
            >
              <X className="size-4" />
            </button>
          </DrawerClose>
        </div>
        <DrawerDescription className="px-4 pb-2 text-xs text-gray-500 dark:text-gray-400">
          {storeName}
        </DrawerDescription>
        <ScrollArea className="flex-1 px-4 pb-8">
          <LegalContent docType={docType} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

// ─── Desktop: Centered Large Dialog ─────────────────────────────────────────
function LegalDialogDesktop({ docType, open, onClose }: LegalDialogContext) {
  const locale = useCheckoutStore((s) => s.locale);
  const session = useCheckoutStore((s) => s.session);
  const storeName = session?.branding?.merchant_name || 'Loja';
  const { title } = getLegalContent(docType, locale, storeName);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Sticky header */}
        <div className="flex items-center justify-between border-b px-6 py-4 bg-white dark:bg-gray-950 shrink-0">
          <div className="flex items-center gap-2.5">
            {docIcons[docType]}
            <div>
              <DialogTitle className="text-base">{title}</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {storeName}
              </DialogDescription>
            </div>
          </div>
        </div>
        {/* Scrollable body */}
        <ScrollArea className="flex-1 max-h-[calc(85vh-73px)]">
          <div className="px-6 py-5">
            <LegalContent docType={docType} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Export: Responsive Legal Viewer ────────────────────────────────────
export function LegalViewer() {
  const isMobile = useIsMobile();
  const [ctx, setCtx] = useState<LegalDialogContext | null>(null);

  const handleOpen = useCallback((newCtx: LegalDialogContext) => {
    setCtx(newCtx);
  }, []);

  const handleClose = useCallback(() => {
    setCtx((prev) => (prev ? { ...prev, open: false } : null));
    // Delay null to allow close animation
    setTimeout(() => setCtx(null), 300);
  }, []);

  // Register global open/close handlers
  React.useEffect(() => {
    openDialog = handleOpen;
    closeDialog = handleClose;
    return () => {
      openDialog = null;
      closeDialog = null;
    };
  }, [handleOpen, handleClose]);

  if (!ctx) return null;

  return isMobile ? (
    <LegalDrawer docType={ctx.docType} open={ctx.open} onClose={handleClose} />
  ) : (
    <LegalDialogDesktop docType={ctx.docType} open={ctx.open} onClose={handleClose} />
  );
}
