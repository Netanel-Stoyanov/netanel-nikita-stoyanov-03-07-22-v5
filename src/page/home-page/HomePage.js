import './HomePage.css';
import ActionBar from "../../component/action-bar/ActionBar";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useState} from "react";
import MainWeatherCard from "../../component/main-weather-card/MainWeatherCard";
import {pushData, removeData} from "../../redux/FavoriteSlice";
import {useEffect} from "react";
import {FadeIn} from "react-slide-fade-in";

function HomePage(props) {

    const selector = useSelector((store) => store);
    const [defaultWeather, setDefaultWeather] = useState(0);
    const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
    const [inFavorite, setInFavorite] = useState(false);
    const [dataForFavorite, setDataForFavorite] = useState([])
    const [head, setHead] = useState("");
    const [error, setError] = useState(false);
    const [result, setResult] = useState("");
    const [id, setId] = useState("");
    const dispatch = useDispatch();


    function returnClassForBackgroundImage() {
        if (selector.darkMode.isOn) {
            return "main-container-dark-home";
        } else {
            return "main-container-light-home";
        }
    }



    async function getCityWeatherDataForFiveDays(id) {
        try {
            const data = await axios.get("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + id + "?apikey=yfELm2QlSIBhG0AmLdV6qYhrCNkVbMpq&details=true");
            setFiveDaysWeather(data.data.DailyForecasts);
            setHead(data.data.Headline.Category);
        } catch (e) {
            if (!error) {
                alert("50 request limited")
                setError(true);
            }
        }

    }

    async function getDefaultWeather() {
        try {
            const data = await axios.get("https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=yfELm2QlSIBhG0AmLdV6qYhrCNkVbMpq&q=32.14577077248564%2C%2034.702958497707336&details=true");
            const dataArray = data.data;
            const dataOfWeather = await axios.get("https://dataservice.accuweather.com/currentconditions/v1/" + dataArray.Key + "?apikey=yfELm2QlSIBhG0AmLdV6qYhrCNkVbMpq");

            setDataForFavorite(dataOfWeather.data[0])
            if (selector.weatherDegree.isFOn) {
                setDefaultWeather(dataOfWeather.data[0].Temperature.Imperial.Value);
            } else {
                setDefaultWeather(dataOfWeather.data[0].Temperature.Metric.Value);
            }
            setId(dataArray.Key)

            await getCityWeatherDataForFiveDays(dataArray.Key);
        } catch (e) {
            if (!error) {
                alert("50 request limited")
                setError(true);
            }
        }

    }

    async function addToFavorite() {
        try {
            const newFavorite = {key : id, desc : head, cValue : dataForFavorite.Temperature.Metric.Value + ' C \u00B0', fValue : dataForFavorite.Temperature.Imperial.Value + ' F \u00B0' , city : "tel-aviv"}
            dispatch(pushData(newFavorite))
            setInFavorite(true);
        } catch (e) {
            if (!error) {
                alert("50 request limited")
                setError(true);
            }
        }
    }

    function removeFromFavorite() {
        dispatch(removeData(props.match.params.key))
        setInFavorite(false);
    }

    function checkIfInFavorite() {
        selector.favorite.data.forEach(favorite => {
            if (favorite.key === id) {
                setInFavorite(true);
            } else {
                setInFavorite(false)
            }
        })
    }



    useEffect(() => {
        getDefaultWeather().then();
        checkIfInFavorite();
    }, [result])


    useEffect(() => {
        return () => {
            setError(false)
        };
    }, [])

    return(
        <div className={returnClassForBackgroundImage()}>
            <ActionBar resultChange={setResult} isChecked={selector.darkMode.isOn} type={"home"}/>
            <FadeIn from={"top"} positionOffset={0} triggerOffset={0}  durationInMilliseconds={2000}>
                <div className={"inner-container"}>
                    <MainWeatherCard onClickRemove={removeFromFavorite} onClickAddFavorite={addToFavorite} isInFavorite={inFavorite} degree={defaultWeather} cityName={"Tel aviv"} fiveDays={fiveDaysWeather}/>
                </div>
            </FadeIn>

        </div>
    )
}

export default HomePage;