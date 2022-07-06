import './FavoritePage.css';
import {useSelector} from "react-redux";
import ActionBar from "../../component/action-bar/ActionBar";
import SmallFavoriteCard from "../../component/small-favorite-card/SmallFavoriteCard";

function FavoritePage(props) {

    const selector = useSelector((store) => store);

    function returnClassForBackgroundImage() {
        if (selector.darkMode.isOn) {
            return "main-container-favorite-dark";
        } else {
            return "main-container-favorite-light";
        }
    }

    function showFavorite() {
        return selector.favorite.data.map((fav, index) => {
            let degree = "";
            if (selector.weatherDegree.isFOn) {
                degree = fav.fValue;
            } else {
                degree = fav.cValue;
            }
            return <SmallFavoriteCard key={index} keyId={fav.key} city={fav.city} date={fav.dayName} desc={fav.desc} degree={degree}/>
        })
    }

    return(
        <div className={returnClassForBackgroundImage()}>
            <ActionBar type={"favorite"} isChecked={selector.darkMode.isOn}/>
            <div className={"fav-card-cont"}>
                {showFavorite()}
            </div>
        </div>
    )
}

export default FavoritePage;