import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateProjects } from '../utils/projectSlice';

const ProjectSetting = ({project , currentProject}) => {

  const [name , setName] = useState(project?.name || '');
  const [discription , setDiscription] = useState(project?.discription || '');
  const [status , setStatus] = useState(project?.status || '');
  const [priority , setPriority] = useState(project?.priority || '');
  const [progress , setProgress] = useState(project?.progress || 0);
  const [error , setError] = useState('');
  const [isAddMember , setIsAddmember] = useState(false);
  const dispatch = useDispatch();
  const [isToast , setIsToast] = useState(false);


  const handleSaveChanges = async()=>{
    try{
      const updates = {name , discription , status, priority ,progress: Number(progress)};
      console.log("UPDATES" , updates)
      const res = await axios.post(BASE_URL + "/project/editproject/" +project._id ,updates, {withCredentials:true} );
      dispatch(updateProjects(res?.data.data))

      console.log(res.data.data)

      setIsToast(true);
            setTimeout(()=>{
                setIsToast(false);
            }, 2000);

    }catch(er){
      console.log(er?.response)
      // setError(er.response.message)
    }
    
  }
  return (
    <div>
    <div className='mt-7 flex '>
      <div className='border border-gray-300 w-[50%]   px-6 py-4 shadow-md rounded-md' >
        <h2 className='font-semibold  text-lg'>Project Details</h2>

         <div className='flex w-full'>
             <form onSubmit={(e)=>e.preventDefault()} className='w-full  '>
                <fieldset className="fieldset mt-2 ">
                   <legend className="fieldset-legend tracking-wide text-xs text-gray-600 ">Project name</legend>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm w-full text-sm" placeholder="Enter name of project" />
               </fieldset>
               <fieldset className="fieldset mt-2">
                   <legend className="fieldset-legend text-xs text-gray-600  ">Your bio</legend>
                   <textarea className="textarea  w-full text-sm" value={discription} onChange={(e)=> setDiscription(e.target.value)}  placeholder="Bio"></textarea>
              </fieldset>
             
             <div className='grid grid-cols-2 gap-4 mt-2'>
             <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-xs text-gray-600 ">Status</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="planning" defaultChecked>Planning</option>
                        <option value="active">Active</option>
                        <option value="completion">Completed</option>
                        <option value="hold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                   </select>
               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-xs text-gray-600 ">Priority</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={priority} onChange={(e)=>setPriority(e.target.value)}>
                         <option value="medium"defaultChecked>Medium</option>
                        <option value="low" >Low</option>
                        <option value="high">High</option>
                   </select>
               </fieldset>

               </div>

               <div className='mt-6 w-full'>
                <p className='text-sm text-gray-600 '>Progress : <span className='text-md font-semibold text-gray-700'>{project?.progress || progress}</span>%</p>
                <input type='range' max={100} min={0} value={progress} className='w-full mt-1 ' onChange={(e)=> setProgress(e.target.value)}/>
               </div>


            
                
             {error &&  <p className='text-xs text-red-500'>{error}</p>}


               <div className='my-4 flex justify-end'>
               <button   className='bg-blue-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2' onClick={handleSaveChanges}><i className="fa-regular fa-file-lines"></i> Save Changes</button>
               </div>


      </form>
            
      </div>

      </div>

      {/* Member Div */}
      <div className='w-[40%] min-h-20 rounded-md ml-10 border border-gray-300 shadow-md px-6 py-4'>
        <div className='flex justify-between'>
          <h2 className='text-lg font-semibold'>Team Members (<span>0</span>)</h2>
          <span className='border border-gray-400 px-1 hover:bg-gray-200 cursor-pointer rounded-md py-1 text-sm' onClick={()=>setIsAddmember(true)}><i className="fa-solid fa-plus"></i></span>
        </div>
        <div className='flex justify-between items-baseline mt-6'>
          <span className='text-sm'>himanshu23@gmail.com</span>
          <span className='border border-gray-400 px-2 py-1 font-semibold tracking-wide text-xs rounded-md'>Team Lead</span>
        </div>
      </div>

     

      </div>

{/* ADD member modal */}
     {isAddMember && <div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 flex justify-center items-center overflow-hidden z-10 border border-gray-300'>
        <div className='bg-white w-[30%] rounded-md px-4 py-4'>
          <h1 className='font-semibold text-lg'>Add Member to project</h1>
          <p className='text-sm '>Adding to project : <span className='text-blue-500'>{project.name || "movie site"}</span></p>

          <select className='mt-4 px-2 py-2 w-full border border-gray-400 rounded-md'>
            <option defaultChecked>Select a member</option>
            {/* <option>{}</option> */}
          </select>

          <div className='mt-10 mb-2 flex justify-end'>
            <button onClick={()=>setIsAddmember(false)} className='border  border-gray-300 px-3 py-2 mr-2 font-semibold rounded-md hover:bg-base-300 shadow-sm cursor-pointer'>Cancel</button>
            <button  className='border border-gray-300 px-3 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm cursor-pointer hover:text-gray-300'>Add Member</button>
          </div>

        </div>
      </div>}
      { isToast && <div className="toast toast-top toast-center">
      <div className="alert alert-info">
         <span>Project Created Sucessfuly.</span>
      </div>
    </div>}
    </div>
  )
}

export default ProjectSetting;  