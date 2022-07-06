import {createSlice} from "@reduxjs/toolkit";

const initialState = {data : []};

const favoriteSlice = createSlice({
    name : "favoriteSlice",
    initialState,
    reducers : {
        pushData(state , action){
            state.data = [...state.data, action.payload]
        },
        removeData(state , action){
            const index = state.data.findIndex(favorite => favorite.key === action.payload);
            state.data.splice(index, 1);
            state.data = [...state.data]
        }

    }
})

export const {pushData, removeData} = favoriteSlice.actions;
export default favoriteSlice.reducer;