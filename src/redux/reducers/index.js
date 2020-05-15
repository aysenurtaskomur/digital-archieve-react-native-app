import {combineReducers} from "redux";
import AuthReducer from "./authReducer"; 
import ListReducer from "./listReducer";
import LinkReducer from "./linkReducer";
import HashtagReducer from "./hashtagReducer";

export default combineReducers({
  AuthReducer,
  ListReducer,
  LinkReducer,
  HashtagReducer
});