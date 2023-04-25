import types from "./types";


export const signIn = (user) => {
    return {
        type: types.SIGNIN,
        payload: user
    }
}

export const signout = () => {
    return {
        type: types.SIGNOUT
    }
}


export const additem = (item) => {
    return {
        type: types.ITEM_ADDED_IN_CART,
        payload: item
    }
}

export const updateitem = (item) => {
    return {
        type: types.ITEM_UPDATED_IN_CART,
        payload: item
    }
}

export const removeitem = (id) => {
    return {
        type: types.ITEM_REMOVED_FROM_CART,
        payload: id
    }
}


export const profileCreated = (profile) => {
    return {
        type: types.PROFILECREATED,
        payload: profile
    }
}