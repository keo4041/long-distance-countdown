import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TimeDisplay from './TimeDisplay';
import FlightTracker from './FlightTracker';
// Import your photo here
import couplePhoto from '../MyLove.png'; 

  const meetingDate = new Date('2025-06-18T12:30:00Z');

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFlightTime, setIsFlightTime] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
        console.log(
            "Time left:",
            timeLeft
        );
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (new Date() > new Date('2025-06-09T00:00:01Z')) {
        console.log(
            "It's flight time!"
        );
      setIsFlightTime(true);
    } else {
        console.log(
            "It's not flight time yet."
        );
        
    }

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +meetingDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // Dynamic background based on how close the date is
  const daysLeft = timeLeft.days || 0;
  const backgroundClass = daysLeft > 7 
    ? "from-indigo-900 to-black"
    : "from-purple-800 to-pink-900";


  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000 ease-in-out flex flex-col items-center justify-center text-white font-serif p-4 overflow-hidden`}>
      {/* Starry background */}
      {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                height: `${Math.random() * 2 + 1}px`,
                width: `${Math.random() * 2 + 1}px`,
            }}
          />
      ))}
      
      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Eliké & Déborah</h1>
        <p className="text-lg md:text-xl mb-6">The final countdown has begun</p>
      </motion.div>

      {/* Photo display */}
      <motion.div
        className="relative mb-8"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={couplePhoto} alt="Eliké and Déborah" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-pink-400 animate-ping"></div>
      </motion.div>

      <TimeDisplay timeLeft={timeLeft} />
      
      {isFlightTime && <FlightTracker />}
    </div>
  );
};

export default CountdownTimer;