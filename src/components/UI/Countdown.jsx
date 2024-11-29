import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Helper function to calculate remaining time
  const calculateTimeRemaining = (expiryDate) => {
    const now = new Date().getTime();
    return expiryDate - now;
  };

  // Starts the countdown for the NFT
  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      const remainingTime = calculateTimeRemaining(new Date(expiryDate));

      // Update the state with the remaining time, or 0 if expired
      setTimeRemaining(remainingTime <= 0 ? 0 : remainingTime);

      if (remainingTime <= 0) {
        clearInterval(interval); // Stop the countdown when expired
      }
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [expiryDate]); // Runs only when expiryDate changes

  // Format the remaining time to hours, minutes, and seconds
  const formatTime = (time) => {
    if (time <= 0) return "Expired"; // Return "Expired" when the countdown is over
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="de_countdown">
      {timeRemaining !== null ? formatTime(timeRemaining) : "Loading..."}
    </div>
  );
};

export default Countdown;
