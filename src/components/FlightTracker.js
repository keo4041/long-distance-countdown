import React, { useState, useEffect } from 'react';

const FlightTracker = () => {
  // Mock flight data - replace with API call
  const [flightStatus, setFlightStatus] = useState({
    status: 'Scheduled',
    departure: 'JFK',
    arrival: 'LHR',
    progress: 0,
  });

  useEffect(() => {
    // Simulate flight progress
    if (flightStatus.status === 'In Air') {
      const interval = setInterval(() => {
        setFlightStatus(prev => ({ ...prev, progress: Math.min(prev.progress + 5, 100) }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [flightStatus.status]);

  // Simulate flight status changes
  useEffect(() => {
    setTimeout(() => setFlightStatus(prev => ({ ...prev, status: 'In Air' })), 2000);
    setTimeout(() => setFlightStatus(prev => ({ ...prev, status: 'Landed' })), 120000);
  }, []);

  return (
    <div className="mt-8 w-full max-w-md bg-white bg-opacity-20 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Flight Status</h2>
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold">{flightStatus.departure}</p>
        <p className="font-bold">{flightStatus.arrival}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${flightStatus.progress}%` }}
        ></div>
      </div>
      <p className="text-center font-bold">{flightStatus.status}</p>
    </div>
  );
};

export default FlightTracker;