import './ToggleSwitchDarkMode.css';
import {useDispatch, useSelector} from "react-redux";
import {changeMode} from "../../redux/DarkModeSlice";

function ToggleSwitchDarkMode(props) {

    const dispatch = useDispatch();
    

    return (
        <div className="container">
            <div className="toggle-switch">
                <input onChange={(e) => {
                        dispatch(changeMode())
                }} type="checkbox" className="checkbox" checked={props.isChecked} name={"dark-mode"} id={"dark-mode"} />
                <label className="label" htmlFor={"dark-mode"}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    )
}

export default ToggleSwitchDarkMode;