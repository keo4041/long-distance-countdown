// src/CountdownPage.js
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import PhotoDisplay from './components/PhotoDisplay';
import TimeDisplay from './components/TimeDisplay';
import LoveNotes from './components/LoveNotes';
import Celebration from './components/Celebration';
import FlightTracker from './components/FlightTracker';
import FloatingEmojis from './components/FloatingEmojis'; // <--- 1. IMPORT IT

import couplePhoto from './E&D.jpg';

const meetingDate = new Date('2025-06-18T12:00:00Z');

const calculateTimeLeft = () => {
    const difference = +meetingDate - +new Date();
    if (difference <= 0) return null;
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / 1000 / 60 / 60) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

const CountdownPage = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isFlightTime, setIsFlightTime] = useState(false);

    useEffect(() => {
        if (!timeLeft) return;

        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Example: Show flight tracker 48 hours before
        if (timeLeft.days <= 2) {
            setIsFlightTime(true);
        }

        return () => clearTimeout(timer);
    }, [timeLeft]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-twilight via-slate-900 to-black text-white font-serif p-4 sm:p-8 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            
            <FloatingEmojis /> {/* <--- 2. ADD IT HERE */}

            <AnimatePresence>
                {timeLeft ? (
                    <main className="w-full max-w-4xl mx-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <Header names="Eliké & Déborah" subtitle="Eight thousand miles feels like nothing when you mean everything."/>
                            <TimeDisplay timeLeft={timeLeft} />
                            <LoveNotes />
                        </div>
                        <div className="flex justify-center items-center">
                            <PhotoDisplay image={couplePhoto} />
                        </div>
                        {isFlightTime && <div className="md:col-span-2"><FlightTracker /></div>}
                    </main>
                ) : (
                    <Celebration />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CountdownPage;