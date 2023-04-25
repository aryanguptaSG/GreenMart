import authReducer from "../reducers/authReducer";
import cartReducer from "../reducers/cartReducer";
import profileReducer from "../reducers/profileReducer";

import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
    userinfo: authReducer,
    cartinfo: cartReducer,
    profile: profileReducer
});

const store = createStore(rootReducer);

export default store;