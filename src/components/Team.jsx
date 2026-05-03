import React from 'react'
import { useSelector } from 'react-redux';

const Team = () => {

  const user = useSelector(store => store.user);
  const {workspace}= useSelector(store => store.workspace);
  const userData = user.data;

  const  admin = (workspace.ownerId === userData._id)? userData : null;

  if(!userData) return ;
  console.log(userData)
  
  return (
    <div className='ml-2 pl-10 pr-8 py-6'>
      <div className='flex w-full justify-between items-center px-1 '>
        <div className='title'>
         <h2 className='font-bold text-2xl'>Team</h2>
         <p className='text-sm text-zinc-600' >Manage team members and their contributions</p>
       </div>
       <button type='button' className='text-sm h-8 px-2 text-white rounded-xs shadow-sm cursor-pointer bg-blue-500 pr-3'  ><i className="fa-solid fa-user-plus"></i> Invite Member</button>
     </div>


     {/* List of the ovreview */}
    <div className='overview grid md:grid-cols-5  my-8  md:gap-6'>
     <div className='box rounded-md border p-4  py-3 bg-base-100 justify-between  border-gray-300 flex'>
          <div className='totalProject '>
            <h2 className='text-sm text-base-content/70'>Total Members</h2>
            <p className='text-3xl font-bold text-blue-500'>0</p>
          </div>

          <span className='folder bg-blue-500/10 p-1 px-2 h-8  rounded-md'>
            <i className="fa-solid fa-user-group text-blue-500"></i>
          </span>
        </div>


        <div className='box rounded-md border p-4  py-3 bg-base-100 justify-between  border-gray-300 flex'>
          <div className='totalProject '>
            <h2 className='text-sm text-base-content/70'>Active projects</h2>
            <p className='text-3xl font-bold text-emerald-500'>0</p>
          </div>

          <span className='folder bg-emerald-500/10 p-1 px-2 h-8  rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#50C878"><path d="M326-171q-15-11-22-28l-92-241H40v-80h228l92 244 184-485q7-17 22-28t34-11q19 0 34 11t22 28l92 241h172v80H692l-92-244-184 485q-7 17-22 28t-34 11q-19 0-34-11Z"/></svg>
          </span>
        </div>


        <div className='box rounded-md border p-4  py-3 bg-base-100 justify-between  border-gray-300 flex'>
          <div className='totalProject '>
            <h2 className='text-sm text-base-content/70'>Total Tasks</h2>
            <p className='text-3xl font-bold text-purple-500'>0</p>
          </div>

          <span className='folder bg-purple-500/10 p-1 px-2 h-8  rounded-md'>
            <i className="fa-solid fa-shield text-purple-500"></i>
          </span>
        </div>

    </div>



      {/*Search button  */}

     <div className='border w-104 border-gray-400 items-baseline rounded-md focus-within:border-blue-400 focus-within:ring-1'>
        <i className="fa-brands fa-sistrix text-gray-500 pl-2 pt-2  text-md mr-1  "></i>
         <input type='text' className='p-2 w-80 text-sm  focus:outline-none'  placeholder='Search project ,tasks ....'/>
      </div>


{/* table  */}
      <div className="overflow-x-auto border rounded-sm w-180 border-gray-400 mt-8">
      <table className=' text-sm w-full '>
        <thead className='py-2 bg-base-300' >
          <tr className=''>
            <td className='font-semibold pl-4 py-3'>Name</td>
            <td className='font-semibold'>Email</td>
            <td className='font-semibold'>Role</td>
          </tr>
        </thead>
        <tbody className='text-sm '>
          <tr>
            <td className='pl-4 pb-3 pt-3 font-medium'>{admin?.firstName + " "+ admin?.lastName}</td>
            <td className='text-gray-600 tracking-wide'> {admin.emailId}</td>
            <td><span className='text-purple-500 bg-purple-500/10 px-1 rounded-lg'>Owner</span></td>
          </tr>
          <tr>
            <td className='pl-4 pb-3 font-medium'>{admin?.firstName + " "+ admin?.lastName}</td>
            <td className='text-gray-600 tracking-wide'> {admin.emailId}</td>
            <td><span className='text-purple-500 bg-purple-500/10 px-1 rounded-lg'>Owner</span></td>
          </tr>


        </tbody>
      </table>

      </div>

    </div>
  )
}

export default Team;