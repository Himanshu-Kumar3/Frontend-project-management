import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
      name : "task" ,
      initialState:{
            task: null, 
            tasks:[],
            projectTask : {},
      } ,
      reducers:{
            addTask(state , action){
                  state.task = action.payload
            }, appendTask(state , action){
                  state.tasks.push(action.payload);
            }, addTasks(state , action){
                  state.tasks = action.payload;
            },
            addProjectTask(state , action){
                  const {projectName , tasks} = action.payload;
                  if(!state.projectTask[projectName]){
                        state.projectTask[projectName] = [];

                  }
                  if(Array.isArray(tasks)){
                         state.projectTask[projectName].push(...tasks);
                  }else{
                         state.projectTask[projectName].push(tasks);
                  }
                 
            },removeTask(state , action){
                  state.tasks.filter(task => !task.includes(action.payload))
            }
      }
      
});

export const {addTask, addTasks , appendTask , addProjectTask , removeTask} = taskSlice.actions;
export default taskSlice.reducer;
