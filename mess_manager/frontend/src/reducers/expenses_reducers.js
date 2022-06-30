import {
    ADD_EXPENSES_REQUEST,
    ADD_EXPENSES_SUCCESS,
    ADD_EXPENSES_FAIL
} from '../constants/expenses_constants'

export const addExpensesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_EXPENSES_REQUEST:
            return { loading: true }

        case ADD_EXPENSES_SUCCESS:
            return { loading: false, success: true, expenses: action.payload }

        case ADD_EXPENSES_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}
