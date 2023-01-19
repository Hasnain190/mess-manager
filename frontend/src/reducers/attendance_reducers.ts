import {
    POST_ATTENDANCE_REQUEST,
    POST_ATTENDANCE_SUCCESS,
    POST_ATTENDANCE_FAIL,

    GET_ATTENDANCE_REQUEST,
    GET_ATTENDANCE_SUCCESS,
    GET_ATTENDANCE_FAIL
} from '../constants/attendance_constants'


export const postAttendanceReducers = (state = {}, action: any) => {

    switch (action.type) {
        case POST_ATTENDANCE_REQUEST:
            return { loading: true }

        case POST_ATTENDANCE_SUCCESS:
            return {
                loading: false,
                attendance: action.payload,
                success: true

            }
        case POST_ATTENDANCE_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false
            }


        default:
            return state
    }
}


export const getAttendanceReducers = (state = {}, action: any) => {

    switch (action.type) {
        case GET_ATTENDANCE_REQUEST:
            return { loading: true }

        case GET_ATTENDANCE_SUCCESS:
            return {
                loading: false,
                attendance: action.payload,
                success: true

            }
        case GET_ATTENDANCE_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false
            }


        default:
            return state
    }
}







