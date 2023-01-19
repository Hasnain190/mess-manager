import {
    GET_MESS_MENU_REQUEST,
    GET_MESS_MENU_SUCCESS,
    GET_MESS_MENU_FAIL,

    UPDATE_MESS_MENU_REQUEST,
    UPDATE_MESS_MENU_SUCCESS,
    UPDATE_MESS_MENU_FAIL,
    UPDATE_MESS_MENU_RESET,

} from '../constants/mess_constants'




export const messMenuReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_MESS_MENU_REQUEST:
            return { loading: true, messMenu: [] }

        case GET_MESS_MENU_SUCCESS:
            return {
                loading: false,
                messMenu: action.payload,

            }
        case GET_MESS_MENU_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state
    }
}

export const updateMessMenuReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_MESS_MENU_REQUEST:
            return { loading: true, messMenu: [] }
        case UPDATE_MESS_MENU_SUCCESS:
            return {
                loading: false,
                messMenu: action.payload,
            }
        case UPDATE_MESS_MENU_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_MESS_MENU_RESET:
            return {
                loading: false,
                messMenu: [],
            }
        default:
            return state
    }
}