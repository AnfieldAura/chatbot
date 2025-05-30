import { motion } from 'framer-motion';
import React from 'react';

const AnimatedSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        fontSize: '24px',
        textAlign: 'center',
        marginTop: '40px'
      }}
    >
      👋 Welcome to the College Chatbot!
    </motion.div>
  );
};

export default AnimatedSection;
