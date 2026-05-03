import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
      name :"workspace",
      initialState :{
            workspace : null ,
            workspaces :[],
      },
      reducers:{
            addWorkspace(state , action){
                  state.workspace = action.payload;
            },
            addWorkspaces(state , action) {
                  state.workspaces = action.payload;
            },
            appendWorkspace(state, action){
                  state.workspaces.push(action.payload);
            },
            removeWorkspace(state,action){
                  return null;
            }
      }
})

export const {addWorkspace , removeWorkspace , addWorkspaces , appendWorkspace} = workspaceSlice.actions;
export default workspaceSlice.reducer;