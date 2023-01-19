import {
    GET_MESS_MENU_REQUEST,
    GET_MESS_MENU_SUCCESS,
    GET_MESS_MENU_FAIL,

    UPDATE_MESS_MENU_REQUEST,
    UPDATE_MESS_MENU_SUCCESS,
    UPDATE_MESS_MENU_FAIL,
    UPDATE_MESS_MENU_RESET,


} from '../constants/mess_constants'


import axios from 'axios'

export const getMessMenu = () => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_MESS_MENU_REQUEST
        })



        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(`/api/mess/`,
            config
        )

        dispatch({
            type: GET_MESS_MENU_SUCCESS,
            payload: data
        })
        localStorage.setItem('messMenu', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: GET_MESS_MENU_FAIL,
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            payload: error.response && error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                ? error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                : error.message,
        })
    }

}

export const updateMessMenu = (day: any, messMenu: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: UPDATE_MESS_MENU_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/mess/update/${day}/`,
            messMenu,
            config
        )

        dispatch({
            type: UPDATE_MESS_MENU_SUCCESS,
            payload: data
        })
    }


    catch (error) {
        dispatch({
            type: UPDATE_MESS_MENU_FAIL,
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            payload: error.response && error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                ? error.response.data.detail
                // @ts-expect-error TS(2571): Object is of type 'unknown'.
                : error.message,
        })
    }

}

