import { combineReducers } from "redux";
import { loginReducer } from "./loginReducers";

const rootReducers = combineReducers({
    loginReducer,
})
export default rootReducers;