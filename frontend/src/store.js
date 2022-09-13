// store redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/user_reducers";

import { messMenuReducer } from "./reducers/mess_reducers";
import { postAttendanceReducers, getAttendanceReducers } from "./reducers/attendance_reducers";
import { addExpensesReducer, getBillReducer, getExpensesPerMonthReducers } from "./reducers/expenses_reducers";

import { addBillReducer } from "./reducers/expenses_reducers";
const reducer = combineReducers({
  // user reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,



  // userPasswordReset:userPasswordResetReducer,
  // userPasswordResetConfirm:userPasswordResetConfirmReducer,

  // mess reducers
  messMenu: messMenuReducer,

  // attendance reducers
  attendance: postAttendanceReducers,
  getAttendance: getAttendanceReducers,

  addExpenses: addExpensesReducer,
  getExpensesPerMonth: getExpensesPerMonthReducers,

  getBill: getBillReducer,
  addBill: addBillReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const messMenuFromStorage = localStorage.getItem("messMenu") ? JSON.parse(localStorage.getItem("messMenu")) : null;
// const attendanceFromStorage = localStorage.getItem("getAttendance") ? JSON.parse(localStorage.getItem("getAttendance")) : null;


const initialState = {

  userLogin: { userInfo: userInfoFromStorage },

  messMenu: { messMenu: messMenuFromStorage },

  // getAttendance: attendanceFromStorage
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
