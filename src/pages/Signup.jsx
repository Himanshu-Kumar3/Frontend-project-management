import React from 'react'
import { useState  } from 'react';
import { BASE_URL} from "../utils/constants";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {useNavigate} from "react-router-dom";
import WelcomeHeader from '../components/WelcomeHeader';

const Signup = () => {


  const dispatch = useDispatch();
  const [isSignIn , setIsSignIn] = useState(false);
  const [errorMessage , setErrorMessage] = useState("");
  const [firstName,setFirstName] = useState("Samir");
  const [lastName , setLastName] = useState("Kumar");
  const [emailId , setEmail] = useState("samir23@gmail.com");
  const [password ,setPassword]= useState("Samir@123");
  const navigate = useNavigate();

 



  const handleToggleForm = ()=>{
   setIsSignIn(!isSignIn);
  }

  const handleSignupLogin= async()=>{
    try{
      if(isSignIn === false){
        const res = await axios.post(BASE_URL + "/signup" , {
          firstName , lastName , emailId , password 
        } ,{withCredentials:true});

       
        dispatch(addUser(res.data));
         navigate("/");
      }else{
        const res = await axios.post(BASE_URL + "/login" ,{emailId , password } ,{withCredentials:true});
        
        dispatch(addUser(res.data));
         navigate("/");
      }
    }catch(er){
      console.log(er?.response?.data?.message)
      setErrorMessage(er?.response?.data?.message);
      
    }
  }
  return (
<div  className='bg-gray-50 h-screen w-screen'>
  <WelcomeHeader/>

  <div className="backgroundImage  flex justify-center items-center -mt-16 h-full w-full  shadow-lg  ">
      <form onSubmit={(e)=>e.preventDefault()} className="   SignIn-form  bg-white shadow-2xl bg-linear   p-4   w-[70%] xs:w-[70%] sm:w-[50%] md:w-[30%] z-10 flex flex-col items-center flex-wrap rounded-lg  " >
      <h2 className="text-black self-start text-3xl font-semibold pl-10 py-1 ">{isSignIn ? "Sign In" : "Sign Up"}</h2>
      {!isSignIn && <input
      onChange={(e)=>setFirstName(e.target.value)}
      value={firstName}
       className="firstName border border-gray-400 text-black  my-2 p-2 m-2 w-4/5 rounded-sm  "
        placeholder="firstName" 
        type="text"
        />}

       {!isSignIn && <input
       onChange={(e)=>setLastName(e.target.value)}
       value={lastName}
       className="lastName  my-2 p-2 m-2 w-4/5 rounded-sm border border-gray-400 text-black"
        placeholder="lastName" 
        type="text"
        />}
        <input
        onChange={(e)=>setEmail(e.target.value)}
        value={emailId}
         className="Email  p-2 m-2 my-2 w-4/5 rounded-sm border border-gray-400 text-black " 
         placeholder="Enter Email" 
         type="email"
         />
         <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          className="password  my-2 p-2 m-2 w-4/5 rounded-sm border border-gray-400 text-black" 
          placeholder="Enter Password" 
          type="text"
          />

          <p className="ErrorMessage text-xs pt-1 text-red-500">{errorMessage}</p>
         <button
          className="SignInSignUpButton text-white w-4/5 bg-red-700 p-2 my-5 text-center text-lg rounded-md active:bg-red-900 cursor-pointer"
          onClick={handleSignupLogin}
          >{isSignIn ? "Sign In" : "Sign Up"}
          </button>

         <p 
         className="SignInSignUpToggle text-black font-semibold cursor-pointer underline hover:text-gray-700 py-4"
           onClick={handleToggleForm}
           >{isSignIn ? "New user ? Sign Up" : "Already Registered ? Sign In Now"}
            </p>

      </form>
        
      </div>
      <div className='footer flex justify-between absolute bottom-0  '>
        <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/default_left.558fbf68.svg" alt="left-footer" className='h-70 ml-0 ' />
        <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/default_right.f8462257.svg" alt="right-footer" className='h-70 ' />

      </div>
     
    </div>
    
  )
}

export default Signup;