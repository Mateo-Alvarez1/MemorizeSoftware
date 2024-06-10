import React, { useEffect, useState } from 'react';
import { Modal } from '../layout/Modal';
import { Table } from './Table/Table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Home = () => {
  const navigate = useNavigate()
  const URL = 'https://backmemorize.zeabur.app'; 
  const token = localStorage.getItem('token');
  const cleanToken = token && JSON.parse(token);
  const decodedToken = cleanToken && JSON.parse(atob(cleanToken.split('.')[1]));

  const [password, setpassword] = useState([]);
  const [initial, setInitial] = useState("")
  const [modal, setModal] = useState(false)


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

  const logout = () => {
    localStorage.clear()
    toast.success('You have succesfully logout')
    navigate("/login")
  }



  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-zinc-800 to-zinc-900">
      <div className='flex justify-center items-center relative'>
        <h1 className="relative right-12  text-3xl md:text-5xl xl:text-6xl text-center py-20 font-pp font-bold bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700 bg-clip-text text-transparent">
          MemorizeApp 
        </h1>
        <div onClick={ () => setModal(!modal)} className={`cursor-pointer absolute right-5 lg:right-32 h-16 w-16 rounded-full bg-zinc-800 ${ modal && 'lg:w-56 lg:h-16'}`}>
          <h2 className={`text-center text-2xl lg:text-2xl absolute bottom-0 left-5 -top-16 text-center py-20 font-pp font-medium text-zinc-400 ${modal && 'text-sm right-32 left-2.5 -top-14 lg:-top-16'}`}> { modal ? decodedToken.fullName : initial}</h2>
          <p className={`bg-zinc-700 bg-opacity-20 lg:py-3.5 pt-16 pb-5 top-0 rounded-full  lg:pl-6 pr-3.5 lg:pr-5 cursor-pointer absolute lg:top-1 mr-2 right:20 -left-0 lg:left-28 flex lg:text-xl text-red-500 font-medium ${ modal ? 'block text-base pl-1 pr-2':'hidden'} `}><span className='pl-1 lg:pl-0' onClick={logout}>Logout</span></p>
        </div>
      </div>
      <Table password={password}/>
      
      <Modal/>
    </div>
  );
};
