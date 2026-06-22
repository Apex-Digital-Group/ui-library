import * as React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import BaseModal from './BaseModal'

export default {
  title: 'Components/BaseModal',
  component: BaseModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

/**
 * The shared shell every modal in the library extends. It owns the overlay,
 * backdrop, `isOpen` gate, fade, and the optional scroll-lock / Esc / click-
 * outside behaviours; each modal passes its own card as children.
 */
export const Default = {
  name: 'BaseModal',
  render: (args) => (
    <BaseModal {...args}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-gradient-to-br from-[#3a2d58] to-[#2E2249] rounded-3xl shadow-2xl border-2 border-purple-500/30 relative p-8"
      >
        <button
          onClick={args.onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white/60" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-2">Example panel</h2>
        <p className="text-white/70">
          Any modal renders its own card here. BaseModal supplies the overlay,
          backdrop, <code>isOpen</code> gate, and close behaviours.
        </p>
      </motion.div>
    </BaseModal>
  ),
  args: {
    isOpen: true,
    onClose: () => {},
    backdrop: 'bg-black/80 backdrop-blur-sm',
    closeOnBackdrop: true,
    closeOnEsc: false,
    lockScroll: false,
  },
}
