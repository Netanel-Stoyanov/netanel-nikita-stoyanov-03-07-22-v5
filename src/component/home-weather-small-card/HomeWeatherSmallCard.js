import './HomeWeatherSmallCard.css';

function HomeWeatherSmallCard(props) {
    return (
        <div className={"main-container-small-card"}>
            <div className={"day-name"}>
                {props.dayName}
            </div>
            <div className={"degree-number"}>
                {props.degreeNumber}
            </div>
            <div className={"mode-name"}>
                {props.modeName}
            </div>

        </div>
    )
}

export default HomeWeatherSmallCard;