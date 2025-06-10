// src/components/FloatingEmojis.js
import React from 'react';
import { motion } from 'framer-motion';

// Add all the cute emojis and "stickers" you want here!
const EMOJIS = ['💖', '✨', '🥰', '✈️', '💌', '💞', '😍', '💕', '👩‍❤️‍💋‍👨', '🫂'];

const FloatingEmojis = () => {
    // We create an array of a certain length to map over, generating an emoji for each item.
    // Increase the number (e.g., to 20) to have more emojis on screen.
    const emojiArray = Array.from({ length: 15 });

    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            {emojiArray.map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute text-2xl" // Use text-4xl or 5xl for a "sticker" feel
                    initial={{ 
                        y: '100vh', // Start from the bottom of the viewport
                        x: `${Math.random() * 100}vw`, // Random horizontal position
                        opacity: 0 
                    }}
                    animate={{ 
                        y: '-10vh', // End just above the top of the viewport
                        opacity: [0, 1, 0], // Fade in, then fade out
                        rotate: Math.random() * 20 - 10 // Add a slight random rotation
                    }}
                    transition={{
                        duration: Math.random() * 8 + 5, // Random duration between 5 and 13 seconds
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: Math.random() * 5, // Random start delay
                        ease: 'linear'
                    }}
                    style={{
                        // Apply a random size for variation
                        fontSize: `${Math.random() * 1.5 + 1}rem` // e.g., from 1rem to 2.5rem
                    }}
                >
                    {/* Pick a random emoji from our list for each instance */}
                    {EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingEmojis;