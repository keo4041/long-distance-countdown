// src/CountdownPage.js
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { differenceInDays } from 'date-fns';

// Import All Components
import Header from './components/Header';
import PhotoDisplay from './components/PhotoDisplay';
import TimeDisplay from './components/TimeDisplay';
import FlightTracker from './components/FlightTracker';
import Celebration from './components/Celebration';
import StardustCursor from './components/StardustCursor';
import OurStoryTimeline from './components/OurStoryTimeline';
import MessageBottle from './components/MessageBottle';
import WeatherDisplay from './components/WeatherDisplay';
import MusicPlaylist from './components/MusicPlaylist';
import FloatingEmojis from './components/FloatingEmojis';
import LoveNotes from './components/LoveNotes';

import couplePhoto from './E&D.jpg';
// Add more photos for Memory of the Day
import memoryPhoto6 from './MyLove.png';
// import memoryPhoto7 from './MyLove.png';
// import memoryPhoto5 from './memories/photo5.jpg';

const meetingDate = new Date('2025-06-18T12:00:00Z');

const memoryLane = {
    // 7: { photo: memoryPhoto7, caption: "That time we..." },
    6: { photo: memoryPhoto6, caption: "Remember this sunset?" },
    5: { photo: couplePhoto, caption: "Soon, we'll make even more memories." }
};

const calculateTimeLeft = () => { 
    const difference = +meetingDate - +new Date();
    if (difference <= 0) return null;
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / 1000 / 60 / 60) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    }; };

const CountdownPage = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isFlightTime, setIsFlightTime] = useState(false);
    
    const isAfterMeeting = new Date() > meetingDate;

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
    
    if (isAfterMeeting) {
        return <Celebration />; // Or a dedicated "Ever After" component
    }

    const daysLeft = differenceInDays(meetingDate, new Date());
    const dailyMemory = memoryLane[daysLeft] || { photo: couplePhoto, caption: "Until we're together again." };

    return (
        <div className="min-h-screen bg-gradient-to-br from-twilight via-slate-900 to-black text-white font-serif p-4 sm:p-8 flex items-center justify-center overflow-hidden">
            <StardustCursor />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            <FloatingEmojis />
            <main className="w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <WeatherDisplay />
                    <MessageBottle />
                    <MusicPlaylist />
                </div>

                {/* Center Column */}
                <div className="lg:col-span-1 text-center order-first lg:order-none">
                    <Header names="Eliké & Déborah" subtitle="Eight thousand miles feels like nothing when you mean everything." />
                    <PhotoDisplay image={dailyMemory.photo} />
                    <p className="italic text-slate-400 mt-2 mb-4                     md:text-center
                    
                     text-center">{dailyMemory.caption}</p>
                            <LoveNotes />
                    <TimeDisplay timeLeft={timeLeft} />
                    {isFlightTime && <FlightTracker />}
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                    <OurStoryTimeline />
                </div>
            </main>
        </div>
    );
};

export default CountdownPage;