import { toast } from 'sonner';
import bcrypt from 'bcryptjs-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useForm = ( paramUrl , initialState ) => {
    const URL = `https://backendmemorize.zeabur.app/api/v1/auth/${paramUrl}`;
    const navigate = useNavigate();
  
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
          },
          body: JSON.stringify(form),
        });
  
        if (!res.ok) {
         toast.error('No user was found with this credentials')
         return
        }
        
        const data = await res.json();
        localStorage.setItem('token', JSON.stringify(data.token));
        toast.success('You have successfully registered');
        navigate('/home');
        
        setForm(initialState);
      }
  
      return {
        onHandleInput ,
        onHandleSubmit,
        form
      }
  }