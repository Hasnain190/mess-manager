import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


//  GET EXpenses 
// [
// 	{
// 		"date": "2023-01-20",
// 		"total_attendances": 150,


// 	    "expenses_per_first_time": number;
//       "expenses_per_first_second": number;

// 	},
// 	{
// 		"date": "2023-01-21",
// 		"total_attendances": 120,
// 	    "expenses_per_first_time": number;
//       "expenses_per_first_second": number;

// 	},
// 	{
// 		"date": "2023-01-22",
// 		"total_attendances": 150,
//      "expenses_per_first_time": number;
//       "expenses_per_first_second": number;

// 
// 	}
// ]

interface expensesPerDay {
    date: string;
    total_attendances: number;
    expenses_per_first_time: number;
    expenses_per_first_second: number;


}

type TExpenses = expensesPerDay[]
const ExpenseInitialState = {
    loading: false,
    success: false,
    error: null,
    expensesPerMonth: [

        {
            id: 0,
            date: "0000-00-00",
            attendance_first_time: 0,
            attendance_second_time: 0,
            total_attendances: 0,
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
        messBill: [



        ]

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


