import {
    ADD_EXPENSES_REQUEST,
    ADD_EXPENSES_SUCCESS,
    ADD_EXPENSES_FAIL
} from '../constants/expenses_constants'

import axios from 'axios'


export const addExpenses = (expenses) => async (getState, dispatch) => {


    try {
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/expenses/post/',
            expenses,
            config
        )
        dispatch({
            type: ADD_EXPENSES_REQUEST
        })

        dispatch({
            type: ADD_EXPENSES_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ADD_EXPENSES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message

                    : error.response,
        })
    }
}

