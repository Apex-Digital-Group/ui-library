import React from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import {
  User,
  Wallet,
  Globe,
  Ban,
  Heart,
  Star,
  Scissors,
  ShoppingBag,
  Gift,
  Settings,
  LogOut,
  ChevronRight,
  Users
} from 'lucide-react';

const variants = {
  open: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
  closed: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95,
    transition: { duration: 0.2 }
  },
};

const MenuItem = ({ icon: Icon, text, onClick, href }) => (
  <a
    href={href || "#"}
    className="flex items-center justify-between p-3 text-sm font-medium text-white/90 rounded-lg hover:bg-white/5 transition-colors group"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" strokeWidth={1.5} />
      <span>{text}</span>
    </div>
    <ChevronRight className="w-4 h-4 text-white/30" />
  </a>
);

export default function ProfileDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={variants}
      className="fixed md:absolute top-[4.5rem] md:top-full right-2 md:right-0 mt-0 md:mt-3 w-[calc(100vw-1rem)] md:w-72 max-w-sm origin-top-right bg-[#3a2d58]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-[60]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute -top-[7px] right-4 w-4 h-4 bg-[#3a2d58]/95 border-l border-t border-white/20 rotate-45 backdrop-blur-xl"></div>

      <div className="flex items-center gap-4 p-4 border-b border-white/10">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
        />
        <div>
          <p className="font-semibold text-white">AntMan</p>
          <p className="text-xs text-white/60">user@example.com</p>
        </div>
      </div>

      <div className="p-2">
        <nav className="flex flex-col">
          <MenuItem icon={User} text="Profile" onClick={onClose} href={createPageUrl('Profile')} />
          <MenuItem icon={Users} text="Agency" onClick={onClose} href={createPageUrl('Agency')} />
          <MenuItem icon={Wallet} text="Wallet" onClick={onClose} href={createPageUrl('Wallet')} />
          <MenuItem icon={Globe} text="Interests" onClick={onClose} />
          
          <div className="h-px bg-white/10 my-1"></div>

          <MenuItem icon={Star} text="Subscriptions" onClick={onClose} />
          <MenuItem icon={Heart} text="Favourites" onClick={onClose} />
          <MenuItem icon={Scissors} text="Custom Clips" onClick={onClose} />
          <MenuItem icon={ShoppingBag} text="Things I've Bought" onClick={onClose} />

          <div className="h-px bg-white/10 my-1"></div>
          
          <MenuItem icon={Ban} text="Blocked List" onClick={onClose} />
          <MenuItem icon={Gift} text="Refer a Friend" onClick={onClose} href="/refer" />
          <MenuItem icon={Settings} text="Settings" onClick={onClose} />
          
          <div className="h-px bg-white/10 my-1"></div>
          
          <a
            href="#"
            className="flex items-center justify-between p-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors group"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" strokeWidth={1.5} />
              <span>Logout</span>
            </div>
          </a>
        </nav>
      </div>
    </motion.div>
  );
}