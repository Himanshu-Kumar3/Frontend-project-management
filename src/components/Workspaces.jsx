import React from 'react'
import { useDispatch } from 'react-redux'
import { addWorkspace } from '../utils/workspaceSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addprojects } from '../utils/projectSlice';

const Workspaces = ({data , setIsOpen , currentWorkspaceId}) => {
  const dispatch = useDispatch();
  


  const handleWorkspaceClick =async()=>{
    
    try{
      dispatch(addWorkspace(data));
      const res =  await axios.post(BASE_URL+ "/workspace/getProjects/" +data._id  , {} ,{withCredentials:true} );
      dispatch(addprojects(res?.data?.data));
      }catch(er){
      console.log(er.message);
      }

    setIsOpen(false)
  }

  return (
      <div className='flex m-2 hover:bg-base-200 rounded-md justify-between items-center px-3 py-2' onClick={handleWorkspaceClick}  >
      <div className='flex'>
        <img src='https://cdn-icons-png.freepik.com/512/7672/7672529.png' className='h-8 w-8  mr-4' alt='Image-logo'/>
        <div className=''>
          <h3 className='text-xs font-semibold'> {data.name}   </h3>
          <p className='text-xs '> {data.slug}</p>
        </div>

      </div>
       
       {currentWorkspaceId === data._id && <div className=''>
          <p className='text-xs text-emerald-500'><i className="fa-solid fa-check"></i></p>
        </div>}
      </div>
  )
}

export default Workspaces;