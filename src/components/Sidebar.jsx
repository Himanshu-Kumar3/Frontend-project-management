import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import Workspaces from './Workspaces';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addWorkspaces } from '../utils/workspaceSlice';
import { addTasks } from '../utils/taskSlice';
const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector(store => store.project);
  const workspace = useSelector(store => store.workspace);
  const {tasks} = useSelector(store => store.task);
   const currentWorkspace = workspace.workspace;
   const workspaceList = workspace.workspaces;
  
  const [isOpen , setIsOpen] = useState(false);
  const [isTaskClicked , setIsTaskClicked] = useState(false);
  const [openProjectId , setOpenProjectId] = useState(null);
  
  const projects = project.projects;
 

  const getWorkspaces =async()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/getWorkspace" , {withCredentials:true});
    
      dispatch(addWorkspaces(res?.data?.data));
    }catch(er){
      console.log(er.message)
    }
  }

  const getTasks = async()=>{
    try{
      const res = await axios.get(BASE_URL + "/task/getTasks"  ,{withCredentials:true} )
    
      dispatch(addTasks(res.data.data)) 
    }catch(er){
      console.log(er?.response.data)
    }
  }

  

  const handleLinkClass = ({ isActive})=>{
    return `text-xs flex mx-2  justify-start items-center p-2 h-8 rounded-md ${isActive ? "bg-base-300" :"hover:bg-base-200"}`
  }

  const handleToggleWorkspace = ()=>{
    setIsOpen(!isOpen);
  }
  const handleIconClick = ()=>{
    navigate("/projects");

  }
  const handleOpenProject = (projectId)=>{
    setOpenProjectId(openProjectId === projectId   ? null : projectId)

  }
 
  useEffect(()=>{
    getWorkspaces();
    
    getTasks();
    } , []);
  if(!currentWorkspace) return;
  

  return (
    <div className='h-[100%] border border-gray-300 w-60 flex flex-col  fixed top-0 left-0'>

      {/* For the workspace */}
      <div className='p-2   border-b border-base-300 overflow-hidden  flex-shrink-0' >
      <div className='flex m-2 hover:bg-base-200 rounded-md justify-between items-center px-3 py-3' onClick={handleToggleWorkspace}>
         <div className='flex'>
        <img src='https://cdn-icons-png.freepik.com/512/7672/7672529.png' className='h-8 w-8  mr-4' alt='Image-logo'/>
        <div className=''>
          <h3 className='text-xs font-semibold'> {currentWorkspace.name}   </h3>
          <p className='text-xs text-zinc-500 '> {workspaceList.length} worksapces</p>
        </div>

      </div>
        <div className=''>
          <p className='text-xs'><i className="fa-solid fa-angle-down"></i></p>
        </div>
      </div>
     {isOpen &&  <div className=' absolute bg-base-100   z-2 w-55  shadow-md border  border-base-300 rounded-sm '>
        <h2 className='text-xs px-3 pt-3 pb-1 text-zinc-500'>WORKSPACES</h2>
        {workspaceList.map(workspace => (
         
          <Workspaces key={workspace._id} data={workspace } setIsOpen={(value)=> setIsOpen(value)} currentWorkspaceId={currentWorkspace._id}/>
          
          ))}

        <div className='border-t border-base-content/30 hover:bg-base-200 h-8 '>
          <Link to="/create-workspace" className='text-xs text-blue-500 pl-4 py-2 rounded-md'><i className="fa-solid fa-plus"></i> Create Workspace</Link>
        </div>


      </div>}
    </div>
    

    {/* Main body */}
    <div className='overflow-y-auto scrollbar-hide '>
      <div>

      {/* navlinks */} 
      <div className="h-35 p-3" >
        <NavLink to="/" className= {handleLinkClass}>
          <i className="fa-regular fa-folder-open"></i>
          <h3 className='project ml-4 text-xs font-normal'>Dashboard</h3>
        </NavLink>
        <NavLink to="/projects" className= {handleLinkClass}>
          <i className="fa-regular fa-folder-open"></i>
          <h3 className='project ml-4 text-xs font-normal'>Projects</h3>
        </NavLink>
        <NavLink to="/team" className={handleLinkClass}>
          <i className="fa-regular fa-folder-open"></i>
          <h3 className='project ml-4 text-xs font-normal'>Team</h3>
        </NavLink>
      </div>
    </div>
    
    <div className='p-3 flex flex-col'>
      <div className={`text-xs flex mx-2   justify-between items-center p-2 h-8 rounded-md hover:bg-base-300 }`} onClick={()=>setIsTaskClicked(!isTaskClicked)}>
        <h1 className=''> <i className="fa-regular fa-square-check text-zinc-500 mr-2"></i>My Tasks </h1>
        <p className= {isTaskClicked ?"rotate-90" : "rotate-0"}> <i className="fa-solid fa-angle-right"></i></p>
      </div>
      <div className='text-xs text-content-600  flex mx-2    items-center p-2 pt-3   rounded-md '>
        {!tasks && isTaskClicked && <p>No tasks assigned</p>}
        {tasks && isTaskClicked && <ul className=' w-full list-disc list-inside'>
          {tasks.map(task =>   <li key={task._id} className='px-3 py-2 text-xs cursor-pointer rounded-md w-full flex flex-col marker:text-blue-500 marker:text-lg'>
    <p className='text-xs font-medium '>{task.title}</p>
      <p className='text-xs text-gray-500 pl-1'>{task.status}</p>
  </li>)}

          </ul>}
      </div>
    </div>

    <div className='p-3'>
      <div className='flex justify-between items-baseline text-sm p-2 mx-2 text-content-700'>
        <h1 className='font-semibold '>PROJECTS </h1>
        <i className="fa-solid fa-arrow-right hover:bg-gray-300 cursor-pointer" onClick={handleIconClick}></i>
      </div>

      <div className='px-2 mx-2 text-xs ' >
        {projects.map((project)=> (
          <div key={project._id} className='  cursor-pointer '>
            <h2 className='   font-semibold flex  hover:bg-base-200 text-content-300 rounded-md px-2 py-2' onClick={()=>handleOpenProject(project._id)}> <span className={openProjectId === project._id  ? "rotate-90 mr-2 " :"rotate-0 mr-2"}><i className="fa-solid fa-angle-right text-xs font-light "></i></span>   {project.name}</h2>
            {openProjectId === project._id && <ul className='text-xs '>
               <li className='hover:bg-base-200 pl-3 text-content-200 py-2 rounded-md ml-3'><i className="fa-solid fa-chart-gantt mr-1"></i> Tasks</li>
               <li className='hover:bg-base-200 pl-3 text-base-content py-2 rounded-md ml-3'><i className="fa-regular fa-calendar-check mr-1"></i> Calender</li>
               <li className='hover:bg-base-200 pl-3  py-2 rounded-md ml-3'> <i className="fa-solid fa-gear mr-1"></i> Settings</li>
              </ul>}
            </div>
        ))}


      </div>
    </div>
      

    </div>

    

    </div>
    
  )
}

export default Sidebar;