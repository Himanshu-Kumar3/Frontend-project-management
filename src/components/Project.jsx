import React, { act, useState } from 'react'
import CreateTask from './CreateTask';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectTask from './ProjectTask';

import ProjectSetting from './ProjectSetting';

const Project = () => {

      const {project} = useSelector(store => store.project)
      const {projectTask} = useSelector(store => store.task);
      const [isCreateProject , setIsCreateproject] = useState(false);
      const [activeView , setActiveview] = useState('task');

     

     const formatDate = (dateString) => {
       const date = new Date(dateString);
       const day = date.getDate();
       const month = date.toLocaleString('default', { month: 'short' });
       const year = date.getFullYear();
       return `${day} ${month}, ${year}`;
      };


      if(!project) return;
      // currentProjectTasks
      const currentProject = projectTask[project?.name] || [];

//       const completedTasks = currentProjectTasks.filter(task => 
//     task?.status === 'completed' || task?.status === 'done'
//   ).length;
//   const inProgressTasks = currentProjectTasks.filter(task => 
//     task?.status === 'in progress' || task?.status === 'pending'
//   ).length;

 

  return (
    <div className='p-8 pl-16'>
      <div className='flex justify-between'>
            <div className='flex items-baseline'>
            <Link to={"/projects"} className='mr-6 hover:bg-base-200'><i className="fa-solid fa-arrow-left"></i></Link>
            <h2 className='text-lg font-bold'>{project?.name}</h2>
            </div>
            <button className='bg-blue-500 text-white px-3 py-2 text-sm rounded-sm shadow-md cursor-pointer' onClick={()=> setIsCreateproject(true)}><i className="fa-solid fa-plus"></i> New Task</button>
      </div>

      <div className='grid grid-cols-4 gap-2 md:flex md:flex-wrap  '>
            <div className='w-50 border border-gray-400 rounded-sm p-2 mt-10 md:mr-3'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>Total task</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-2 text-2xl font-bold'>{currentProject.length || 0} </p>
            </div>
            <div className='w-50 border border-gray-400 rounded-sm p-2 md:mr-3 mt-10'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>Completed</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='#50C878'><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-2 text-2xl font-bold text-emerald-500'>{0} </p>
            </div>
            <div className='w-50 border border-gray-400 rounded-sm p-2 md:mr-3 mt-10'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>In progress</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='#F05E1B'><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-2 text-2xl font-bold text-amber-500'>{0} </p>
            </div>
            <div className='w-50 border border-gray-400 rounded-sm p-2 mt-10'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>Team Member</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='#0000FF'><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-1 text-2xl font-bold text-blue-500'>{0} </p>
            </div>
      </div>

      <div className='mt-8 border border-gray-400 grid grid-cols-2 gap-2 w-63 rounded-sm'>
            <button className={`py-2 px-3 pr-5 text-xs  ${activeView === 'task' ? 'bg-base-300 font-semibold':''}`}  onClick={()=>setActiveview('task')}>
                  <i className="fa-solid fa-chart-gantt"></i>   Task
            </button>
            <button className={`py-2 px-3 text-xs  ${activeView === 'setting' ? 'bg-base-300 font-semibold':''}` } onClick={()=>setActiveview('setting')}>
                 <i className="fa-solid fa-gear"></i> Settings
            </button>
            
      </div>


     { activeView === 'task' && <ProjectTask currentProject={currentProject} formatDate={formatDate}/>}
            
           
      {activeView === 'setting' && <ProjectSetting currentProject={currentProject} project={project} />}

      
      

      {isCreateProject && <CreateTask data={project} onclose={()=>setIsCreateproject(false)}/>}
    </div>
  )
}

export default Project;