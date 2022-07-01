import {
    ADD_EXPENSES_REQUEST,
    ADD_EXPENSES_SUCCESS,
    ADD_EXPENSES_FAIL,

    GET_BILL_FAIL,
    GET_BILL_REQUEST,
    GET_BILL_sUCCESS,
} from '../constants/expenses_constants'

export const addExpensesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_EXPENSES_REQUEST:
            return { loading: true }

        case ADD_EXPENSES_SUCCESS:
            return { ...state, loading: false, success: true, expenses: action.payload }

        case ADD_EXPENSES_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}

export const getBillReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BILL_REQUEST:
            return { loading: true }

        case GET_BILL_sUCCESS:
            return { loading: false, success: true, expenses: action.payload }

        case GET_BILL_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}

