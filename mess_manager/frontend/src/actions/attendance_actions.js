import {
    POST_ATTENDANCE_REQUEST,
    POST_ATTENDANCE_SUCCESS,
    POST_ATTENDANCE_FAIL,

} from '../constants/attendance_constants'
import axios from 'axios'


export const postAttendance = async (dispatch, getState) => {
    dispatch({ type: POST_ATTENDANCE_REQUEST })
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

        const response = await axios.post(`/api/attendance/post`, config)
        dispatch({ type: POST_ATTENDANCE_SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({ type: POST_ATTENDANCE_FAIL, payload: error })
    }
}