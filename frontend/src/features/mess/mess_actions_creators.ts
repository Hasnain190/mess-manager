import {
    getMessMenuRequest,
    getMessMenuSuccess,
    getMessMenuFail,

    updateMessMenuRequest,
    updateMessMenuSuccess,
    updateMessMenuFail,



} from './mess_slice'
import axios from 'axios'

export const getMessMenu = () => async (dispatch: any) => {
    try {
        dispatch(getMessMenuRequest())



        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(`/api/mess/`,
            config
        )

        dispatch(getMessMenuSuccess(data))
        localStorage.setItem('messMenu', JSON.stringify(data))

    } catch (error: any) {
        dispatch(
            getMessMenuFail(
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            ))
    }

}
type menuPerDay = {
    id: number;
    day: string;
    first_time: string,
    second_time: string
}


export const updateMessMenu = (day: string, menuPerDay: menuPerDay) => async (dispatch: any) => {
    try {
        dispatch(updateMessMenuRequest())

        const config = {
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `JWT ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/mess/update/${day}/`,
            menuPerDay,
            config
        )

        dispatch(updateMessMenuSuccess(data))
    }


    catch (error: any) {
        dispatch(updateMessMenuFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ))
    }
}



