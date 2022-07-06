import {createSlice} from "@reduxjs/toolkit";

const initialState = {isFOn : false};

const weatherDegree = createSlice({
    name : "weatherDegree",
    initialState,
    reducers : {
        changeModeDegree(state){
            state.isFOn = !state.isFOn;
        }
    }
})

export const {changeModeDegree} = weatherDegree.actions;
export default weatherDegree.reducer;