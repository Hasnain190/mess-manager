
import axios from 'axios'
import {
    getAttendanceRequest,
    getAttendanceSuccess,
    getAttendanceFail,

    postAttendanceRequest,
    postAttendanceSuccess,
    postAttendanceFail,

} from './attendance_slice'

export const postAttendance = (attendance: any, id: any) => async (dispatch: any, getState: any) => {
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