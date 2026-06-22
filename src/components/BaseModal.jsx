import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BaseModal — the shared shell every modal in the library extends.
 *
 * It owns the parts that were duplicated across ~18 modals: the full-screen
 * fixed overlay + backdrop, the `isOpen` visibility gate, the overlay fade,
 * and the optional behaviours (click-outside close, Escape-to-close, body
 * scroll-lock). Each modal passes its own card — styling, header, close
 * button, content, and inner scale animation — as `children`, so its exact
 * look and behaviour are preserved; only the boilerplate moves here.
 *
 * Props are defaulted to the most common values but every modal can override
 * them to match its original shell exactly (backdrop opacity/blur, whether the
 * backdrop closes, scroll-lock, Esc handling, z-index, overlay padding).
 *
 * Usage:
 *   <BaseModal isOpen={isOpen} onClose={onClose} lockScroll backdrop="bg-black/80 backdrop-blur-sm">
 *     <motion.div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl ...card...">
 *       ...content + close button...
 *     </motion.div>
 *   </BaseModal>
 */
export default function BaseModal({
  isOpen,
  onClose,
  backdrop = 'bg-black/80 backdrop-blur-sm',
  closeOnBackdrop = true,
  closeOnEsc = false,
  lockScroll = false,
  zIndex = 10000,
  overlayClassName = 'flex items-center justify-center p-4',
  children,
}) {
  React.useEffect(() => {
    if (!lockScroll) return undefined;
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, lockScroll]);

  React.useEffect(() => {
    if (!closeOnEsc || !isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeOnEsc, isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOnBackdrop ? onClose : undefined}
          className={`fixed inset-0 ${backdrop} ${overlayClassName}`}
          style={{ zIndex }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
