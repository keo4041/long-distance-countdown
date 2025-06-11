// src/components/FlightTracker.js

import React, { useState, useEffect } from 'react';

// This function now calculates progress based on the latest position data
const calculateProgress = (flight, position) => {
    if (!flight || !position) return 0;
    if (flight.status === 'Landed / Arrived') return 100;
    if (flight.status === 'Scheduled' || flight.status === 'Filed') return 0;

    const startTime = new Date(flight.departure_time.iso).getTime();
    const endTime = new Date(flight.arrival_time.iso).getTime();
    const now = new Date(position.timestamp * 1000).getTime(); // Use timestamp from position data

    if (now < startTime) return 0;
    if (now >= endTime) return 100;

    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    
    return Math.min(Math.round((elapsed / totalDuration) * 100), 100);
};


const FlightTracker = () => {
    const [flightInfo, setFlightInfo] = useState(null); // To store initial flight data (like airports)
    const [position, setPosition] = useState(null);   // To store live position
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFlight = async () => {
            try {
                // STEP 1: Find the flight to get its ID
                const findRes = await fetch('/api/find-flight');
                console.log(
                    "Find flight response status:",
                    findRes.status,
                    findRes.body
                );
                if (!findRes.ok) throw new Error('Could not find the flight.');
                                console.log(`body1`)

                const flightBody = await findRes.body?.getReader().read();
                const decoder = new TextDecoder();
                const flightText = decoder.decode(flightBody.value);
                console.log(`body2`)
                console.log                (
                    "Flight data received (raw body):",
                    flightText
                );
                
                
                console.log(`body3`)
                console.log                (
                    "Flight data received (raw body):",
                    flightBody.value
                    
                );
                const flightData = await findRes.json();
                                console.log(`body2`)

                console.log                (
                    "Flight data received (raw body):",
                    flightBody
                );
                
                console.log(
                    "Flight data received:",
                    flightData
                );
                setFlightInfo(flightData); // Save the main flight details
                

                // STEP 2: Use the ID to get the first position update
                const posRes = await fetch(`/api/flight-position/${flightData.fa_flight_id}`);
                if (!posRes.ok) throw new Error('Could not get flight position.');

                const posData = await posRes.json();
                console.log(
                    "Position data received:",
                    posData
                );
                
                setPosition(posData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getFlight();
    }, []);

    // This effect runs only after we have a flight ID to start polling for new positions
    useEffect(() => {
        if (!flightInfo?.fa_flight_id) return;

        const pollPosition = async () => {
            try {
                const res = await fetch(`/api/flight-position/${flightInfo.fa_flight_id}`);
                if (res.ok) {
                    const data = await res.json();
                    setPosition(data);
                }
            } catch (err) {
                console.error("Failed to poll position:", err);
            }
        };

        const interval = setInterval(pollPosition, 900000); // Poll for new position every 60 seconds
        return () => clearInterval(interval);

    }, [flightInfo]);


    if (loading) return <div className="text-center mt-8">Searching for the flight... ✈️</div>;
    if (error) return <div className="text-center mt-8 text-red-400">Error: {error}</div>;
    if (!flightInfo) return null;

    const progress = calculateProgress(flightInfo, position);
    const flightStatus = flightInfo.status.replace(/_/g, ' ');

    return (
        <div className="mt-8 w-full max-w-md bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Her Journey Home ✈️</h2>
            <div className="flex justify-between items-center mb-2 text-lg">
                <p className="font-bold">{flightInfo.origin.code_iata}</p>
                <p className="font-script text-3xl text-rose-gold mx-2">→</p>
                <p className="font-bold">{flightInfo.destination.code_iata}</p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                <div
                    className="bg-rose-gold h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-center font-bold text-lg capitalize">{flightStatus}</p>
            <p className="text-center text-sm text-slate-300 mt-1">
                {position ? `Altitude: ${position.altitude * 100}ft | Speed: ${position.groundspeed}kts` : `Flight ${flightInfo.ident}`}
            </p>
        </div>
    );
};

export default FlightTracker;