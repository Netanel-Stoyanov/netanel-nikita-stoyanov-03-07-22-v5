import './MainWeatherCard.css'
import FavoriteButton from "../favorite-button/FavoriteButton";
import HomeWeatherSmallCard from "../home-weather-small-card/HomeWeatherSmallCard";
import {useSelector} from "react-redux";
import {FadeIn} from "react-slide-fade-in";

function MainWeatherCard(props) {

    const selector = useSelector((store) => store);
    const dayNameArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function returnClassForBackgroundImage() {
        if (selector.darkMode.isOn) {
            return "main-container-weather-card-dark";
        } else {
            return "main-container-weather-card";
        }
    }

    function checkIfCOrF() {
        if (selector.weatherDegree.isFOn) {
            return props.degree + ' F \u00B0';
        }else {
            return props.degree + ' C \u00B0';
        }
    }

    function returnClassForTextHeader() {
        if (selector.darkMode.isOn) {
            return "header-tel-aviv-dark";
        } else {
            return "header-tel-aviv";
        }
    }

    function returnClassForMiddleHeader() {
        if (selector.darkMode.isOn) {
            return "search-result-name-dark";
        } else {
            return "search-result-name";
        }
    }

    function showFiveDays() {
        return props.fiveDays?.map((day, index) => {
            const date = new Date(day.EpochDate * 1000);
            let degree = "";
            if (selector.weatherDegree.isFOn) {
                degree = day.Temperature.Minimum.Value + ' F \u00B0' + " - " + day.Temperature.Maximum.Value + ' F \u00B0';
            } else {
                degree = Math.floor(((((day.Temperature.Minimum.Value) - 32) * 5) / 9)) + ' C \u00B0' + " - " + Math.floor(((((day.Temperature.Maximum.Value) - 32) * 5) / 9)) + ' C \u00B0';
            }

            return <HomeWeatherSmallCard key={index} dayName={dayNameArray[date.getUTCDay()]} modeName={day.Day.LongPhrase} degreeNumber={degree}/>
        })
    }

    return(
        <div className={returnClassForBackgroundImage()}>
            <div className={"logo-container"}>
                <div className={"left-coner"}>
                    <img className={"img-logo"} src={process.env.PUBLIC_URL + "/image/logo.jpg"} alt={"logo"}/>
                    <div className={returnClassForTextHeader()}>
                        <div className={"header-tel-aviv"}>{props.cityName}</div>
                        <div className={"prosent"}>
                            {checkIfCOrF()}
                        </div>
                    </div>
                </div>
                <h1 className={returnClassForMiddleHeader()}>
                    {props.cityName}
                </h1>
                <div className={"favorite-button-flex"}>
                    <FavoriteButton onClickRemove={props.onClickRemove} onClick={props.onClickAddFavorite} isInFavorite={props.isInFavorite}/>
                </div>
            </div>
            <FadeIn from={"top"} positionOffset={0} triggerOffset={0}  durationInMilliseconds={4000}>
                <div className={"small-card-container"}>
                    {showFiveDays()}
                </div>
            </FadeIn>
        </div>
    )
}

export default MainWeatherCard;