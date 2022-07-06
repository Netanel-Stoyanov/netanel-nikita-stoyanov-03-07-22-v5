import './App.css';
import {Route, Switch} from "react-router-dom";
import HomeSearchResult from "./page/home-search-result/HomeSearchResult";
import FavoritePage from "./page/favorite-page/FavoritePage";
import HomePage from "./page/home-page/HomePage";

function App() {

    return (
        <div>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/:key/:city" exact component={HomeSearchResult}/>
                <Route path="/favorite" exact component={FavoritePage}/>
            </Switch>
        </div>
    );
}

export default App;