import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterSelector from './CharacterSelector';

interface CharacterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterDrawer: React.FC<CharacterDrawerProps> = ({ isOpen, onClose }) => {
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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 xl:hidden"
          />

          {/* Left slide-in Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 left-0 z-50 w-[88vw] max-w-xs sm:max-w-sm p-2 sm:p-4 flex flex-col xl:hidden"
          >
            <div className="h-full w-full overflow-hidden rounded-3xl shadow-2xl">
              <CharacterSelector onClose={onClose} isDrawer={true} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CharacterDrawer;
