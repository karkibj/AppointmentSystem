import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
