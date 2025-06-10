// src/components/PhotoDisplay.js
import React from 'react';
import { motion } from 'framer-motion';

const PhotoDisplay = ({ image }) => (
    <motion.div
        className="relative w-64 h-64 sm:w-80 sm:h-80"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, type: 'spring' }}
    >
        <div 
            className="absolute inset-0 bg-rose-gold rounded-full blur-2xl opacity-50" 
            style={{ animation: 'pulse 4s infinite ease-in-out' }}
        ></div>
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <img src={image} alt="Eliké and Déborah" className="w-full h-full object-cover" />
        </div>
        <style jsx>{`
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.05); opacity: 0.7; }
            }
        `}</style>
    </motion.div>
);

export default PhotoDisplay;