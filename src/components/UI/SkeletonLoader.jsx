import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-item">
      <div className="skeleton-header"></div>
      <div className="skeleton-countdown"></div>
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-price"></div>
    </div>
  );
};

export default SkeletonLoader;
