import {
    POST_ATTENDANCE_REQUEST,
    POST_ATTENDANCE_SUCCESS,
    POST_ATTENDANCE_FAIL,

    GET_ATTENDANCE_REQUEST,
    GET_ATTENDANCE_SUCCESS,
    GET_ATTENDANCE_FAIL,

} from '../constants/attendance_constants'
import axios from 'axios'


export const postAttendance = (attenandance: any, id: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch({ type: POST_ATTENDANCE_REQUEST })

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
            attenandance,
            config)
        dispatch({ type: POST_ATTENDANCE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: POST_ATTENDANCE_FAIL,
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            payload: error.response && error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                ? error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                : error.message,
        })
    }
}

export const getAttendance = () => async (dispatch: any, getState: any) => {
    try {
        dispatch({
            type: GET_ATTENDANCE_REQUEST

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

        const { data } = await axios.get(`/api/attendance/get/`,
            config)
        dispatch({
            type: GET_ATTENDANCE_SUCCESS,
            payload: data
        })

        localStorage.setItem("getAttendance", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: GET_ATTENDANCE_FAIL,
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            payload: error.response && error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                ? error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                : error.message,
        })
    }
}