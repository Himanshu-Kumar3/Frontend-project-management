import React from 'react'

const ProjectTask = ({currentProject}) => {
      
  return (
    <div>
      <div className='mt-8'>
            <div className='text-xs font-semibold'>
                  <select className='px-3 py-2 border mr-4 border-gray-400 rounded-sm' >
                        <option value="All Status">All Status</option>
                        <option value="to do">To Do</option>
                        <option value="in progress">In Progress</option>
                        <option value="done"> Done</option>

                  </select>
                  <select className='px-3 py-2 border mr-4 border-gray-400 rounded-sm' >
                        <option value="All Types">All Types</option>
                        <option value="task">Task</option>
                        <option value="bug">Bug</option>
                        <option value="feature"> Feature</option>
                        <option value="impovement"> Improvement</option>

                  </select>
                  <select className='px-3 py-2 border border-gray-400 rounded-sm' >
                        <option value="All Status">All Priorities</option>
                        <option value="Low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="High"> High</option>
                  </select>
            </div>

            <div className="overflow-x-auto border rounded-sm border-gray-400 mt-8">
            <table className="table">
                {/* head */}
             <thead className='border-b border-gray-400  text-xs'>
                 <tr>
                <th>TITLE</th>
                <th>TYPE</th>
                <th>PRIORITY</th>
                <th>ASIGNEE</th>
                <th>DUE DATE</th>
                </tr>
              </thead>
   

              {currentProject.length > 0  ? (<tbody>
                 { currentProject.map(task => (
                  
            <tr key={task._id}>
                  <td>
                    {task.title}
                </td>
                 <td>
                    {task.category}
                 </td>
                 <td>{task.priority}</td>
                 <td>{task.assignedTo}</td>
                 <td>{formatDate(task.dueDate)}</td>
                </tr>

                 ))}       
    </tbody>):(
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <p className='text-center font-semibold text-zinc-700'>No task found!</p>
                  </td>
                </tr>
              </tbody>
            )}
  </table>
</div>
            
      </div>
    </div>
  )
}

export default ProjectTask;