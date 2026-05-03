import { createSlice } from "@reduxjs/toolkit";


const projectSlice = createSlice({
      name :"project",
      initialState: {
            project : null , 
            projects : []
      },reducers:{
            addProject(state ,action ){
                  state.project = action.payload;
            },
            addprojects(state , action){
                  state.projects = action.payload;
            },
            appendProject(state , action){
                  state.projects.push(action.payload);
            },
            updateProjects(state , action){
                  const {_id , ...updatedData} = action.payload;
                  const index = state.projects.findIndex(project => project._id === _id);
                  if(index !== -1){
                        state.projects[index] = {...state.projects[index] , ...updatedData}
                  }
                  // Also update current project if it's the same
                 if (state.project?._id === _id) {
                    state.project = { ...state.project, ...updatedData };
                 }
            },
            removeProject(state , action){
                  state.project = state.projects.filter((item)=> item !== action.payload);
            }
      }
});
export const {addProject , addprojects , appendProject,updateProjects, removeProject} = projectSlice.actions;
export default projectSlice.reducer;