import types from "../actions/types";

const getstate = () => {
    if (localStorage.getItem("isauth") === "true") {
        return JSON.parse(localStorage.getItem("cart"));

    }
    else {
        return null;
    }
}

const initialstate = getstate();

const cartReducer = (state = initialstate, action) => {
    switch (action.type) {
        case types.ITEM_ADDED_IN_CART: {
            let item = action.payload;
            return [...state, item];
        }

        default:
            return state;
    }
}

export default cartReducer;