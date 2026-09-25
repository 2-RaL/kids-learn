import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import RightPanel from './RightPanel';

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Right slide-in Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-[88vw] max-w-sm p-3 sm:p-4 flex flex-col lg:hidden"
          >
            <div className="h-full w-full bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-white/60 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 flex-shrink-0">
                <h3 className="font-black text-slate-800 text-base">Səs &amp; Öyrənmə Rejimi</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                  title="Bağla"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-0.5">
                <RightPanel />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default RightDrawer;
