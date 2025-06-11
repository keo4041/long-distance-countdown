// src/components/Celebration.js
import React from 'react';
import { motion } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';
import couplePhoto from '../MyLove.png'; // Use your main photo as one of the memories

const memories = [couplePhoto, /* Add more imported photos here, e.g., photo2, photo3 */];

const Celebration = () => {
    const { width, height } = useWindowSize();

    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Cascade of Memories */}
            {Array.from({ length: 20 }).map((_, i) => {
                const memoryImage = memories[i % memories.length];
                return (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ top: '-20%', x: `${Math.random() * 100}vw`, rotate: Math.random() * 180 }}
                        animate={{ top: '120%' }}
                        transition={{ duration: Math.random() * 5 + 5, delay: Math.random() * 3, ease: 'linear', repeat: Infinity }}
                    >
                        <img src={memoryImage} alt="memory" className="w-24 h-24 object-cover rounded-lg shadow-xl border-2 border-white"/>
                    </motion.div>
                );
            })}
            
            <div className="z-10 bg-black/50 p-8 rounded-lg">
                <h1 className="font-script text-7xl md:text-9xl text-rose-gold mb-4">Finally Together</h1>
                <p className="text-2xl text-slate-200">Our new beginning starts now.</p>
            </div>
        </motion.div>
    );
};

export default Celebration;