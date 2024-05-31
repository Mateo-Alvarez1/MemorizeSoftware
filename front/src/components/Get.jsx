import React, { useEffect, useState } from 'react';
import { Modal } from '../layout/Modal';
import { toast } from 'sonner';

export const Get = () => {

  const URL = 'http://localhost:3000/api/v1';

  const token = localStorage.getItem('token');
  const cleanToken = JSON.parse(token);
  const decodedToken = JSON.parse(atob(cleanToken.split('.')[1]));

  const [password, setpassword] = useState([]);


  useEffect(() => {
    fetch(`${URL}/register/${decodedToken.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setpassword(data));
  }, [password]);

  const handleDelete = async(id) => {
    const res = await fetch(`${URL}/register/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    })

    if (res.ok) {
      toast.success('Record Correctly deleted')
      return
    }
  
  };

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-zinc-800 to-zinc-900">
      <h1 className="text-4xl md:text-5xl xl:text-6xl text-center py-20 font-pp font-bold bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700 bg-clip-text text-transparent">
        MemorizeApp
      </h1>
      <table className="w-11/12 mx-auto divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-transparent">
          <tr>
            <th
              scope="col"
              className="text-center px-3 py-3 text-left text-md font-medium text-gray-400 uppercase tracking-wider border border-gray-600 rounded"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-center px-3 py-3 text-left text-md font-medium text-gray-400 uppercase tracking-wider border border-gray-600 rounded"
            >
              Password
            </th>
            <th
              scope="col"
              className="text-center px-3 py-3 text-left text-md font-medium text-gray-400 uppercase tracking-wider border border-gray-600 rounded"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className=" divide-y divide-gray-200 bg-transparent">
          {password.map((item) => (
            <tr key={Math.random() * 3}>
              <td className="ml-4 border-l border-b py-2 border-gray-600">
                <div className="text-center text-lg font-medium text-gray-200">
                  {item.name}
                </div>
              </td>
              <td className="px-0 py-6 whitespace-nowrap border-b border-r border-l lg:px-6 border-gray-600">
                <div className="text-md font-semibold text-gray-200 text-center">
                  {item.password}
                </div>
              </td>
              <td className="px-0 py-3.5 whitespace-nowrap flex flex-col items-center text-sm font-medium outline outline-1 outline-gray-600 text-center lg:px-6 lg:flex-row ">
                <button
                className=" w-max mb-2 text-indigo-500 border py-3 px-5 border-indigo-500 rounded-xl lg:mb-0 lg:w-6/12 hover:bg-indigo-500 hover:text-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className=" text-red-500 py-3 px-5 border border-red-500 rounded-xl lg:ml-2 lg:w-6/12 hover:bg-red-500 hover:text-gray-200 "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal/>
    </div>
  );
};
