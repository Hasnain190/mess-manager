import {
    POST_ATTENDANCE_REQUEST,
    POST_ATTENDANCE_SUCCESS,
    POST_ATTENDANCE_FAIL,
} from '../constants/attendance_constants'


export const attendanceReducers = (state = {}, action) => {

    switch (action.type) {
        case POST_ATTENDANCE_REQUEST:
            return { loading: true }

        case POST_ATTENDANCE_SUCCESS:
            return {
                loading: false,
                attendance: action.payload,

            }
        case POST_ATTENDANCE_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state
    }
}





