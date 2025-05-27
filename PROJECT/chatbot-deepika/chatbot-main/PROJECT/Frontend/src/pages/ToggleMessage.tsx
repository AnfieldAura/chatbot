import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const ToggleMessage: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <button onClick={() => setShow(prev => !prev)}>Toggle Message</button>

      <AnimatePresence>
        {show && (
          <motion.div
            key="msg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: '20px' }}
          >
            🎉 You’re now chatting with us!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
