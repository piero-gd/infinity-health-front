import React from 'react';

const Loader = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      {/* Mensaje */}
      {message && <p className="text-white text-lg">{message}</p>}
    </div>
  );
};

export default Loader;
