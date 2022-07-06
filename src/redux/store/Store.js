import {configureStore} from "@reduxjs/toolkit";
import autoCompleteReducerSlice from "../AutoCompleteSlice";
import darkModeReducerSlice from "../DarkModeSlice";
import WeatherDegreeSlice from "../WeatherDegreeSlice";
import favoriteSlice from "../FavoriteSlice";

export const store = configureStore({
    reducer : {
        searchBar : autoCompleteReducerSlice,
        darkMode : darkModeReducerSlice,
        weatherDegree : WeatherDegreeSlice,
        favorite : favoriteSlice,

    }
})