import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// this is how a mess menu look like
// [
//   {
//     "id": 1,
//     "day": "Monday",
//     "first_time": "Daal Chawal",
//     "second_time": "Acchar"
//   },
//   {
//     "id": 2,
//     "day": "Tuesday",
//     "first_time": "Alu Qeema",
//     "second_time": "Seasonal Vegetable"
//   },
//   {
//     "id": 3,
//     "day": "Wednesday",
//     "first_time": "Paratha Chai",
//     "second_time": "Fish"
//   },
//   {
//     "id": 4,
//     "day": "Thursday",
//     "first_time": "Palak",
//     "second_time": "Biryani"
//   },
//   {
//     "id": 5,
//     "day": "Friday",
//     "first_time": "Biryani",
//     "second_time": "Haleem"
//   },
//   {
//     "id": 6,
//     "day": "Saturday",
//     "first_time": "Qeema",
//     "second_time": "Alu Matar"
//   },
//   {
//     "id": 7,
//     "day": "Sunday",
//     "first_time": "Alu Paratha",
//     "second_time": "off"
//   }
// ] 

type menuPerDay = {
    id: number;
    day: string;
    first_time: string,
    second_time: string
}
// interface messMenu {
//     messMenu: menuPerDay[]
// }
type messMenu = menuPerDay[]

const messMenuFromStorage: messMenu | [] = localStorage.getItem("messMenu") !== null
    ? JSON.parse(localStorage.getItem("messMenu")!)
    : [];


export const messMenuSlice = createSlice({
    name: 'mess-menu',
    initialState: {
        messMenu: messMenuFromStorage,

        loading: false,
        error: null
    },
    reducers: {

        getMessMenuRequest(state) { state.loading = true },
        getMessMenuSuccess(state, action) { state.loading = false; state.messMenu = action.payload },
        getMessMenuFail(state, action) { state.error = action.payload }
    }
})

export const { getMessMenuRequest, getMessMenuSuccess, getMessMenuFail } = messMenuSlice.actions

export const messMenuUpdateSlice = createSlice({
    name: 'mess-menu-update',
    initialState: {
        messMenu: messMenuFromStorage,
        success: false,
        error: false,
        loading: false
    },
    reducers: {
        updateMessMenuRequest(state) { state.loading = true },
        updateMessMenuSuccess(state, action) {
            state.loading = false;
            state.success = true;
            state.messMenu = action.payload
        },

        updateMessMenuFail(state, action) {
            state.error = action.payload

        }

    }
})

export const { updateMessMenuRequest, updateMessMenuSuccess, updateMessMenuFail } = messMenuUpdateSlice.actions
