// DUCKS pattern

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserInfo } from "../../types/userTypes";

const userInfoFromStorage: UserInfo | null = localStorage.getItem("userInfo") !== null
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

export const userLoginSlice = createSlice({

  name: 'user-login',
  initialState: {
    loading: false,
    error: null,
    userInfo: userInfoFromStorage,
    success: false,

  },

  reducers: {
    // user login pending/request
    loginRequest(state) {
      state.loading = true;
      state.userInfo = null

    },
    // user login success
    loginSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },


    loginFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload
    },
    // user logout
    logoutAction() { }
  }
})

export const { loginRequest, loginFail, loginSuccess, logoutAction } = userLoginSlice.actions




export const userRegisterSlice = createSlice({

  name: 'user-register',
  initialState: {
    loading: false,
    success: false,
    userInfo: {},
    error: null

  },

  reducers: {
    // user register pending/request
    registerRequest(state) {
      state.loading = true;
    },
    // user register success
    registerSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload
    },

    // user login failed
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload
    }

  }
})

export const { registerRequest, registerFail, registerSuccess } = userRegisterSlice.actions
const initialState = {
  user: {
    id: 0,
    username: '',
    email: '',
    room: 0,
    hostel: '',
    phone: '',
    security_fee: 0,
    isAdmin: false
  },
  loading: false,
  error: null,
  success: false

}
// get details for a particular user
export const userDetailsSlice = createSlice({
  name: 'user-details',
  initialState,

  reducers: {

    detailsRequest(state) {
      state.loading = true
    },

    detailsSuccess(state, action: PayloadAction<UserInfo>) {

      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    detailsFail(state, action) { state.loading = false; state.error = action.payload; },

    detailsReset(state) { state.user = initialState.user; state.loading = false; state.success = false; state.error = null }

  }
})
export const { detailsRequest, detailsFail, detailsSuccess, detailsReset } = userDetailsSlice.actions


// update user profile
export const userUpdateProfileSlice = createSlice({
  name: 'user-update-profile',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
    success: false
  },
  reducers: {

    updateProfileRequest(state) {
      state.loading = true
    },
    updateProfileSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;

    },
    updateProfileFail(state, action) { state.loading = false; state.error = action.payload },



  }
})
export const { updateProfileRequest, updateProfileFail, updateProfileSuccess } = userUpdateProfileSlice.actions

export const userDeleteSlice = createSlice({
  name: 'user-delete',
  initialState: {

    loading: false,
    error: null,
    success: false
  },
  reducers: {
    deleteRequest(state) { state.loading = true },
    deleteSuccess(state) { state.loading = false; state.success = true },
    deleteFail(state, action) { state.loading = false; state.error = action.payload },
  }
})
export const { deleteRequest, deleteFail, deleteSuccess } = userDeleteSlice.actions

export const userUpdateSlice = createSlice({

  name: 'update',
  initialState: {
    loading: false,
    success: false,
    user: {},
    error: null

  },

  reducers: {
    // user update pending/request
    updateRequest(state) {
      state.loading = true;
    },
    // user update success
    updateSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.success = true;
      state.user = action.payload
    },

    // update failed
    updateFail(state, action) {
      state.loading = false;
      state.error = action.payload
    },
    updateReset(state) {
      // state.loading = false;
      state.user = initialState.user;
      state.success = false;
    }

  }
})

export const { updateRequest, updateSuccess, updateFail, updateReset } = userUpdateSlice.actions


// get the attendance of user

export const userAttendanceSlice = createSlice({

  name: 'user-attendance',
  initialState: {
    loading: false,
    success: false,

    error: null

  },

  reducers: {
    // user userAttendance pending/request
    attendanceRequest(state) {
      state.loading = true;
    },
    // user userAttendance success
    attendanceSuccess(state) {
      state.loading = false;

      state.success = true;
    },

    //  failed
    attendanceFail(state, action) {
      state.loading = false;
      state.error = action.payload
    }

  }
})

export const { attendanceRequest, attendanceFail, attendanceSuccess } = userAttendanceSlice.actions



// get list of user 
export const userListSlice = createSlice({

  name: 'user-list',
  initialState: {
    loading: false,
    success: false,
    users: [


      {
        id: 0,
        username: '',
        email: '',
        room: 0,
        hostel: '',
        phone: '',
        security_fee: "0.00",
        isAdmin: false
      },

    ],
    error: null

  },

  reducers: {
    // user list pending/request
    listRequest(state) {
      state.loading = true;
    },
    // user List success
    listSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.users = action.payload
    },

    // usList failed
    listFail(state, action) {
      state.loading = false;
      state.error = action.payload
    },
    // usList failed
    listReset(state) {

      state.users = []
    }
  }
})

export const { listRequest, listFail, listSuccess, listReset } = userListSlice.actions




















