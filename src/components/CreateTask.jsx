import React, { useState } from 'react'
import axios from "axios"
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addProjectTask, appendTask} from "../utils/taskSlice";

const CreateTask = ({data , onclose}) => {
      const [title , setTitle] = useState("");
      const [discription , setDiscription] = useState("No Discription");
      const [category , setCategory] = useState("feature");
      const [priority , setPriority] = useState("medium");
      const [assignedTo , setAsignee] = useState("samir23@gmail.com");
      const [status , setStatus] = useState("to do");
      const [dueDate , setDuedate] = useState("");
      const [error , setError] = useState(null);
      const [isToast , setIsToast] = useState(false);


      const dispatch = useDispatch();
      
      const project = data;

      const handleCancel =()=>{
            onclose();
      }

      
      const handleSubmitButton = async()=>{
          try{
               const passingData = {
                    title , discription , category, priority ,status , dueDate, assignedTo

               }
               
               const res = await axios.post(BASE_URL +"/task/createTask/"+ project._id , {
                    title , discription , category, priority ,status , dueDate, assignedTo
               } , {withCredentials:true});

               dispatch(appendTask(res?.data.data));

               const fetchRes = await axios.post(`${BASE_URL}/task/getProjectTask/${data._id}`,
                 {},
             { withCredentials: true }
             );
      
      // Update Redux store with the complete updated tasks list
               dispatch(addProjectTask({  projectName: data.name,  tasks: fetchRes?.data?.data    }));
               setIsToast(true);
               setTimeout(()=>{
                    setIsToast(false);
                    onclose()
               } , 1500)


          }catch(er){
               setError(er.response.data.message);
          }
      }

     

  return (
    <div className='z-50 fixed overflow-auto scrollbar-hide inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-start '>
      <div className='overflow-y-auto mt-6 border border-gray-500 scrollbar-hide bg-white text-black shadow-md rounded-md w-[35%] px-6 pt-4'>
           <h1 className='font-semibold'>Create New Task</h1> 
           <form onSubmit={(e)=> e.preventDefault()} className='w-full text-black'>
             <fieldset className="fieldset text-black  ">
                   <legend className="fieldset-legend text-black ">Title</legend>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm w-full" placeholder="Enter name of project" />
               </fieldset>
                <fieldset className="fieldset">
                   <legend className="fieldset-legend text-black text-xs">Discription</legend>
                   <textarea className="textarea bg-white border border-gray-400  w-full" value={discription} onChange={(e)=> setDiscription(e.target.value)}  placeholder="Bio"></textarea>
              </fieldset>

              <div className='grid grid-cols-2 gap-4'>
             <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs">Status</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="to do" defaultChecked>To Do</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                   </select>
               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs ">Priority</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={priority} onChange={(e)=>setPriority(e.target.value)}>
                         <option value="medium"defaultChecked>Medium</option>
                        <option value="low" >Low</option>
                        <option value="high">High</option>
                   </select>
               </fieldset>

               </div>


               <div className='grid grid-cols-2 gap-4'>
              <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs ">Asignee</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number'  >
                        <option value="planning" defaultChecked>No Asignee</option>
                        <option value={assignedTo}>{assignedTo}</option>
                   </select>
               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs">Category</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={category} onChange={(e)=>setCategory(e.target.value)}>
                         <option value="Feature"defaultChecked>Feature</option>
                        <option value="bug" >Bug</option>
                        <option value="improvement">Improvement</option>
                        <option value="others" >Others</option>

                   </select>
               </fieldset>
               </div>
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs">Due Date</legend>
                   <input type='date' value={dueDate} onChange={(e)=> setDuedate(e.target.value)} className='px-3 py-2 border text-black border-gray-400 rounded-sm'/>
               </fieldset>

               {error &&  <p className='text-xs text-red-500'>{error}</p>}


               <div className='my-4 flex justify-end'>
                 <button className='bg-gray-100 hover:bg-gray-300 shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2   mr-4 ' onClick={handleCancel}>Cancel</button>
               <button   className='bg-blue-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2' onClick={handleSubmitButton}>Create Task</button>

               </div>
           </form>
      </div>
         { isToast && <div className="toast toast-top toast-center">
      <div className="alert alert-success">
         <span>Task Created Sucessfuly.</span>
      </div>
    </div>}
    </div>
  )
}

export default CreateTask;