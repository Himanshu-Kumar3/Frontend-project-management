
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
  // const getWorkspaceInfo = async()=>{
  //   try{
  //     if(workspace) return ;
  //     const res = await axios.get(BASE_URL + "/user/getWorkspace" , {withCredentials:true});
      
  //     dispatch(addWorkspace(res?.data?.data[0]));
  //   }catch(er){
  //   console.log(er?.message);
  //    if(er?.response?.status === 404){
  //     navigate("/create-workspace");
  //    }

  //   }


  // }

  const getUserAndWorkspace = async()=>{
    try{
      if(user) return ;
      const resUser = await axios.get(BASE_URL + "/user/getUser" , {withCredentials:true})

      dispatch(addUser(resUser.data))

      const res = await axios.get(BASE_URL +"/user/getWorkspace" , {withCredentials:true})

      dispatch(addWorkspace(res?.data.data[0]))

    }catch(er){
      if(er.response.status === 404){
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

  if(!user) return;


  
  return (

    workspace && (<div data-theme={theme} className='flex font-optical-sizing:auto'>
      <Sidebar  />
      <MainComponent />
    </div>)
  )
}

export default MainPage;