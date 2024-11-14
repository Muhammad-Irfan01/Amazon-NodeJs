import { configureStore, applyMiddleware } from "@reduxjs/toolkit";;
import {thunk} from "redux-thunk";
import {mainReducer} from "./Component/Redux/Reducer/main";
import {composeWithDevTools} from "redux-devtools-extension";


// const middleware = [thunk];

const Store = configureStore(
   {reducer : mainReducer}
    // composeWithDevTools(applyMiddleware(...middleware))
);
console.log(Store);


export default Store;