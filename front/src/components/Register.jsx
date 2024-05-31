import React from 'react';
import { Button } from '../layout/Button';
import { useForm } from '../hooks/UseForm';

export const Register = () => {

  const {onHandleInput , onHandleSubmit } = useForm('register' ,  {
    fullName:'' ,
    email:'',
    password:''
  })
  
  return (
    <div
      className="bg-gradient-to-br from-zinc-800 to-zinc-900 h-screen flex justify-center items-center font-pp"
    >
      <form
        onSubmit={onHandleSubmit}
        className=" px-10 py-7 flex flex-col rounded-lg bg-gray-600 bg-opacity-10 w-max"
      >
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
        <div className="flex flex-col my-3 -ml-2">
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

        <Button text='Sign Up'/>
        <p className="text-sm pt-4 mx-auto text-gray-200 hover:">
          Already have an account ?{' '}
          <a href="/login" className="text-indigo-500 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};
