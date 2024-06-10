import { toast } from 'sonner';
import bcrypt from 'bcryptjs-react';
import { useState } from 'react';

export const UseUpdate = (  id , paramUrl , initialState , token ) => {
    const URL = `https://backendmemorize.zeabur.app/api/v1/${paramUrl}/${id}`;
    const [form, setForm] = useState(initialState);
   
    const onHandleInput = (e) => {
      const { value, name } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

  
      const onHandleSubmit = async (e) => {

        e.preventDefault();
  
        
        if (form.name.trim().length < 2 ) {
          toast.error('Name must contain 2 letters or more');
          return
        }
 
        
        if (form.password.trim().length <= 0 ) {
          toast.error('Password must not be empty');
          return
        }

        const encodedPassword = bcrypt.hashSync(form.password, 12);
        setForm((prev) => ({
          ...prev,
          password: encodedPassword,
        }));
  
        const res = await fetch( URL, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
        if (!res.ok) {
         toast.error('The record could not be created, check the data.')
        
        }
        
        toast.success('Register successfully Update');
       
      }
  
      return {
        onHandleInput ,
        onHandleSubmit,
        form
      }
  }