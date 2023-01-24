import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



export const getAttendanceSlice = createSlice({
    name: 'get-attendances',
    initialState: {
        loading: false,
        success: false,
        error: null,
        attendance: []

    },
    reducers: {

        getAttendanceRequest(state) { state.loading = true },
        getAttendanceSuccess(state, action) { state.loading = false, state.attendance = action.payload },
        getAttendanceFail(state, action) { state.error = action.payload, state.loading = false },

    }

})

export const { getAttendanceRequest, getAttendanceSuccess, getAttendanceFail } = getAttendanceSlice.actions





// we cannot store expenses per month since we don't know which months the user wants and secondly it will bloat the memory
// const expensesPerMonthFromStorage: expenses | [] = localStorage.getItem("expensesPerMonth") !== null
//   ? JSON.parse(localStorage.getItem("userInfo")!)
//   : [];

export const postAttendanceSlice = createSlice({
    name: 'post-attendance',
    initialState: {
        loading: false,
        success: false,
        error: null,
        attendance: {}

    },
    reducers: {

        postAttendanceRequest(state) { state.loading = true },
        postAttendanceSuccess(state, action) { state.loading = false, state.attendance = action.payload },
        postAttendanceFail(state, action) { state.error = action.payload, state.loading = false },

    }

})

export const { postAttendanceRequest, postAttendanceSuccess, postAttendanceFail } = postAttendanceSlice.actions


