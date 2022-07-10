import ActionBar from "../../component/action-bar/ActionBar";
import './HomeSearchResult.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import MainWeatherCard from "../../component/main-weather-card/MainWeatherCard";
import {pushData, removeData} from "../../redux/FavoriteSlice";
import {FadeIn} from "react-slide-fade-in";

function HomeSearchResult(props) {

    const selector = useSelector((store) => store);

    const [defaultWeather, setDefaultWeather] = useState(0);
    const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
    const [inFavorite, setInFavorite] = useState(false);
    const [head, setHead] = useState("");
    const [dataForFavorite, setDataForFavorite] = useState([])
    const [error, setError] = useState(false);
    const dispatch = useDispatch();


    async function getCurrentDefaultWeatherDegree() {
        try {
            const dataOfWeather = await axios.get("https://dataservice.accuweather.com/currentconditions/v1/" + props.match.params.key + "?apikey=G2PBGGx5lOGhkiQIqqpAvhjCOafWlQcc");
            setDataForFavorite(dataOfWeather.data[0])
            if (selector.weatherDegree.isFOn) {
                setDefaultWeather(dataOfWeather.data[0].Temperature.Imperial.Value);
            } else {
                setDefaultWeather(dataOfWeather.data[0].Temperature.Metric.Value);
            }
        }catch (e) {
            if (!error) {
                alert("50 request limited")
                setError(true);
            }
        }

    }

    useEffect(() => {
        return () => {
            setError(true)
        };
    }, [])

    async function getCityWeatherDataForFiveDays() {
        try{
            const data = await axios.get("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + props.match.params.key + "?apikey=G2PBGGx5lOGhkiQIqqpAvhjCOafWlQcc&details=true");
            setFiveDaysWeather(data.data.DailyForecasts);
            setHead(data.data.Headline.Category);
        } catch (e) {
            if (!error) {
                alert("50 request limited")
                setError(true);
            }
        }

    }

    function checkIfInFavorite() {
        selector.favorite.data.forEach(favorite => {
            if (favorite.key === props.match.params.key) {
                setInFavorite(true);
            } else {
                setInFavorite(false)
            }
        })
    }


    async function addToFavorite() {
        const newFavorite = {key : props.match.params.key, desc : head, cValue : dataForFavorite.Temperature.Metric.Value + ' C \u00B0', fValue : dataForFavorite.Temperature.Imperial.Value + ' F \u00B0' , city : props.match.params.city}
        dispatch(pushData(newFavorite))
        setInFavorite(true);
    }

    function removeFromFavorite() {
        dispatch(removeData(props.match.params.key))
        setInFavorite(false);
    }


    useEffect(() => {
        getCurrentDefaultWeatherDegree().then();
        getCityWeatherDataForFiveDays().then();
        checkIfInFavorite();
    }, [])

    function returnClassForBackgroundImage() {
        if (selector.darkMode.isOn) {
            return "main-container-dark";
        } else {
            return "main-container-light";
        }
    }


    return (
        <div className={returnClassForBackgroundImage()}>
            <ActionBar isChecked={selector.darkMode.isOn} type={"home"}/>
            <FadeIn from={"top"} positionOffset={0} triggerOffset={0}  durationInMilliseconds={2000}>
                <div className={"inner-container"}>
                    <MainWeatherCard onClickRemove={removeFromFavorite} onClickAddFavorite={addToFavorite} isInFavorite={inFavorite} degree={defaultWeather} cityName={props.match.params.city} fiveDays={fiveDaysWeather}/>
                </div>
            </FadeIn>
        </div>
    )

}

export default HomeSearchResult;