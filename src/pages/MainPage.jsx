import Sidebar from '../components/Sidebar';
import MainComponent from '../components/MainComponent';
import { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);

  const getUserAndWorkspace = async () => {
    try {
      setLoading(true);
      
      // Always fetch user first to ensure we have fresh data and token
      console.log("Fetching user...");
      const resUser = await axios.get(BASE_URL + "/user/getUser", { withCredentials: true });
      console.log("User data:", resUser.data);
      dispatch(addUser(resUser.data));
      
      // Wait a moment to ensure cookie is properly set
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Then fetch workspace
      console.log("Fetching workspace...");
      const res = await axios.get(BASE_URL + "/user/getWorkspace", { withCredentials: true });
      console.log("Workspace data:", res.data);
      
      if (res?.data?.data ) {
        dispatch(addWorkspace(res.data.data[0]));
        
      } else {
        console.log("No workspace found, redirecting to create workspace");
        navigate("/create-workspace");
      }
    } catch (er) {
      console.log("Error response:", er.response);
      
      // Safe error handling
      if (er.response) {
        if (er.response.status === 401) {
          console.log("Workspace not found, redirecting to create workspace");
          navigate("/create-workspace");
        } else if (er.response.status === 404) { // had to chnage this
          console.log("Authentication failed, redirecting to signup");
          navigate("/Signup");
        } else {
          console.log("Error status:", er.response.status);
        }
      } else if (er.request) {
        console.log("Network error - Cannot connect to server");
      } else {
        console.log("Error message:", er.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAndWorkspace();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return null;
  }

  return (
    <div data-theme={theme} className='flex font-optical-sizing:auto'>
      <Sidebar />
      <MainComponent />
    </div>
  );
};

export default MainPage;