import React, { useEffect, useState } from 'react';

export const Get = () => {
  const URL = 'http://localhost:3000/api/v1';
  const [password, setpassword] = useState([]);

  const token = localStorage.getItem('token');
  const cleanToken = JSON.parse(token) 
  const decodedToken = JSON.parse(atob (cleanToken.split ('.')[1]))
  //PAGINA PRINCIPAL -> UI / LOGICA DE BORRADO Y ACTUALIZADO
  useEffect(() => {
    fetch(`${URL}/register/${decodedToken.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cleanToken}`,  
      },
    })
      .then((res) => res.json())
      .then((data) => setpassword(data));
  }, []);

  console.log(password);    


  return <div>Get</div>;
};
