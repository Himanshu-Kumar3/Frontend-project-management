import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, addprojects } from '../utils/projectSlice';
import CreateProject from './CreateProject';
import { addProjectTask } from '../utils/taskSlice';

const ProjectDashboard = () => {

      const {projects} = useSelector(store => store.project);
      const currentProjects = projects;
    
      const dispatch = useDispatch();
      const [isOpen , setIsOpen] = useState(false);
       const {workspace} = useSelector(store => store.workspace);
       const navigate = useNavigate();

      const getProjects = async()=>{
            try{
                  if(projects.length !== 0) return ;
                  const res =  await axios.post(BASE_URL + "/workspace/getProjects/" +workspace._id  , {} ,{withCredentials:true} );

                  
                  dispatch(addprojects(res?.data?.data));

            }catch(er){
                  console.log(er.message);
            }
      }

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
};



      const handleClick = ()=>{
            setIsOpen(true);

      }

      const handleProjectClick = async(project)=>{
            try{
        dispatch(addProject(project));

        if(addProjectTask[project.name]) {navigate("/projects/project/"+project._id) ; return}

        const res = await axios.post(BASE_URL + "/task/getProjectTask/" +project._id , {} , {withCredentials:true});
        dispatch(addProjectTask({projectName :project.name ,tasks: res?.data.data}))
        navigate("/projects/project/"+project._id);
        }catch(er){
          console.log(er.message);
        }

      }

      useEffect(()=>{
            if(workspace){
               getProjects();
            }
            
      } , [workspace]);

      if(!projects) return ;
      if(projects.length === 0) return (
      <div className='w-full'>
        <div className=' w-full border border-gray-300 rounded-md '>
        <div className='flex justify-between border-b h-10 border-gray-300 px-4 p-2'>
            <h2 className='text-md'>
                  Project Overview
            </h2>
            <Link to="/project" className='text-sm'>View all <i className="fa-solid fa-arrow-right-long font-extralight"></i></Link>
           </div>
     
     <div className='w-full h-50  text-center flex flex-col justify-center items-center  '>
      <div className='flex items-center justify-center rounded-full h-14 w-14 bg-zinc-500/20'>
             <i className="fa-regular fa-folder-open text-2xl text-zinc-700  rounded-full "></i>
      </div>
      <p className='text-xs text-zinc-500 mt-2'>No Projects Yet</p>
      <button type='button' onClick={handleClick} className='py-2 px-4 rounded-md font-semibold cursor-pointer sahdow:sm bg-blue-600 text-xs mt-2 text-white '>Create Your First Project</button>


     </div>



    </div>
    {isOpen && <div className='fixed -top-8 left-4 overflow-hidden z-15'>
        <CreateProject data={workspace} onClose={()=>setIsOpen(false)} />
      </div>}


</div>
   
  )

return (
      <div>
       <div className='w-full border border-gray-300 rounded-md '>
        <div className='flex justify-between border-b h-10 border-gray-300 px-4 p-2'>
            <h2 className='text-md'>
                  Project Overview
            </h2>
            <Link to="/projects" className='text-sm'>View all <i className="fa-solid fa-arrow-right-long font-extralight"></i></Link>
      </div>
      <div className=" rounded-md ">
            {currentProjects.slice(0,3).map((project) =>{
                const formattedDate = formatDate(project.startDate);
                  return <div className="p-6 border-b border-gray-400 rounded-sm hover:bg-base-200 hover:cursor-pointer" key={project._id} onClick={()=>handleProjectClick(project)}>
                        <div className=" flex justify-between">
                              <div>
                               <h3 className="text-sm py-1 font-semibold">{project.name}</h3>
                              <p className="text-xs text-zinc-600">{project.discription}</p>
                              </div>
                              <div>
                                    <h2 className="bg-zinc-300 text-zinc-700 px-3 text-xs py-1  font-medium rounded-md">{project.status.toUpperCase()}</h2>
                              </div>      

                         </div>

                  <p className="text-xs text-zinc-600 pt-1"><i className="fa-regular fa-calendar"></i> {formattedDate}</p>

                  <div className='flex justify-between mt-3 mb-1 '>
                        <p className='font-semibold text-sm'>progress</p>
                        <p className='font-semibold text-md'>
                            {project.range || 0}%  
                        </p>
                  </div>
                  <input type='range' min={0} max={100}   value={project.range || 0} readOnly  className='w-full accent-blue-500' />

            </div>})}

      </div>
      </div>
            
      </div>
)  
}

export default ProjectDashboard;
