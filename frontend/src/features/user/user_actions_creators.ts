import axios from 'axios'


import {
    loginRequest,
    loginFail,
    loginSuccess,
    logoutAction,
    registerRequest,
    registerFail,
    registerSuccess,

    detailsRequest,
    detailsSuccess,
    detailsFail,

    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,

    deleteRequest,
    deleteSuccess,
    deleteFail,

    updateRequest,
    updateSuccess,
    updateFail,


    attendanceRequest,
    attendanceSuccess,
    attendanceFail,

    listRequest,
    listSuccess,
    listFail,
    detailsReset,
    listReset,




} from './user_slice'

export const login = (username: string, password: string) => async (dispatch: any) => {
    try {
        dispatch(loginRequest())
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
        dispatch(loginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error: any) {

        dispatch(loginFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message))
    }
}

export const logout = () => (dispatch: any) => {
    localStorage.removeItem('userInfo')
    dispatch(logoutAction())
    dispatch(detailsReset())
    dispatch(listReset())



}


export const register = (username: string, room: number, password: string, hostel: string, phone: string) => async (dispatch: any) => {


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
        dispatch(registerRequest())

        dispatch(registerSuccess(data))
        dispatch(loginSuccess(data))
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error: any) {
        dispatch(registerFail((error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message)))
    }
}


export const listUsers = () => async (dispatch: any, getState: any) => {
    try {
        dispatch(listRequest())

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/`,

            config
        )

        dispatch(listSuccess(data))


        localStorage.setItem('usersList', JSON.stringify(data))


    } catch (error: any) {
        dispatch(listFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message))
    }
}

// && !localStorage.getItem('userInfo')
// need to be fixed
export const getUserDetails = (id: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(detailsRequest())

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

        dispatch(detailsSuccess(data))


    } catch (error: any) {
        dispatch(detailsFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message))
    }
}


export const updateUserProfile = (user: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(updateProfileRequest())

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

        dispatch(updateProfileSuccess(data))

        dispatch(loginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error: any) {
        dispatch(updateProfileFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message))
    }
}


export const deleteUser = (id: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(deleteRequest())

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

        dispatch(deleteSuccess(data))


    } catch (error: any) {
        dispatch(deleteFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message))
    }
}


export const updateUser = (user: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(updateRequest())

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

        dispatch(updateSuccess(data))

        dispatch(detailsSuccess(data))


    } catch (error: any) {
        dispatch(updateFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message))
    }
}


export const markAttendance = (attendance: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(attendanceRequest())

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

        dispatch(attendanceSuccess(data))
    }
    catch (error: any) {
        dispatch(attendanceFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message))
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