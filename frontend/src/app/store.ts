import { configureStore } from "@reduxjs/toolkit";

import { userLoginSlice, userRegisterSlice, userDetailsSlice, userListSlice, userDeleteSlice, userAttendanceSlice, userUpdateSlice, userUpdateProfileSlice } from "../features/user/user_slice";

import { messMenuSlice, messMenuUpdateSlice } from "../features/mess/mess_slice";


import { postAttendanceReducers, getAttendanceReducers } from "./reducers/attendance_reducers";
import { addExpensesReducer, getBillReducer, getExpensesPerMonthReducers } from "./reducers/expenses_reducers";

import { addBillReducer } from "./reducers/expenses_reducers";

export const store = configureStore({
    reducer: {
        // user reducers
        userLogin: userLoginSlice.reducer,
        userRegister: userRegisterSlice.reducer,

        userDetails: userDetailsSlice.reducer,
        userUpdateProfile: userUpdateProfileSlice.reducer,
        userList: userListSlice.reducer,
        userDelete: userDeleteSlice.reducer,
        userUpdate: userUpdateSlice.reducer,



        // userPasswordReset:userPasswordResetReducer,
        // userPasswordResetConfirm:userPasswordResetConfirmReducer,

        // mess reducers
        messMenu: messMenuSlice.reducer,
        updateMessMenu: messMenuUpdateSlice.reducer,

        // attendance reducers
        attendance: postAttendanceReducers,
        getAttendance: getAttendanceReducers,

        addExpenses: addExpensesReducer,
        getExpensesPerMonth: getExpensesPerMonthReducers,

        getBill: getBillReducer,
        addBill: addBillReducer,
    }

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
