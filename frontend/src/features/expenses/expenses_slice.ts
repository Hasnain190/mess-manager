import { createSlice } from "@reduxjs/toolkit";

const ExpenseInitialState = {
    loading: false,
    success: false,
    error: null,
    expensesPerMonth: [

        {
            id: 0,
            date: "0000-00-00",
            attendance_first_time: "0",
            attendance_second_time: "0",
            total_attendances: "0",
            expenses_first_time: "0",
            expenses_second_time: "0",
            expenses_total: "0"
        }

    ]

}
export const addExpensesSlice = createSlice({
    name: 'add-expenses',
    initialState: ExpenseInitialState,
    reducers: {

        addExpensesRequest(state) { state.loading = true },
        addExpensesSuccess(state, action) { state.loading = false; state.success = true; state.expensesPerMonth = action.payload },
        addExpensesFail(state, action) { state.error = action.payload; state.loading = false },

    }

})

export const { addExpensesRequest, addExpensesSuccess, addExpensesFail } = addExpensesSlice.actions





// we cannot store expenses per month since we don't know which months the user wants and secondly it will bloat the memory
// const expensesPerMonthFromStorage: expenses | [] = localStorage.getItem("expensesPerMonth") !== null
//   ? JSON.parse(localStorage.getItem("userInfo")!)
//   : [];

export const getExpensesPerMonthSlice = createSlice({
    name: 'get-expenses-per-month',
    initialState: ExpenseInitialState,
    reducers: {

        getExpensesPerMonthRequest(state) { state.loading = true },
        getExpensesPerMonthSuccess(state, action) { state.loading = false; state.expensesPerMonth = action.payload; state.success = true; },
        getExpensesPerMonthFail(state, action) { state.error = action.payload; state.loading = false },

    }

})

export const { getExpensesPerMonthRequest, getExpensesPerMonthSuccess, getExpensesPerMonthFail } = getExpensesPerMonthSlice.actions



// get mess bill wo jo akhry maheenay main ata hai
export const getMessBillSlice = createSlice({
    name: 'get-mess-bill',
    initialState: {
        loading: false,

        success: false,
        error: null,
        messBill: {
            id: 0,
            dateMonth: "0000-00-00",
            bills: [

                {
                    id: 0,
                    student_id: 0,
                    student: "student",
                    room: "0",
                    total_attendances: "0",
                    dateMonth: "0000-00-00",
                    bill: "0.00",
                    dues: "0.00",
                    total: "0.00",
                }

            ]



        }

    },
    reducers: {

        getMessBillRequest(state) { state.loading = true },
        getMessBillSuccess(state, action) { state.loading = false; state.messBill = action.payload; state.success = true; },
        getMessBillFailure(state, action) { state.error = action.payload; state.loading = false },

    }

})

export const { getMessBillRequest, getMessBillSuccess, getMessBillFailure } = getMessBillSlice.actions
// jab log bill jama krwane ate hain
export const postPayingBillSlice = createSlice({
    name: 'add-paying-bill',
    initialState: {
        loading: false,
        success: false,
        error: null,
        addBill: {}

    },
    reducers: {

        postPayingBillRequest(state) { state.loading = true },
        postPayingBillSuccess(state, action) { state.loading = false; state.addBill = action.payload; state.success = true; },
        postPayingBillFail(state, action) { state.error = action.payload; state.loading = false },

    }

})

export const { postPayingBillRequest, postPayingBillSuccess, postPayingBillFail } = postPayingBillSlice.actions


export const getSumSlice = createSlice({
    name: 'get-sum',
    initialState: {
        loading: false,
        success: false,
        error: null,
        getSum:
        {

            "meat_sum": 0,
            "vegetable_sum": 0,
            "grocery_and_other_sum": 0

        }






    },
    reducers: {

        getSumRequest(state) { state.loading = true },
        getSumSuccess(state, action) { state.loading = false; state.getSum = action.payload; state.success = true; },
        getSumFail(state, action) { state.error = action.payload; state.loading = false },

    }

})

export const { getSumRequest, getSumSuccess, getSumFail } = getSumSlice.actions


