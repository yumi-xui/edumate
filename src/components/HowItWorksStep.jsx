import React from 'react';

const HowItWorksStep = ({ number, title, description, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
        <div className="text-violet-600 text-2xl font-bold">{number}</div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HowItWorksStep;
