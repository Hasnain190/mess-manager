import {
    POST_ATTENDANCE_REQUEST,
    POST_ATTENDANCE_SUCCESS,
    POST_ATTENDANCE_FAIL,

    GET_ATTENDANCE_REQUEST,
    GET_ATTENDANCE_SUCCESS,
    GET_ATTENDANCE_FAIL,

} from '../constants/attendance_constants'
import axios from 'axios'


export const postAttendance = (attenandance, id) => async (dispatch, getState) => {
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
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getAttendance = () => async (dispatch, getState) => {
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
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}