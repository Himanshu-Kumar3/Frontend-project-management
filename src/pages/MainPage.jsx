
import Sidebar from '../components/Sidebar';
import MainComponent from '../components/MainComponent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addWorkspace, addWorkspaces } from '../utils/workspaceSlice';
import { addUser } from '../utils/userSlice';
const MainPage = () => {
  const user = useSelector(store => store.user);
  const workspace = useSelector(store => store.workspace?.workspace);
  const theme = useSelector(store => store.theme);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUserAndWorkspace = async()=>{
    try{
      let currentUser = user;
      console.log("current User" , currentUser)
      if(!currentUser){
      const resUser = await axios.get(BASE_URL + "/user/getUser" , {withCredentials:true})

      console.log(resUser.data)
      dispatch(addUser(resUser.data))
      }

      const res = await axios.get(BASE_URL +"/user/getWorkspace" , {withCredentials:true})

      console.log(res.data.data[0])
      dispatch(addWorkspace(res?.data.data[0]))

    }catch(er){
      console.log(er.response);
      if(er.response.status === 404){ // have to change this
        navigate("/Signup");
      }
      if(er.response.status === 401){
        navigate("/create-workspace");
      }
      console.log(er.response.status);
    }
  }

  useEffect(()=>{
  
    getUserAndWorkspace();

  
  },[])
       

    if (!workspace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  
  return (

    workspace && (<div data-theme={theme} className='flex font-optical-sizing:auto'>
      <Sidebar  />
      <MainComponent />
    </div>)
  )
}

export default MainPage;