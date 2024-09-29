import React, { useEffect } from 'react';
import Illustration from '../../assets/Illustration.svg';
import bitLogo from '../../assets/bitlogo.svg';
import google from '../../assets/google.svg';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuthContext } from '../../hooks/useAuthContext';

const Login = () => {
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = React.useState('');
  const {dispatch} = useAuthContext();

  const googleResponse = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          },
        });

        const email = res.data.email;
        await login(email);

        // Redirect to home page after successful login
        navigate('/'); // Use navigate to redirect to the home page
        
      } catch (err) {
        console.error('Error during Google login:', err.message);
      }
    }
  });
  
  // const handleSubmit = async()=>{
  //   const res = await fetch(`https://g032l6k1-4500.inc1.devtunnels.ms/api/user/loginviaemail`,{
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email }),
  //   })
  //   const json = await res.json()
  //   if(!res.ok){
  //     console.log(json.error)
  //   }
  //   if(res.ok){
  //     localStorage.setItem('user', JSON.stringify(json));

  //     // Update the auth context
  //     dispatch({ type: 'LOGIN', payload: json });
  //     navigate('/');
  //   }
  // }
  

  return (
    <>
      <section className='flex justify-center items-center h-screen bg-background'> 
        <div className='flex justify-center items-center md:w-5/6 lg:w-3/4 xl:w-2/4 xl:h-5/6 md:h-4/6 lg:h-5/6 bg-white rounded-lg h-1/2 w-4/5 p-7 border border-border'> 
          <div className='hidden md:bg-[#13203242] md:flex md:justify-center md:items-center md:w-96 md:h-full md:rounded-lg'>
            <div className='md:w-60 lg:w-72'>
              <img src={Illustration} alt="Audit Image" />  
            </div>
          </div>
          <div className='w-96 flex justify-center items-center flex-col gap-2'>
            <div className='w-24'>
              <img src={bitLogo} alt="Logo" />
            </div>
            <h1 className='font-black text-primary text-sm lg:text-lg'>Sign In</h1>
            <p className='font-light text-xs pb-4 border-b-2 text-primary w-40 md:w-56 text-center'>Get access to your account</p>
            <h1 className='font-black lg:text-lg text-sm text-primary mt-2'>Hi Welcome,</h1>
            <p className='font-light md:text-sm text-xs pb-4 text-primary'>Start with sign-in process</p>
            <button 
              disabled={isLoading} 
              className='p-1 text-white bg-primary w-40 md:w-56 rounded-lg flex flex-row justify-center items-center font-bold text-xs md:text-sm' 
              onClick={() => googleResponse()}
            >
              Sign In 
              <img className='w-6' src={google} alt="Google Logo" />
            </button>                    
            
            {/* <input 
              type="text" 
              name="" 
              id="" 
              placeholder='Email' 
              className='p-1 w-40 md:w-56 rounded-lg' 
              onChange={(e) => setEmail(e.target.value)}
              />
            <button 
              className='p-1 text-white bg-primary w-40 md:w-56 rounded-lg flex flex-row justify-center items-center font-bold text-xs md:text-sm'
              onClick={handleSubmit}
            >Submit</button> */}
            {error && (
              <p className='p-1 text-error bg-white w-40 md:w-56 rounded-md flex flex-row justify-center items-center font-bold text-xs md:text-sm border border-error'>
                {error}
              </p>
            )}
          </div>
        </div>
      </section> 
    </>
  );
};

export default Login;
