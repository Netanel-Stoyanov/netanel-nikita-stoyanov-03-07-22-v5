import './FavoriteButton.css';

function FavoriteButton(props) {

    function returnButton() {
        if (props.isInFavorite) {
            return <div onClick={() => props.onClickRemove()} className={"button-fav"}>
                <div>
                    remove from favorite
                </div>
            </div>
        } else {
            return <div onClick={() => props.onClick().then()} className={"button-fav"}>
                <div>
                     add to favorite
                </div>
            </div>
        }
    }

    return (
        <div>
            {returnButton()}
        </div>
    )
}

export default FavoriteButton;