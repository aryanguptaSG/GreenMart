import types from "../actions/types"

const getstate = () => {
    if (localStorage.getItem("isauth") === "true") {
        return JSON.parse(localStorage.getItem("profile"))
    }
    else {
        return null;
    }
}

const initialstate = getstate();

const profileReducer = (state = initialstate, action) => {
    switch (action.type) {
        case types.PROFILECREATED: {
            let profile = JSON.stringify(action.payload);
            localStorage.removeItem("profile");
            localStorage.setItem("profile", profile);
            return profile;
        }

        default:
            return state;
    }
}

export default profileReducer;