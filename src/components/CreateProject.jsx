import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { appendProject } from '../utils/projectSlice';
import { addUser } from '../utils/userSlice';

const CreateProject = ({data , onClose}) => {


    const user = useSelector(store => store.user);
      const [status , setStatus] = useState("planning");
      const [name , setName] = useState("");
      const [discription , setDiscription] = useState("");
      const [priority , setPriority] = useState("medium");
      const [startDate , setStartDate] = useState("");
      const [endDate , setEndDate] = useState("");
      const [teamLeadEmail , setTeamLeadEmail] = useState("");
      const [teamMember , setTeamMember] = useState("");
      const workspaceId = data._id;
      const [error, setError] = useState("");
      const [isToast , setIsToast] = useState(false);

      const dispatch = useDispatch();


      const handleCancel = ()=>{
        onClose();
      }
      const handleCreateProject = async() =>{
        try{
            const res = await axios.post(BASE_URL +"/project/createProject/"+workspaceId , {
                 name ,
                 discription ,
                 status,
                 priority,
                 startDate, 
                 endDate,
                 teamLeadEmail
            } ,{withCredentials:true});
         
         
            dispatch(appendProject(res?.data?.data));
            setIsToast(true);
            setTimeout(()=>{
                setIsToast(false);
                onClose();
            }, 2000);


        }catch(er){
            setError(er.response.data.message)
          


        }
      }

  const getUser = async()=>{
    try{
      if(user) return ;
      const res = await axios.get(BASE_URL +"/user/getUser" , {withCredentials:true});
     
      dispatch(addUser(res?.data))
    }catch(er){
      console.log(er?.response);
    }
  }

   useEffect(()=>{
        getUser();

      },[]);

  
  if(!user) return;
   
      
  return (
      <div className=' z-50 fixed overflow-auto scrollbar-hide inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <div className='overflow-y-auto mt-12  scrollbar-hide bg-white shadow-md rounded-md w-[35%] px-6 pt-4'>
      <h1 className='font-semibold'>Create New Project</h1>    
      <p className='text-xs'>In workspce : <span className='text-blue-700'>{data?.name}</span> </p>  
      <div className='flex'>
             <form onSubmit={(e)=>e.preventDefault()} className='w-full '>
                <fieldset className="fieldset  ">
                   <legend className="fieldset-legend ">Project name</legend>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm w-full" placeholder="Enter name of project" />
               </fieldset>
               <fieldset className="fieldset">
                   <legend className="fieldset-legend">Your bio</legend>
                   <textarea className="textarea  w-full" value={discription} onChange={(e)=> setDiscription(e.target.value)}  placeholder="Bio"></textarea>
              </fieldset>
             
             <div className='grid grid-cols-2 gap-4'>
             <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Status</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="planning" defaultChecked>Planning</option>
                        <option value="active">Active</option>
                        <option value="completion">Completed</option>
                        <option value="hold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                   </select>
               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Priority</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={priority} onChange={(e)=>setPriority(e.target.value)}>
                         <option value="medium"defaultChecked>Medium</option>
                        <option value="low" >Low</option>
                        <option value="high">High</option>
                   </select>
               </fieldset>

               </div>


            <div className='grid grid-cols-2 gap-4'>
             <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Start Date</legend>
                   <input type='date' value={startDate} onChange={(e)=> setStartDate(e.target.value)} className='px-3 py-2 border border-gray-400 rounded-sm'/>

               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend">End Date</legend>
                   <input type='date' value={endDate} onChange={(e)=> setEndDate(e.target.value)} className='px-3 py-2 border border-gray-400 rounded-sm'/>
               </fieldset>

               </div>

                <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Project Lead</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={teamLeadEmail} onChange={(e)=>setTeamLeadEmail(e.target.value)}>
                        <option value="planning" defaultChecked>No Lead</option>
                        <option value={user?.data.emailId}>{user?.data.emailId}</option>
                   </select>
               </fieldset>
                 <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Team Member</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={teamMember} onChange={(e)=>setTeamMember(e.target.value)}>
                        <option value="planning" defaultChecked>No Member</option>
                        <option value={user?.data.emailId}>{user?.data.emailId}</option>
                        {data?.members.map((member)=>{
                            <option value={member}>{member}</option>
                        })}

                   </select>
               </fieldset>
             {error &&  <p className='text-xs text-red-500'>{error}</p>}


               <div className='my-4 flex justify-end'>
                 <button className='bg-base-100 hover:bg-base-300 shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2   mr-4 ' onClick={handleCancel}>Cancel</button>
               <button  onClick={handleCreateProject} className='bg-blue-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2'>Create Project</button>

               </div>


      </form>
            
      </div>
        { isToast && <div className="toast toast-top toast-center">
      <div className="alert alert-info">
         <span>Project Created Sucessfuly.</span>
      </div>
    </div>}


    </div>


      </div>
    
  )
}

export default CreateProject;