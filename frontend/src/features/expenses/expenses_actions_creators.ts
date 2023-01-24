
import axios from 'axios'
import {
    addExpensesRequest, addExpensesSuccess, addExpensesFail,

    getExpensesPerMonthRequest,
    getExpensesPerMonthSuccess,
    getExpensesPerMonthFail,

    getMessBillRequest,
    getMessBillSuccess,
    getMessBillFailure,

    postPayingBillRequest,
    postPayingBillSuccess,
    postPayingBillFail,


} from './expenses_slice'



export const addExpenses = (expenses: any) => async (dispatch: any, getState: any) => {


    try {

        dispatch(addExpensesRequest())


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

        dispatch(addExpensesSuccess(data))


    } catch (error: any) {
        dispatch(
            addExpensesFail(error.response && error.response.data.message
                ? error.response.data.message
                : error.response)


        )
    }
}




export const getExpensesPerMonth = (month: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(getExpensesPerMonthRequest())

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

        dispatch(getExpensesPerMonthSuccess(data))


    } catch (error: any) {
        dispatch(getExpensesPerMonthFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}


export const getMessBill = (month: number | string) => async (dispatch: any, getState: any) => {
    try {
        dispatch(getMessBillRequest())

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

        dispatch(getMessBillSuccess(data))


    } catch (error: any) {
        dispatch(getMessBillFailure(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}


export const addBill = (month: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(postPayingBillRequest())

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

        dispatch(postPayingBillSuccess(data))


    } catch (error: any) {
        dispatch(postPayingBillFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}