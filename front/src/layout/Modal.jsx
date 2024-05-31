import React, { useState } from 'react';
import { UseRegister } from '../hooks/UseRegister';

export const Modal = () => {

  const token = localStorage.getItem('token');
  const cleanToken = JSON.parse(token);

  const [modal, setModal] = useState(false);
  
  const { onHandleInput, onHandleSubmit , form} = UseRegister(
    'register',
    {
      name: '',
      password: '',
    },
    cleanToken,
  );


  return (
    <div>
      <div className='flex items-center justify-center'>

      <button
        onClick={() => setModal(!modal)}
        className="w-11/12 mt-6 border border-zinc-500 py-4 text-gray-200 font-semibold font-pp hover:bg-zinc-300 hover:bg-opacity-10 transition"
      >
        Create MemorizePassword
      </button>
    
      </div>
      <div
        id="modal-wrapper"
        className={`fixed z-10 inset-0 ${modal ? '' : 'hidden'}`}
      >
        <div className="flex  items-center justify-center min-h-screen bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="flex w-11/12 sm:w-5/12  xl:w-11/12 2xl:w-6/12 flex-col items-center justify-between bg-zinc-800 pt-16 pb-10  text-center rounded w-1/3">
           <div className='flex w-full  items-center justify-center relative'>
            <h3
              className="text-xl -mt-10 mb-5 font-semibold bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-400 bg-clip-text text-transparent tracking-wider lg:-mt-5"
              id="modal-title"
            >
              Create New MemorizedPassword
            </h3>
            
           </div>
            <form
              onSubmit={onHandleSubmit}
              action=""
              className="flex flex-col text-start justify-between items-center w-10/12 mt-5 xl:flex-row"
            >
              <div className="flex flex-col my-3 ">
                {' '}
                <label
                  className="bg-transparent text-md text-gray-200 pb-1 font-medium"
                  htmlFor="name"
                  
                >
                  Name
                </label>
                <input
                  id="name"
                  className="bg-transparent border border-gray-100 p-2 rounded-md pl-2 text-sm font-medium outline-none text-white"
                  type="text"
                  placeholder="Netflix"
                  name="name"
                  onChange={onHandleInput}
                  required
                />
              </div>
              <div className="flex flex-col my-3 ">
                {' '}
                <label
                  className="bg-transparent text-md text-gray-200 pb-1 font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="bg-transparent border border-gray-100 p-2 rounded-md pl-2 text-sm font-medium outline-none text-white "
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onHandleInput}
                  required
                />
              </div>
              <div className='flex flex-col xl:gap-5 xl:flex-row'>

              <button
                type="submit"
                className="px-16 bg-gradient-to-br mt-3 xl:-mb-4 from-gray-600 to-zinc-400 text-gray-200 text-ml rounded-md p-2 font-semibold  hover:drop-shadow-[0px_4px_8px_#545a75] transition-all"
              >
                Create
              </button>
              <button
                type='button'
                onClick={ () => setModal(!modal)}
                className="px-16 bg-gradient-to-br mt-3 xl:-mb-4 from-red-400 to-red-500 text-gray-200 text-ml rounded-md p-2 font-semibold  hover:drop-shadow-[0px_4px_8px_#d47979] transition-all"
              >
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
