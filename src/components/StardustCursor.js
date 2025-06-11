// src/components/StardustCursor.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StardustCursor = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPoints(prev => [...prev, { x: e.clientX, y: e.clientY }]);
            // Limit the number of points to avoid performance issues
            if (points.length > 20) {
                setPoints(prev => prev.slice(1));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [points]);

    return (
        <div>
            {points.map((point, index) => (
                <motion.div
                    key={index}
                    className="absolute bg-rose-gold rounded-full"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        left: point.x,
                        top: point.y,
                        width: '8px',
                        height: '8px',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}
        </div>
    );
};

export default StardustCursor;