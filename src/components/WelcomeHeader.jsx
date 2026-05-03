import React from 'react'
import {Link} from "react-router-dom";

const WelcomeHeader = () => {

  return (

    <div data-theme="light" className='bg-white '>
      <div className="navbar  shadow-md">
         <div className="flex pl-6">
           <img src="/navbar-logo.png" alt="navbar-logo"  className='h-12 w-40 '/>
         </div>


      </div>
    </div>
  )
}

export default WelcomeHeader;