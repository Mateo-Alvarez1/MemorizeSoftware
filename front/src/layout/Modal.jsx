import React, { useState } from 'react';
import { RegisterLogic } from './RegisterLogic';

export const Modal = () => {

  const [modal, setModal] = useState(false);

  return (
    <div>
      <div className='flex items-center justify-center'>

      <button
        onClick={() => setModal(!modal)}
        className="w-11/12 mt-6 border border-zinc-500 py-4 text-gray-200 font-semibold font-pp hover:bg-zinc-300 hover:bg-opacity-10 transition"
      >
        Create MemorizePassword
      </button>
    
        <RegisterLogic modal={modal} setModal={setModal}/>
      </div>
     
    </div>
  );
};
