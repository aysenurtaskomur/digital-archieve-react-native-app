import {combineReducers} from "redux";
import AuthReducer from "./authReducer"; 
import ListReducer from "./listReducer";

export default combineReducers({
  AuthReducer,
  ListReducer
});