// src/components/TimeDisplay.js
import React from 'react';
import { motion } from 'framer-motion';

const TimeBlock = ({ value, label }) => (
    <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-white">{String(value).padStart(2, '0')}</p>
        <p className="text-sm uppercase tracking-widest text-rose-gold">{label}</p>
    </div>
);

const TimeDisplay = ({ timeLeft }) => (
    <motion.div
        className="grid grid-cols-4 gap-4 my-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
    >
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </motion.div>
);

export default TimeDisplay;