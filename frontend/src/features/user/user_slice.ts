// DUCKS pattern

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
interface userInfo {

  refresh: string,
  access: string,
  id: number | null,
  username: string,
  isAdmin: boolean,
  email: string,
  phone: string | null,
  room: number | null,
  hostel: string | null,
  token: string
}
interface userLogin {
  error?: string | null | unknown,
  loading?: boolean,
  userInfo?: userInfo | null
}



const userInfoFromStorage: userInfo | null = localStorage.getItem("userInfo") !== null
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

export const userLoginSlice = createSlice({

  name: 'user-login',
  initialState: {
    loading: false,
    error: null,
    userInfo: userInfoFromStorage,


  },

  reducers: {
    // user login pending/request
    loginRequest(state) {
      state.loading = true;
      state.userInfo = null

    },
    // user login success
    loginSuccess(state, action: PayloadAction<userInfo>) {
      state.loading = false;
      state.userInfo = action.payload
    },

    // user login failed
    // FIXME: determine the type of error and give its type of action
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
    loading: true,
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
    registerSuccess(state, action: PayloadAction<userInfo>) {
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

// get details for a particular user
export const userDetailsSlice = createSlice({
  name: 'user-details',
  initialState: {
    user: {},
    loading: true,
    error: null
  },
  reducers: {

    detailsRequest(state) {
      state.loading = true
    },

    detailsSuccess(state, action: PayloadAction<userInfo>) {

      state.loading = false;
      state.user = action.payload

    },
    detailsFail(state, action) { state.loading = false, state.error = action.payload },

    detailsReset(state) { state.user = {} }

  }
})
export const { detailsRequest, detailsFail, detailsSuccess } = userDetailsSlice.actions


// update user profile
export const userUpdateProfileSlice = createSlice({
  name: 'user-update-profile',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: true,
    error: null,
    success: false
  },
  reducers: {

    updateProfileRequest(state) {
      state.loading = true
    },
    updateProfileSuccess(state, action: PayloadAction<userInfo>) {
      state.loading = false;
      state.userInfo = action.payload

    },
    updateProfileFail(state, action) { state.loading = false, state.error = action.payload },



  }
})
export const { updateProfileRequest, updateProfileFail, updateProfileSuccess } = userUpdateProfileSlice.actions

// FIXME: i don't know how it works
// delete user
export const userDeleteSlice = createSlice({
  name: 'user-delete',
  initialState: {

    loading: true,
    error: null,
    success: false
  },
  reducers: {
    deleteRequest(state) { state.loading = true },
    deleteSuccess(state) { state.loading = false; state.success = true },
    deleteFail(state, action) { state.loading = false, state.error = action.payload },
  }
})
export const { deleteRequest, deleteFail, deleteSuccess } = userDeleteSlice.actions

// FIXME: I don't know what it does so i am just writing it as it is

export const userUpdateSlice = createSlice({

  name: 'list',
  initialState: {
    loading: true,
    success: false,
    user: {},
    error: null

  },

  reducers: {
    // user list pending/request
    updateRequest(state) {
      state.loading = true;
    },
    // user List success
    updateSuccess(state, action: PayloadAction<userInfo>) {
      state.loading = false;

      state.user = action.payload
    },

    // usList failed
    updateFail(state, action) {
      state.loading = false;
      state.error = action.payload
    }

  }
})

export const { updateRequest, updateSuccess, updateFail } = userUpdateSlice.actions


// get the attendance of user

export const userAttendanceSlice = createSlice({

  name: 'user-attendance',
  initialState: {
    loading: true,
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

  name: 'list',
  initialState: {
    loading: true,
    success: false,
    users: [],
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

      state.users = action.payload
    },

    // usList failed
    listFail(state, action) {
      state.loading = false;
      state.error = action.payload
    }

  }
})

export const { listRequest, listFail, listSuccess } = userListSlice.actions




















