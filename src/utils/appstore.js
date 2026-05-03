
import {configureStore}  from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import workspaceReducer from "./workspaceSlice";
import themeReducer from "./themeSlice";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
      reducer:{
            user : userReducer,
            workspace : workspaceReducer,
            project : projectReducer,
            theme : themeReducer, 
            task: taskReducer
      }

})

export default store;