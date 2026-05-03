import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer';

const MainComponent = () => {
  return (
    <div className='w-[84%] min-h-screen overflow-y-auto ml-58 mt-17 overflow-x-hidden'>
      <Header/>
      <Outlet/>
       {/* Footer. */}
      <div className=' w-full ml-2 mt-4 shadow-md'>
        <Footer/>
      </div>
    </div>
  )
}

export default MainComponent;