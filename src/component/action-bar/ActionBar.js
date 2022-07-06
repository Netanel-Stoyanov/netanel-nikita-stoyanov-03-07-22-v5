import './ActionBar.css';
import SearchBar from "../search-bar/SearchBar";
import ToggleSwitchDarkMode from "../toggle-switch-dark-mode/ToggleSwitchDarkMode";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import ToggleSwitchDegreeMode from "../degree-mode-switch/ToggleSwitchDegreeMode";

function ActionBar(props) {

    const selector = useSelector((store) => store);
    const history = useHistory();

    function showSearchBarIfInHomePage() {
        if (props.type === "home") {
            return (
                <SearchBar/>
            )
        }
    }

    function checkIfDark() {
        if (selector.darkMode.isOn) {
            return "action-bar-dark";
        } else {
            return "action-bar";
        }
    }

    return(
        <div className={checkIfDark()}>
           <img src={process.env.PUBLIC_URL + "/image/logo.jpg"} alt={"logo"}/>
            <div className={"header"}>
                whether project
            </div>
            <div className={"search-result"}>
                {showSearchBarIfInHomePage()}
            </div>
            <div className={"action-bar-buttons"}>
                <div onClick={() => {history.push("/")}} id={"home"} className={"btn-action"}>
                    home
                </div>
                <div className={"or"}>
                    &nbsp;|&nbsp;
                </div>
                <div id={"favorite"} onClick={() => {history.push("/favorite")}} className={"btn-action"}>
                    favorite
                </div>
                <div className={"dark-mode-toggle"}>
                    <ToggleSwitchDarkMode isChecked={props.isChecked} type={"dark"}/>
                </div>
                <div className={"dark-mode-toggle"}>
                    <ToggleSwitchDegreeMode isChecked={selector.weatherDegree.isFOn}  type={"degree"}/>
                </div>
            </div>
        </div>
    )
}

export default ActionBar;