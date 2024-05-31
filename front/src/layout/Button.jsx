import React from 'react';

export const Button = ( {text} ) => {
  return (
    <button type='submit' className="-ml-2 px-5 bg-gradient-to-br from-gray-600 to-zinc-400 text-gray-200 text-ml rounded-md p-2 font-semibold mt-2  hover:drop-shadow-[0px_4px_8px_#545a75] transition-all">
      {text}
    </button>
  );
};
