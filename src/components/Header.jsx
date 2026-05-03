import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { addTheme } from '../utils/themeSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const dispatch = useDispatch();
  const [isTheme , setIsTheme] = useState(true);
  const user = useSelector(store => store.user);
  const userData = user?.data || null;
  const navigate = useNavigate();

  const handleTheme = ()=>{
    
  
     if(isTheme === true){
      dispatch(addTheme("light"));
    }else{
       dispatch(addTheme("dark"));
    }
    setIsTheme(!isTheme);
   
  }
  const handleSignout = async()=>{
    try{
      await axios.get(BASE_URL + "/logout" , {withCredentials:true});
      navigate("/Signup");

    }catch(er){
      console.log(er.response.data.message);
    }
  } 

  if(!userData) return ;

  return (
    <div className='w-[83%] flex  bg-base-100 fixed top-0 ml-2 z-10 justify-between shadow-sm p-2 px-15 border-b border-gray-300'>
      <div className='border border-gray-400 items-baseline rounded-md focus-within:border-blue-400 focus-within:ring-1'>
        <i className="fa-brands fa-sistrix text-gray-500 pl-2 pt-2  text-md mr-1  "></i>
         <input type='text' className='p-2 w-80 text-sm  focus:outline-none'  placeholder='Search project ,tasks ....'/>
      </div>

           
      <div className='flex items-center '>
        <div className='  p-1 px-2 rounded-md shadow-sm' onClick={handleTheme}>
        <i className={`fa-regular ${isTheme ===true ? "fa-sun" : "fa-moon"} `}></i> 
        </div>
      <div className="dropdown dropdown-end ml-6">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-80 h-42 p-2 shadow-sm">
        <li className=''>
          <a className="flex">
            <img
            className='h-10 rounded-full'
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />            
             <div className='ml-4 '>
              <h2 className='font-semibold tracking-wide text-sm'>{userData.firstName + " " + userData.lastName}</h2>
              <p className='tracking-wide text-sm '>{userData.emailId}</p>
            </div>
          </a>
        </li>
        <li className='mt-2 hover:bg-base-200'><a className='py-3'> <i className="fa-solid fa-gear ml-3 mr-7 text-sm"></i> Manage Account</a></li>
        <li className='mt-2 ' onClick={handleSignout}><a className='py-3'><i className="fa-solid fa-right-from-bracket ml-3 mr-7 text-sm"></i> Sign out</a></li>
      </ul>
    </div>
      </div>

    </div>
  )
}

export default Header;



<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    
  </div>
</div>