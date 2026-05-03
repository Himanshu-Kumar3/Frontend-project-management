import {createSlice} from "@reduxjs/toolkit";

const themeSlice = createSlice({
      name : "theme",
      initialState:"true",
      reducers:{
            addTheme(state , action){
                  return action.payload;
            }
      }
})

export const {addTheme} = themeSlice.actions;
export default themeSlice.reducer;