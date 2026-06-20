import Input from './components/Input';
import Button from './components/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { API_URL } from './config/api';
import { useEffect } from 'react';
import { toast } from "react-toastify";


import Icon from "./components/Icon";

function App() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId:"",
    password:""
  });
  const [error, setError] = useState({
    userId: "",
    password: ""
  });

  useEffect(() => {

    const checkLogin = async () => {

        try {

            const response = await apiFetch(
                "/users/check-auth",
                {
                    credentials: "include"
                }
            );

            if (response.ok) {
                navigate("/users", { replace: true });
            }

        } catch (error) {

            console.log(error);

        }

    };

    checkLogin();

}, [navigate]);
  const validateForm = () => {
    const newErrors = {};

    if(!formData.userId.trim())
      newErrors.userId = "User ID is required";

    if(!formData.password.trim())
      newErrors.password = "Password is required";

    setError({
      userId: newErrors.userId || "",
      password: newErrors.password || "",
    });

    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e)=>{

    const {id, value} = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));

    setError((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleLogin = async () => {

    if(!validateForm())
      return;

  try {

    const response = await fetch(
      `${API_URL}/users/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: formData.userId.trim(),
          password: formData.password
        })
      }
    );

    console.log(response.status);

    const data = await response.json().catch(() => ({}));

    console.log(data);
    if (response.ok) {

      console.log("Login Success");

      localStorage.setItem(
        "userId",
        data.userId
      );

      navigate("/users");

    } else {

      toast.error(data.message || "Invalid credentials");

    }

  } catch (err) {

    toast.error("Something went wrong. Please try again.");

  }
};

  return (
    <>
        <div className='flex flex-col md:flex-row h-screen bg-white '>

          <div className='w-full md:w-[45%] lg:w-[35%] flex flex-col justify-center px-6
                sm:px-10 md:px-12 lg:px-16 xl:px-24'>

              <Icon name="BPLtitle" alt="logo" className='mb-5' />

              <div className='w-full max-w-[360px]'>
              <h4 className='mb-8 text-[24px] sm:text-[24px] font-semibold text-[var(--primary-900)]'>
                Login
              </h4>

              <Input
                 id = "userId"
                 label = "User ID"
                 type = "text"
                 placeHolder = "Enter User ID"
                 value = {formData.userId}
                 required = {true}
                 onChange = {handleChange}
                 error = {error.userId}
               />

               <Input 
                 id="password"
                 label = "Password"
                 type="password"
                 placeHolder="Enter Password"
                 value = {formData.password}
                 required={true}
                 onChange = {handleChange}
                 error = {error.password}
               />
               </div>

               <div className='flex justify-end mt-2'>
               <a 
                  href=''
                  className='text-sm text-[var(--primary-900)] hover:underline'
               >
                Forget Password?
               </a>
               </div>

               <Button
                 type="submit"
                 text = "Login"
                 onClick = {handleLogin}
                 className = 'w-full mt-6 bg-[var(--primary-900)] text-white' 
               />
             
          </div>

          <div className='hidden md:block md:w-[55%] lg:w-[65%] h-screen'>

              <Icon
                 name="LoginImg" 
                 alt="login image"
                 className='w-full h-full object-cover'
               />

          </div>
        </div>
    </>
  )
}
export default App;