// src/components/PhotoDisplay.js
import React from 'react';
import { motion } from 'framer-motion';

const PhotoDisplay = ({ image }) => (
    <motion.div
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-80 md:h-80 mx-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, type: 'spring' }}
    >
        {/* We now use the 'animate-pulse-glow' class from our config */}
        <div 
            className="absolute inset-0 bg-rose-gold rounded-full blur-2xl opacity-50 animate-pulse-glow"
        ></div>
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <img src={image} alt="Eliké and Déborah" className="w-full h-full object-cover" />
        </div>
        {/* The <style jsx> tag has been removed. No more warning! */}
    </motion.div>
);

export default PhotoDisplay;