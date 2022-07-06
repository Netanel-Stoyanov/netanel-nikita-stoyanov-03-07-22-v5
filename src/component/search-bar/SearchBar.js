import {useEffect, useState} from "react";
import './SearchBar.css';
import {getData} from "../../redux/AutoCompleteSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useHistory} from "react-router-dom";

function SearchBar(props) {

    const [display, setDisplay] = useState("none");
    const [value, setValue] = useState("");
    const selector = useSelector((store) => store.searchBar);
    const dispatch = useDispatch();
    const history = useHistory();

    async function getSearchData() {
        try {
            const data = await axios.get("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=FU6JXjIdqLfLfZIjxo1vj57K2izMEPVF&q=" + value);
            const newArray = Array.from(data.data);
            dispatch(getData(newArray))
        } catch (e) {
            //alert("50 request limited")
        }

    }

    useEffect(() => {
        getSearchData().then(data => console.log("ok"));
        document.addEventListener("click", (event) => {
            const searchPanel = event.target.closest(".custom-search-input-container");
            if (!searchPanel) {
                setDisplay('none')
            }
        })
    },[value])

    useEffect(() => {
        return () => {
            setDisplay("none")
            setValue("")
        };
    }, [])

    const onChangeValue = (event) => {
        setValue(event.target.value);
    }


    const showResult = () => {
        if (Array.from(selector.data).length > 0){
            return selector.data.map((item, index) => <li onClick={() => {
                history.push("/" + item.Key + "/" + item.LocalizedName)
                setDisplay('none')
                setValue("");
            }} key={index} style={{"cursor" : "pointer"}} className={"txt-style-search"}>{item.LocalizedName}</li>)
        }
    }

    const onChangeDisplay = (event) => {
        if (event.target.value === "") {
            setDisplay("none")
        } else {
            setDisplay("block")
        }
    }

    const onDropDownDisplay = () => {
        if (display === "none") {
            return "input-search-no-drop"
        } else {
            return "input-search"
        }
    }

    const onDropDownDisplayDiv = () => {
        if (display === "none") {
            return ""
        } else {
            return "input-place-holder"
        }
    }

    const showATagResult = () => {
        if (Array.from(selector.data).length > 0) {
            return "";
        } else {
            return <div className={'nothing-found'}>Nothing Found</div>
        }
    }


    return(
        <div className={"custom-search-input-container"}>
            <div className={onDropDownDisplayDiv()}>
                <input onChange={(event) =>
                {
                    onChangeValue(event)
                    onChangeDisplay(event)
                }} className={onDropDownDisplay()} placeholder="Search" type={"text"}/>
            </div>
            <div  id={"drop-down"} className={"list-container-input"} style={{display: display}}>
                <ul>
                    {showResult()}
                </ul>
                <div className={"show-all-href"}>
                    {showATagResult()}
                </div>

            </div>
        </div>
    )
}

export default SearchBar;