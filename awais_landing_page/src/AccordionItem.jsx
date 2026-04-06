import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export default function AccordionItem({ title, content}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ 
            marginBottom: '24px', 
            background: '#f9f9f9',
            borderRadius: '8px',
            padding: '0 20px',
            border: '1px solid #eaeaea' 
        }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    width: '100%', 
                    padding: '15px 0', 
                    background: 'none', 
                    border: 'none',
                    cursor: 'pointer', 
                    textAlign: 'left', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                {title}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <FaChevronDown color="#666" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}>
                        <p style={{ paddingBottom: '15px', color: '#555', whiteSpace: 'pre-wrap', margin: 0 }}>
                            {content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}