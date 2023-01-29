import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



export const getAttendanceSlice = createSlice({
    name: 'get-attendances',
    initialState: {
        loading: false,
        success: false,
        error: null,
        attendance: [
            {
                id: 0,
                date: '00-00-2000',
                first_time: 'absent',
                second_time: 'absent',
                student: 0
            }


        ]

    },
    reducers: {

        getAttendanceRequest(state) { state.loading = true },
        getAttendanceSuccess(state, action) { state.loading = false; state.attendance = action.payload; state.success = true; },
        getAttendanceFail(state, action) { state.error = action.payload; state.loading = false }

    }

})

export const { getAttendanceRequest, getAttendanceSuccess, getAttendanceFail } = getAttendanceSlice.actions



export const getMonthlyAttendanceSlice = createSlice({
    name: 'get-monthly-attendances',
    initialState: {
        loading: false,
        success: false,
        error: null,
        attendance: [
            {
                id: 0,
                date: '00-00-2000',
                first_time: 'absent',
                second_time: 'absent',
                student: 0
            }


        ]

    },
    reducers: {

        getMonthAttendanceRequest(state) { state.loading = true },
        getMonthAttendanceSuccess(state, action) { state.loading = false; state.attendance = action.payload; state.success = true; },
        getMonthAttendanceFail(state, action) { state.error = action.payload; state.loading = false }

    }

})

export const { getMonthAttendanceRequest, getMonthAttendanceSuccess, getMonthAttendanceFail } = getMonthlyAttendanceSlice.actions


export const getDailyAttendanceSlice = createSlice({
    name: 'get-daily-attendances',
    initialState: {
        loading: false,
        success: false,
        error: null,
        attendance: [
            {
                id: 0,
                date: '00-00-2000',
                first_time: 'absent',
                second_time: 'absent',
                student: 0
            }


        ]

    },
    reducers: {

        getDailyAttendanceRequest(state) { state.loading = true },
        getDailyAttendanceSuccess(state, action) { state.loading = false; state.attendance = action.payload; state.success = true; },
        getDailyAttendanceFail(state, action) { state.error = action.payload; state.loading = false }

    }

})

export const { getDailyAttendanceRequest, getDailyAttendanceSuccess, getDailyAttendanceFail } = getDailyAttendanceSlice.actions



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
        postAttendanceSuccess(state, action) { state.loading = false; state.attendance = action.payload; state.success = true; },
        postAttendanceFail(state, action) { state.error = action.payload; state.loading = false },

    }

})

export const { postAttendanceRequest, postAttendanceSuccess, postAttendanceFail } = postAttendanceSlice.actions


