import './ToggleSwitchDegreeMode.css';
import {useDispatch} from "react-redux";
import {changeModeDegree} from "../../redux/WeatherDegreeSlice";

function ToggleSwitchDegreeMode(props) {

    const dispatch = useDispatch();


    return (
        <div className="container-f">
            <div className="toggle-switch-f">
                <input onChange={(e) => {
                    dispatch(changeModeDegree())
                }} type="checkbox" className="checkbox-f" checked={props.isChecked} name={"degree-mode"} id={"degree-mode"} />
                <label className="label-f" htmlFor={"degree-mode"}>
                    <span className="inner-f" />
                    <span className="switch-f" />
                </label>
            </div>
        </div>
    )
}

export default ToggleSwitchDegreeMode;