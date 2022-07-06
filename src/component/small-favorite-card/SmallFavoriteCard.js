import './SmallFavoriteCard.css';
import {useHistory} from "react-router-dom";

function SmallFavoriteCard(props) {

    const history = useHistory();

    return (
        <div onClick={() => {history.push("/" + props.keyId + "/" + props.city)}} className={"small-card-container-favorite"}>

            <div className={"day-name-favorite"}>
                {props.city}
            </div>
            <div className={"degree-favorite"}>
                {props.degree}
            </div>
            <div className={"description-favorite"}>
                {props.keyId}
            </div>

        </div>
    )
}

export default SmallFavoriteCard;