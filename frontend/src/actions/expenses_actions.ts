import {
    ADD_EXPENSES_REQUEST,
    ADD_EXPENSES_SUCCESS,
    ADD_EXPENSES_FAIL,

    GET_BILL_FAIL,
    GET_BILL_REQUEST,
    GET_BILL_sUCCESS,
    GET_EXPENSES_PER_MONTH_FAIL,
    GET_EXPENSES_PER_MONTH_REQUEST,
    GET_EXPENSES_PER_MONTH_SUCCESS,


    ADD_BILL_REQUEST,
    ADD_BILL_success,
    ADD_BILL_FAIL,

} from '../constants/expenses_constants'

import axios from 'axios'


export const addExpenses = (expenses: any) => async (dispatch: any, getState: any) => {


    try {

        dispatch({
            type: ADD_EXPENSES_REQUEST
        })

        console.log("data:", dispatch({
            type: ADD_EXPENSES_SUCCESS
        }))
        const { userLogin: { userInfo } } = getState();


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
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                error.response && error.response.data.message
                    // @ts-expect-error TS(2571): Object is of type 'unknown'.
                    ? error.response.data.message

                    // @ts-expect-error TS(2571): Object is of type 'unknown'.
                    : error.response,
        })
    }
}




export const getExpensesPerMonth = (month: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch({
            type: GET_EXPENSES_PER_MONTH_REQUEST
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
        const { data } = await axios.get(`/api/expenses/get/${month}/`,
            config
        )

        dispatch({
            type: GET_EXPENSES_PER_MONTH_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_EXPENSES_PER_MONTH_FAIL,
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            payload: error.response && error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                ? error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                : error.message,
        })
    }
}


export const getBill = (month: any) => async (dispatch: any, getState: any) => {
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
        const { data } = await axios.get(`/api/expenses/bill/${month}/`,
            config
        )

        dispatch({
            type: GET_BILL_sUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_BILL_FAIL,
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            payload: error.response && error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                ? error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                : error.message,
        })
    }
}


export const addBill = (month: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch({
            type: ADD_BILL_REQUEST
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
        const { data } = await axios.post(`/api/expenses/last-bill/${month}/`,
            config
        )

        dispatch({
            type: ADD_BILL_success,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ADD_BILL_FAIL,
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            payload: error.response && error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                ? error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                : error.message,
        })
    }
}