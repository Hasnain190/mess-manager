import {
    ADD_EXPENSES_REQUEST,
    ADD_EXPENSES_SUCCESS,
    ADD_EXPENSES_FAIL,

    GET_EXPENSES_PER_MONTH_REQUEST,
    GET_EXPENSES_PER_MONTH_SUCCESS,
    GET_EXPENSES_PER_MONTH_FAIL,

    GET_BILL_FAIL,
    GET_BILL_REQUEST,
    GET_BILL_sUCCESS,

    ADD_BILL_FAIL,
    ADD_BILL_success,
    ADD_BILL_REQUEST,

} from '../constants/expenses_constants'

export const addExpensesReducer = (state = { expenses: {} }, action: any) => {
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
export const getExpensesPerMonthReducers = (state = { expensesPerMonth: [] }, action: any) => {
    switch (action.type) {
        case GET_EXPENSES_PER_MONTH_REQUEST:
            return { loading: true }

        case GET_EXPENSES_PER_MONTH_SUCCESS:
            return { ...state, loading: false, success: true, expensesPerMonth: action.payload }

        case GET_EXPENSES_PER_MONTH_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}
export const getBillReducer = (state = { bill: [] }, action: any) => {
    switch (action.type) {
        case GET_BILL_REQUEST:
            return { loading: true }

        case GET_BILL_sUCCESS:
            return { loading: false, success: true, bill: action.payload }

        case GET_BILL_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}



export const addBillReducer = (state = {}, action: any) => {
    switch (action.type) {
        case ADD_BILL_REQUEST:
            return { loading: true }

        case ADD_BILL_success:
            return { loading: false, success: true, addBill: action.payload }

        case ADD_BILL_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}


