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

export const getMessMenu = () => async (dispatch) => {
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
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const updateMessMenu = (day, messMenu) => async (dispatch) => {
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
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

