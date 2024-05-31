import { toast } from 'sonner';
import bcrypt from 'bcryptjs-react';
import { useState } from 'react';

export const UseRegister = ( paramUrl , initialState , token ) => {
    const URL = `http://localhost:3000/api/v1/${paramUrl}`;
  
    const [form, setForm] = useState( initialState );
    
    const onHandleInput = (e) => {
      const { value, name } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
      const onHandleSubmit = async (e) => {
        e.preventDefault();
  
        if (URL === `${URL}/register`) {
             if (form.fullName.trim().length <= 2) {
              toast.error('Name must contain 3 letters or more');
              return;
            }
        }
      
  
        if (
          !form.password.match(
            /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          )
        ) {
          toast.error(
            'The password must have a Uppercase, lowercase letter and a number',
          );
          return;
        }
  
        if (form.password.trim().length <= 6) {
          toast.error('Password must be longer than or equal to 6 characters');
          return;
        }
  
        const encodedPassword = bcrypt.hashSync(form.password, 12);
        setForm((prev) => ({
          ...prev,
          password: encodedPassword,
        }));
  
        const res = await fetch( URL, {
          method: 'POST',
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
        
        toast.success('Register successfully created');
       
      }
  
      return {
        onHandleInput ,
        onHandleSubmit,
        form
      }
  }