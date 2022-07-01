import {
    ADD_EXPENSES_REQUEST,
    ADD_EXPENSES_SUCCESS,
    ADD_EXPENSES_FAIL,

    GET_BILL_FAIL,
    GET_BILL_REQUEST,
    GET_BILL_sUCCESS,
} from '../constants/expenses_constants'

import axios from 'axios'


export const addExpenses = (expenses) => async (getState, dispatch) => {


    try {
        dispatch({
            type: ADD_EXPENSES_REQUEST
        })
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

export const getbill = (month) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_BILL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()



        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }
        //    FIXME:
        const { data } = await axios.get(`/api/expenses/${month}/`,
            config
        )

        dispatch({
            type: GET_BILL_sUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_BILL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}