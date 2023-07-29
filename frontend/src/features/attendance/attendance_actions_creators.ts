
import axios from 'axios'
import {
    getAttendanceRequest,
    getAttendanceSuccess,
    getAttendanceFail,

    getMonthAttendanceRequest,
    getMonthAttendanceSuccess,
    getMonthAttendanceFail,

    getDailyAttendanceRequest,
    getDailyAttendanceSuccess,
    getDailyAttendanceFail,

    postAttendanceRequest,
    postAttendanceSuccess,
    postAttendanceFail,
    getFirstAndSecondRequest, getFirstAndSecondSuccess, getFirstAndSecondFail,




} from './attendance_slice'

export const postAttendance = (attendance: any, id: number) => async (dispatch: any, getState: any) => {
    try {
        dispatch(postAttendanceRequest())

        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/attendance/post/${id}/`,
            attendance,
            config)
        dispatch(postAttendanceSuccess(data))
    } catch (error: any) {
        dispatch(
            postAttendanceFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            ))
    }
}

export const getAttendance = () => async (dispatch: any, getState: any) => {
    try {
        dispatch(getAttendanceRequest())

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/attendance/get/`,
            config)
        dispatch(getAttendanceSuccess(data))

        localStorage.setItem("getAttendance", JSON.stringify(data))
    } catch (error: any) {
        dispatch(getAttendanceFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}


export const getMonthlyAttendance = (month: number) => async (dispatch: any, getState: any) => {
    try {
        dispatch(getMonthAttendanceRequest())

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/attendance/get/${month}/`,
            config)
        dispatch(getMonthAttendanceSuccess(data))

        localStorage.setItem("getAttendance", JSON.stringify(data))
    } catch (error: any) {
        dispatch(getMonthAttendanceFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}


export const getDailyAttendance = (date: string) => async (dispatch: any, getState: any) => {
    try {
        dispatch(getDailyAttendanceRequest())

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/attendance/get/${date}/`,
            config)
        dispatch(getDailyAttendanceSuccess(data))

        localStorage.setItem("getAttendance", JSON.stringify(data))
    } catch (error: any) {
        dispatch(getDailyAttendanceFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}

export const getFirstAndSecond = (date: string) => async (dispatch: any, getState: any) => {
    try {
        dispatch(getFirstAndSecondRequest())

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/attendance/get/calculate/${date}/`,
            config)
        dispatch(getFirstAndSecondSuccess(data))

    } catch (error: any) {
        dispatch(getFirstAndSecondFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}