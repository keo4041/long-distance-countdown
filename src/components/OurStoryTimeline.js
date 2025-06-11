// src/components/OurStoryTimeline.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const milestones = [
    { date: "August 14, 2023", title: "The Day We Met", description: "Our story began with a simple hello." },
    { date: "October 26, 2023", title: "Our First 'I Love You'", description: "When everything changed for the better." },
    { date: "January 1, 2024", title: "A New Year, A New Promise", description: "Facing the future, together." }
];

const OurStoryTimeline = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-8 text-center md:text-left">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="font-script text-rose-gold text-2xl hover:text-white transition-colors"
            >
                Our Story
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {milestones.map((item, index) => (
                            <div key={index} className="mb-4 text-left">
                                <p className="font-bold text-white">{item.date} - <span className="text-rose-gold">{item.title}</span></p>
                                <p className="text-slate-400 italic">{item.description}</p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OurStoryTimeline;