import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./utils/appstore";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import Dashboard from "./components/Dashboard";
import CreateWorkspace from "./components/CreateWorkspace";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Setting from "./components/Setting";
import Project from "./components/Project";


function App() {

  
 

  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename="/">
    <Routes>
      
      <Route path="/Signup" element={<Signup/>}/>
      
      <Route path="/"  element={<MainPage/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="projects"  element={<Projects/>}/>
      <Route path="team" element={<Team/>}/>
      <Route path="setting" element={<Setting/>}/>
      <Route path="projects/project/:projectId" element={<Project/>}/>
      </Route>
      <Route path="/create-workspace" element={<CreateWorkspace/>}/>

    </Routes>
    </BrowserRouter>
    

    </Provider>
    </>
  )
}

export default App
