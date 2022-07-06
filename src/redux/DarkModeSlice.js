import {createSlice} from "@reduxjs/toolkit";

const initialState = {isOn : false};

const darkMode = createSlice({
    name : "darkMode",
    initialState,
    reducers : {
        changeMode(state){
            state.isOn = !state.isOn;
        }
    }
})

export const {changeMode} = darkMode.actions;
export default darkMode.reducer;