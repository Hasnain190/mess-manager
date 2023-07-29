import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messMenu } from "../../types/messTypes";

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
