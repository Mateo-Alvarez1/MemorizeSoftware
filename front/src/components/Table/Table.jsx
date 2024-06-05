import React, { useState } from 'react';
import eyeClose from '../../assets/eye.svg'
import eyeOpen from '../../assets/eyeOpen.svg'
import { UpdateLogic } from '../../layout/UpdateLogic';

export const Table = ({ password }) => {

  const [show, setShow] = useState({});
  const [modal, setModal] = useState(false)

  const URL = 'http://localhost:3000/api/v1';
  const token = localStorage.getItem('token');
  const cleanToken = JSON.parse(token);
  

  const handleDelete = async (id) => {
    const res = await fetch(`${URL}/register/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    });
  };

  const togglePassword = (index) => {
    setShow( prevState => ({
      ...prevState ,
      [index]:!prevState[index]
    }))
  }


  return (
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

      {password.length > 0 ? (
        <tbody className="divide-y divide-gray-200 bg-transparent">
          {password.map((item ) => (
            <tr key={item.id}>
              <td className="ml-4  border-l border-b border-gray-600 lg:py-8">
                <div className="text-center text-lg font-medium text-gray-200">
                  {item.name}
                </div>
              </td>
              <td className="px-0 py-6 px-5 w-3/12 whitespace-nowrap border-b border-r border-l lg:py-5 lg:px-6 border-gray-600">
                { show[item.id] ? (
                  <div  className=" flex items-center justify-center text-md font-semibold text-gray-200 text-center">
                    {item.password} <img className='w-6 ml-2 mt-1' onClick={ () => togglePassword(item.id)} src={eyeOpen} alt="" />
                  </div>
                ) : (
                  <div  className=" flex items-center justify-center text-md font-semibold text-gray-200 text-center">
                    { item.password && `*`.repeat(item.password.length)} <img className='w-6 ml-2 mb-1' onClick={  () => togglePassword(item.id)} src={eyeClose} alt="" />
                  </div>
                )} 
              </td>
              <td className="px-0 py-2 lg:py-6 h-full whitespace-nowrap flex flex-col items-center text-sm font-medium outline outline-1 outline-gray-600 text-center lg:px-6  lg:flex-row ">
                <button onClick={ () => setModal(!modal)} className="w-max mb-2 text-indigo-500 border py-3 px-5 border-indigo-500 rounded-xl lg:mb-0 lg:w-6/12 hover:bg-indigo-500 hover:text-gray-200">
                  Edit
                </button>
                { modal && <UpdateLogic modal={ modal } setModal={setModal} id={item.id} />}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 py-3 px-3 border border-red-500 rounded-xl lg:ml-2 lg:w-6/12 hover:bg-red-500 hover:text-gray-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody className="divide-y divide-gray-200 bg-transparent">
          <tr>
            <td colSpan="3" className="text-center py-6 text-gray-200 font-pp">
              No hay datos para mostrar.
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};
