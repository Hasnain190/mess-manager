import axios from 'axios'

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,


    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,


    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,


    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,


    USERS_ATTENDANCE_REQUEST,
    USERS_ATTENDANCE_SUCCESS,
    USERS_ATTENDANCE_FAIL,
    USERS_ATTENDANCE_RESET,

} from '../constants/user_constants'



export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }


        const { data } = await axios.post(
            `/api/users/login/`,
            { 'username': username, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })



}


export const register = (username, room, password, hostel, phone) => async (dispatch) => {


    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            { 'username': username, 'password': password, 'room': room, 'hostel': hostel, 'phone': phone },
            config
        )
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message

                    : error.response,
        })
    }
}


export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/`,

            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// && !localStorage.getItem('userInfo')
// need to be fixed
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
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
        const { data } = await axios.get(`/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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

        const { data } = await axios.put(
            `/api/user/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/users/delete/${id}/`,

            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `/api/users/update/${user.id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data

        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const markAttendance = (attendance) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USERS_ATTENDANCE_REQUEST
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

        const { data } = await axios.post(
            `/api/user/attendance/`,
            attendance,
            config
        )

        dispatch({
            type: USERS_ATTENDANCE_SUCCESS,
            payload: data

        })
    }
    catch (error) {
        dispatch({
            type: USERS_ATTENDANCE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



// export const resetUserPassword = (email) => async (dispatch) => {
//     try {
//         dispatch({
//             type: USER_PASSWORD_RESET_REQUEST
//         })


//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//             }
//         }

//         const { data } = await axios.post(
//             `/auth/users/reset_password/`,
//             { 'email': email },
//             config
//         )

//         dispatch({
//             type: USER_PASSWORD_RESET_SUCCESS,
//         })



//     } catch (error) {
//         dispatch({
//             type: USER_PASSWORD_RESET_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }


// export const resetUserPasswordConfirm = (uid, token, new_password, re_new_password) => async (dispatch) => {



//     const body = JSON.stringify({ uid, token, new_password, re_new_password });
//     try {
//         dispatch({
//             type: USER_PASSWORD_RESET_CONFIRM_REQUEST
//         })


//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//             }
//         }

//         await axios.post(
//             `/auth/users/reset_password_confirm/`,
//             body,
//             config
//         )

//         dispatch({
//             type: USER_PASSWORD_RESET_CONFIRM_SUCCESS,
//         })



//     } catch (error) {
//         dispatch({
//             type: USER_PASSWORD_RESET_CONFIRM_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,


//         })
//     }
// }