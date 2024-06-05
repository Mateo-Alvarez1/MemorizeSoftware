import React, { useEffect, useState } from 'react';
import { Modal } from '../layout/Modal';
import { Table } from './Table/Table';

export const Home = () => {
//TODO -> RUTA PRIVADA / LOGOUT / SETEAR URL GLOBAL / LIMPIAR FORM 


  const URL = 'http://localhost:3000/api/v1';
  const token = localStorage.getItem('token');
  const cleanToken = JSON.parse(token);
  const decodedToken = JSON.parse(atob(cleanToken.split('.')[1]));
  const [password, setpassword] = useState([]);
  const [initial, setInitial] = useState("")
  useEffect(() => {
    fetch(`${URL}/register/${decodedToken.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setpassword(data));
      initials(decodedToken)
  }, [password]);


  const initials = (token) => {
    const split = token.fullName.split("")
    setInitial(split[0])
  }



  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-zinc-800 to-zinc-900">
      <div className='flex justify-center items-center relative'>
        <h1 className="relative right-12  text-3xl md:text-5xl xl:text-6xl text-center py-20 font-pp font-bold bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700 bg-clip-text text-transparent">
          MemorizeApp 
        </h1>
        <div className='cursor-pointer absolute right-10 lg:right-32 h-16 w-16 rounded-full bg-zinc-800'>
          <h2 className='text-center text-2xl absolute bottom-0 left-5 -top-16 text-center py-20 font-pp font-medium text-zinc-400'>{initial}</h2>
        </div>
      </div>
      <Table password={password}/>
      
      <Modal/>
    </div>
  );
};
