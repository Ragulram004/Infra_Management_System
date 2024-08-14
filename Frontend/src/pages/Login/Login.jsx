import React from 'react'
import Illustration from '../../assets/Illustration.svg'
import bitLogo from '../../assets/bitlogo.svg'
import google from '../../assets/google.svg'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';


const Login = () => {

  const login = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
     try {
      const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers:{
            Authorization : `Bearer ${tokenResponse.access_token}`
          },
        }
      )
      console.log(res)
     } catch (err) {
       const handleError = err;
     }
    }
  });

  return (
    <>
      <section className=' flex justify-center items-center h-screen bg-background'> 
        <div className=' flex justify-center items-center  md:w-5/6 lg:w-3/4 xl:w-2/4 xl:h-5/6 md:h-4/6 lg:h-5/6 bg-white rounded-lg h-1/2 w-4/5 p-7 border border-border'> 
          <div className=' hidden md:bg-[#13203242] md:flex md:justify-center md:items-center md:w-96 md:h-full md:rounded-lg '>
            <div className='md:w-60 lg:w-72'>
              <img   src={Illustration} alt="Audit Image" />  
            </div>
          </div>
          <div className='w-96 flex justify-center items-center flex-col gap-2' >
            <div className='w-24'>
              <img src={bitLogo} alt="" />
            </div>
            <h1 className='font-black text-primary text-sm lg:text-lg' >Sign In</h1>
            <p className='font-light text-xs pb-4 border-b-2 text-primary w-40 md:w-56 text-center '> Get access to your account</p>
            <h1 className='font-black lg:text-lg text-sm text-primary mt-2'>Hi Welcome,</h1>
            <p className='font-light md:test-sm text-xs pb-4  text-primary'>Start with sign-in process</p>
            
              <button className=' p-1 text-white bg-primary w-40 md:w-56 rounded-sm md:rounded-md flex flex-row justify-center items-center font-bold text-xs md:text-sm'onClick={() => login()}>
                Sign In 
              <img className='w-6' src={google} alt="" />
              </button>                    

            
            {
              <p className= 'p-1 text-error bg-white w-40 md:w-56 rounded-sm md:rounded-md flex flex-row justify-center items-center font-bold text-xs md:text-sm brder'>
              Email Not Found
            </p>
            }
          </div>
        </div>
      </section> 
    </>
  )
}

export default Login
