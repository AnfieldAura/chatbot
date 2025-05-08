import { motion } from 'framer-motion';
import React from 'react';

export const ChatButton: React.FC = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        backgroundColor: '#0052cc',
        color: 'white',
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        marginTop: '20px',
        cursor: 'pointer'
      }}
    >
      Start Chat
    </motion.button>
  );
};
