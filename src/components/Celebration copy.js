// src/components/Celebration.js
import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize'; // We'll create this simple hook

const Celebration = () => {
    const { width, height } = useWindowSize();
    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
        >
            <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
            <h1 className="font-script text-7xl md:text-9xl text-rose-gold mb-4">Finally Together</h1>
            <p className="text-2xl text-slate-200">The wait is over. Our new beginning starts now.</p>
        </motion.div>
    );
};

export default Celebration;