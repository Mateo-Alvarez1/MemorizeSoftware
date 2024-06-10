import React, { useState } from 'react';
import { Button } from '../../layout/Button';
import { useForm } from '../../hooks/UseForm';
import eyeOpen from '../../assets/eyeOpen.svg'
import eyeClose from '../../assets/eye.svg'
import { Link } from 'react-router-dom';

export const Register = () => {

  const [show, setShow] = useState(false)
  const {onHandleInput , onHandleSubmit } = useForm('register' ,  {
    fullName:'' ,
    email:'',
    password:''
  })
  
  return (
<div
      className="bg-pattern pb-10 lg:pb-0 overflow-x-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 h-screen flex flex-col lg:flex-row justify-evenly lg:justify-between items-center 2xl:px-52 px-28 font-pp"
    >
      <div className=' pt-10 w-screen lg:w-6/12 flex flex-col justify-between h-max pb-10 lg:pb-0'>
        <h1 className='font-pp lg:mx-0 mx-auto text-4xl 2xl:text-8xl xl:text-7xl font-bold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent'>MemorizeApp</h1>
        <h2 className='font-pp font-light text-xl text-center lg:text-start lg:px-0 px-10 lg:text-2xl text-gray-300 pt-5'>Store, organize and access all your passwords in one place, simplifying your digital life.</h2>
      </div>
      <form onSubmit={onHandleSubmit} className="shadow-2xl w-max mx-10  px-7 py-7 flex flex-col rounded-lg bg-zinc-800 bg-opacity-5  ">
        <h1 className="mx-auto text-2xl mb-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent  font-bold ">
          Sign Up
        </h1>
        <div className="flex flex-col my-3 -ml-2">
          {' '}
          <label
            className="bg-transparent text-lg text-gray-200 pb-1 font-medium"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            className="bg-transparent border border-gray-100 p-2 rounded-md pl-2 text-sm font-medium outline-none text-white "
            type="text"
            placeholder="Your Name"
            name="fullName"
            onChange={onHandleInput}
            required
          />
        </div>
        <div className="flex flex-col my-3 -ml-2">
          {' '}
          <label
            className="bg-transparent text-md text-gray-200 pb-1 font-medium"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="bg-transparent border border-gray-100 p-2 rounded-md pl-2 text-sm font-medium outline-none text-white "
            type="email"
            placeholder="name@gmail.com"
            name="email"
            onChange={onHandleInput}
            required
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

        <Button text='Sign Up'/>
        <p className="text-sm pt-4 mx-auto text-gray-200 hover:">
          Already have an account ?{' '}
          <Link to={"/login"} className="text-indigo-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
