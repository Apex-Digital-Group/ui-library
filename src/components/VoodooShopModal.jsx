import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import BaseModal from './BaseModal';

export default function VoodooShopModal({ isOpen, onClose }) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      lockScroll
      backdrop="bg-black/80 backdrop-blur-sm"
      overlayClassName=""
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-4 md:inset-8 bg-[#1a0e2e] rounded-2xl shadow-2xl z-[10001] flex flex-col overflow-hidden"
        style={{ margin: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <iframe
          src="https://voodoo-erotica.lovable.app/"
          className="w-full h-full border-0"
          title="Voodoo Shop"
        />
      </motion.div>
    </BaseModal>
  );
}
