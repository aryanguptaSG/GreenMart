import types from "../actions/types"

const getstate = () => {
    if (localStorage.getItem("isauth") === "true") {
        return {
            isauth: true,
            user: JSON.parse(localStorage.getItem("user"))
        }
    }
    else {
        return {
            isauth: false,
            user: null
        }
    }
}

const initialstate = getstate();

const authReducer = (state = initialstate, action) => {
    switch (action.type) {
        case types.SIGNIN: {
            localStorage.setItem("isauth", true);
            let user = JSON.stringify(action.payload);
            let cart = JSON.stringify([]);
            localStorage.setItem("user", user);
            localStorage.setItem("cart", cart);
            return { ...state, isauth: true, user: action.payload };
        }

        case types.SIGNOUT: {
            localStorage.removeItem("isauth");
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            localStorage.removeItem("profile");
            return { ...state, isauth: false, user: null };
        }
        default:
            return state;
    }
}

export default authReducer;