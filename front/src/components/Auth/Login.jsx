import React, { useState } from 'react';
import { Button } from '../../layout/Button';
import { useForm } from '../../hooks/UseForm';
import eyeOpen from '../../assets/eyeOpen.svg'
import eyeClose from '../../assets/eye.svg'
export const Login = () => {

  const [show, setShow] = useState(false)
  const {onHandleInput , onHandleSubmit } = useForm('login' , {
    email:'',
    password:''
  })

  return (
    <div
      className="bg-gradient-to-br from-zinc-800 to-zinc-900
    h-screen flex justify-center items-center font-pp"
    >
      <form onSubmit={onHandleSubmit} className="w-max mx-10  px-7 py-7 flex flex-col rounded-lg bg-gray-600 bg-opacity-10  ">
        <h1 className="mx-auto text-2xl mb-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent  font-bold ">
          Login
        </h1>
        <div className="flex flex-col my-3">
          {' '}
          <label
            className="bg-transparent text-md text-gray-200 pb-1 font-medium"
            htmlFor=""
          >
            Email
          </label>
          <input
            className="bg-transparent border border-gray-100 p-2 rounded-md pl-2 text-sm font-medium outline-none text-white "
            type="email"
            placeholder="name@gmail.com"
            name='email'
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

        <Button text='Sign Up' />
        <p className="text-sm pt-4 mx-auto text-gray-200">
          Still don't have an account ?{' '}
          <a href="/register" className="text-indigo-500 underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};