import { createStore, applyMiddleware } from "redux";;
import {thunk} from "redux-thunk";
import {mainReducer} from "./Component/Redux/Reducer/main";
import {composeWithDevTools} from "redux-devtools-extension";


const middleware = [thunk];

const Store = createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;