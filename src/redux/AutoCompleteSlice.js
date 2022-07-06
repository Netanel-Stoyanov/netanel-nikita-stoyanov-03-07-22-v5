import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {data : []};

const autoCompleteSlice = createSlice({
     name : "autoComplete",
     initialState,
     reducers : {
         getData(state , action){
             state.data = action.payload;
         }
     }
})

export const {getData} = autoCompleteSlice.actions;
export default autoCompleteSlice.reducer;