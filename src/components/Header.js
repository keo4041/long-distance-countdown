// src/components/Header.js
import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ names, subtitle }) => (
    <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
    >
        <h1 className="font-script text-5xl md:text-7xl text-rose-gold mb-2">{names}</h1>
        <p className="text-lg text-slate-300 italic">"{subtitle}"</p>
    </motion.header>
);

export default Header;