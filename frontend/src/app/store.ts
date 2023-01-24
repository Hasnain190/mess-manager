import { configureStore } from "@reduxjs/toolkit";

import { userLoginSlice, userRegisterSlice, userDetailsSlice, userListSlice, userDeleteSlice, userAttendanceSlice, userUpdateSlice, userUpdateProfileSlice } from "../features/user/user_slice";

import { messMenuSlice, messMenuUpdateSlice } from "../features/mess/mess_slice";


import { postAttendanceSlice, getAttendanceSlice } from "../features/attendance/attendance_slice";
import { addExpensesSlice, getExpensesPerMonthSlice, getMessBillSlice, postPayingBillSlice } from "../features/expenses/expenses_slice";



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
        attendance: postAttendanceSlice.reducer,
        getAttendance: getAttendanceSlice.reducer,

        addExpenses: addExpensesSlice.reducer,
        getExpensesPerMonth: getExpensesPerMonthSlice.reducer,

        getMessBill: getMessBillSlice.reducer,
        addBill: postAttendanceSlice.reducer,
    }

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
