
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

    getSumRequest, getSumSuccess, getSumFail

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
                : error.response),


        )
    }
}




export const getExpensesPerMonth = (year: string, month: string) => async (dispatch: any, getState: any) => {
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
        const { data } = await axios.get(`/api/expenses/get/${year}/${month}/`,
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


export const getMessBill = (year: string, month: string) => async (dispatch: any, getState: any) => {
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

        const { data } = await axios.get(`/api/expenses/bill/${year}/${month}/`,
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


export const payBill = (year: string, month: string, userId: number, payingBill: {
    paying_bill: number;
}) => async (dispatch: any, getState: any) => {
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
        const { data } = await axios.post(`/api/expenses/pay/bill/${year}/${month}/${userId}/`,
            payingBill,
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



export const getSum = (date: string) => async (dispatch: any, getState: any) => {
    try {
        dispatch(getSumRequest())

        const {
            userLogin: { userInfo },
        } = getState()



        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/expenses/get/${date}/`,
            config
        )


        dispatch(getSumSuccess(data))


    } catch (error: any) {
        dispatch(getSumFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}

