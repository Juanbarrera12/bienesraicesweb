// src/components/Alert.js
import React from 'react';

const Alert = ({ children, className = '' }) => {
  return (
    <div className={`p-4 border rounded bg-red-100 text-red-700 ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};

export default Alert;

