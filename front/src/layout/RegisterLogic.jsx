import React, { useState } from 'react'
import eyeOpen from '../assets/eyeOpen.svg'
import eyeClose from '../assets/eye.svg'
import { UseRegister } from '../hooks/UseRegister';
import x from '../assets/x.svg'

export const RegisterLogic = ({ modal , setModal  }) => {

  const [show, setShow] = useState(false);
  const token = localStorage.getItem('token');
  const cleanToken = JSON.parse(token);

  const { onHandleInput, onHandleSubmit } = UseRegister(
    'register',
    {
      name: '',
      password: '',
    },
    cleanToken,
  );


  return (
    <div
    id="modal-wrapper"
    className={`fixed z-10 inset-0 ${modal ? '' : 'hidden'}`}
  >
    <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex flex-col px-10 items-center justify-between bg-zinc-800 py-10  text-center rounded">
       <div className='flex items-center justify-between w-full'>
        <h3
          className="text-2xl -mt-5 font-semibold bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-400 bg-clip-text text-transparent tracking-wider lg:-mt-5"
          id="modal-title"
        >
          Create Password
        </h3>
        <img onClick={ () => setModal(!modal)} className='cross w-5 mb-4 ml-8 transition' src={x} alt="cross" />
       </div>
        <form
          onSubmit={onHandleSubmit}
          action=""
          className="flex flex-col text-start justify-between items-center w-9/12 mt-5 "
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
              className="bg-transparent border px-16 border-gray-100 p-2 rounded-md pl-2 text-sm font-medium outline-none text-white"
              type="text"
              placeholder="Netflix"
              name="name"
              onChange={onHandleInput}
            />
          </div>
          <div className="flex flex-col my-3  relative">
            {' '}
            <label
              className="bg-transparent text-md text-gray-200 pb-1 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="bg-transparent px-16 border border-gray-100 p-2 rounded-md pl-2 text-sm font-medium outline-none text-white "
              type={ show ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={onHandleInput}
            />
            {
              show ? <img onClick={ () => setShow(!show)} className='top-9 left-52 w-6 absolute' src={eyeOpen} alt="" />
              : <img onClick={ () => setShow(!show)} className='top-9 left-52 w-6 absolute' src={eyeClose} alt="" />
            }
          </div>
          <div className='flex flex-col xl:gap-5 xl:flex-row'>

          <button
            onClick={ () => setModal(!modal)}
            type="submit"
            className="px-24 bg-gradient-to-br mt-3 xl:-mb-2 from-gray-600 to-zinc-400 text-gray-200 text-ml rounded-md p-2 font-semibold  hover:drop-shadow-[0px_4px_8px_#545a75] transition-all"
          >
           Create
          </button>

          </div>
        </form>
      </div>
    </div>
  </div>
   
  )
}
