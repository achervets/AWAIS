import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function PageTransition({ children, title }) {
  useEffect(() => {
    document.title = title || "Nastya's Visa Emporium";
  }, [title]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} 
      
      animate={{ opacity: 1, y: 0 }} 
      
      exit={{ opacity: 0, y: -15 }} 
      
      transition={{ duration: 0.3, ease: "easeOut" }}

      style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}
    >
      {children}
    </motion.div>
  );
}