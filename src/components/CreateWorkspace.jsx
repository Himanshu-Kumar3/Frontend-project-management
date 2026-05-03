import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addWorkspace } from '../utils/workspaceSlice';
import { useNavigate } from 'react-router-dom';

const CreateWorkspace = () => {

      const [name , setName] = useState("");
      let slug = name;

      const dispatch = useDispatch();
      const navigate = useNavigate();
      const handleBtnClick = async()=>{
            try{
            const res = await axios.post(BASE_URL + "/user/createWorkspace" , {name , slug} , {withCredentials:true})

            dispatch(addWorkspace(res?.data));
            navigate("/");
            }catch(er){
                  console.log(er.message);
            }

      }

    

  return (
      <div className='h-screen w-screen bg-white/50 '>
      <div className=' absolute top-[22%]  left-[40%] w-93 h-85  '>
    <form onSubmit={(e)=> e.preventDefault()} className=' bg-white p-4 w-90  rounded-2xl '>
      <h2 className='text-black -mt-1 font-semibold'>Create organization</h2>
      <fieldset className="fieldset">
      <legend className="fieldset-legend text-black">Name</legend>
      <input type="text" className="input bg-white text-black border-black"  placeholder='Organization name' 
      value={name} 
      onChange={(e)=>setName(e.target.value)} />
      </fieldset>
     <fieldset className="fieldset">
      <legend className="fieldset-legend text-black">Name</legend>
      <input type="text" className="input bg-white text-black border-black"  placeholder='Organization name' 
      value={name} 
      onChange={(e)=>setName(e.target.value)} />
      </fieldset>

      <fieldset className="fieldset">
      <legend className="fieldset-legend text-black">Slug</legend>
      <input type="text" className="input  bg-white text-black border-black"  placeholder='my-org' 
      value={name} onChange={(e)=> e.defaultPrevented} />
      </fieldset>

      <button onClick={handleBtnClick} className='btn mt-10 ml-40'>Create organization</button>

    </form>
    </div>

      </div>
   
  )
}

export default CreateWorkspace;