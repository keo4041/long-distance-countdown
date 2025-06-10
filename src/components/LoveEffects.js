import React, { useState, useEffect } from 'react';

const LoveEffects = () => {
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const daysLeft = Math.floor((+new Date('2025-06-18T12:00:00Z') - +new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7) {
      setShowHearts(true);
    }
  }, []);

  return (
    <>
      {showHearts && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-500 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </>
  );
};

export default LoveEffects;