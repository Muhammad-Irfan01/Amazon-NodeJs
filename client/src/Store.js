import { configureStore } from "@reduxjs/toolkit";;
import {mainReducer} from "./Component/Redux/Reducer/main";


const Store = configureStore({reducer : mainReducer});
export default Store;