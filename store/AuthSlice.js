import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Url = "https://apps.mohamed-ibrahiem.com";
//const Url = "http://192.168.0.201:8080/mohamedibrahim";

// sign
export const sign = createAsyncThunk("auth/registre", async (res, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const data = await axios
      .post(`${Url}/rest/test.product/sign`, {
        ...res,
      })
      .then((res) => {
        const { data } = res;
        window.localStorage.setItem("ib_mail", data.mail);
        window.localStorage.setItem("ib_Name", data.UserName);
        window.localStorage.setItem("ib_ID", data.UserID);
        window.localStorage.setItem("ib_Admin", data.ISAdmin);
        window.localStorage.setItem("ib_pass", res.password);
        return data;
      });

    // ib_pass
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// login
export const Userlogin = createAsyncThunk(
  "auth/Userlogin",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/loginn/`, {
          ...res,
        })
        .then((res) => {
          const { data } = res;
          console.log(res);
          if (!data.Errors || data.Errors.length === 0) {
            window.localStorage.setItem("ib_mail", data.email);
            window.localStorage.setItem("ib_Name", res.name);
            window.localStorage.setItem("ib_ID", data.id);
            window.localStorage.setItem("ib_Admin", data.isAdmin);
            window.localStorage.setItem("ib_pass", res.password);
          }
          return data;
        });

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getUserInfo`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://localhost:8080/mohamedibrahim/rest/test.product/saveUserInfo
export const saveUserInfo = createAsyncThunk(
  "auth/saveUserInfo",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/saveUserInfo?timestamp=${new Date().getTime()}`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/UpdateUserInfo`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sevaMessage = createAsyncThunk(
  "auth/sevaMessage",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/saveMessage`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    loginn: true,
    register: false,
    forget: false,
    sendcode: false,
    newpass: false,
    userInfo: null,
    // message
  },
  reducers: {
    GotoLogin: (state, action) => {
      state.loginn = true;
      state.register = false;
      state.forget = false;
      state.sendcode = false;
      state.newpass = false;
    },
    GoToRegister: (state, action) => {
      state.register = true;
      state.loginn = false;
      state.forget = false;
      state.sendcode = false;
      state.newpass = false;
    },
    GoToForger: (state, action) => {
      state.register = false;
      state.loginn = false;
      state.forget = true;
      state.sendcode = false;
      state.newpass = false;
    },
    GoToSendCode: (state, action) => {
      state.register = false;
      state.loginn = false;
      state.forget = false;
      state.sendcode = true;
      state.newpass = false;
    },
    GoToNewPass: (state, action) => {
      state.register = false;
      state.loginn = false;
      state.forget = false;
      state.sendcode = false;
      state.newpass = true;
    },
    Logout: (state, action) => {
      window.localStorage.setItem("ib_mail", "");
      window.localStorage.setItem("ib_Name", "");
      window.localStorage.setItem("ib_ID", "0");
      window.localStorage.setItem("ib_Admin", null);
      state.userInfo = null;
      state.loginn = true;
      state.register = false;
      state.forget = false;
      state.sendcode = false;
      state.newpass = false;
    },
  },
  extraReducers: {
    // sign

    [sign.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      // console.log(action);
    },
    // login

    [Userlogin.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      // console.log(action);
    },

    // getUserInfo

    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      // console.log(action);
    },

    [updateUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      // console.log(action);
    },

    // saveUserInfo

    [saveUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      // console.log(action);
    },
    // sevaMessage
    [sevaMessage.fulfilled]: (state, action) => {
      // state.userInfo = action.payload;
      console.log(action);
    },
  },
});
export const {
  GotoLogin,
  GoToRegister,
  GoToForger,
  GoToSendCode,
  GoToNewPass,
  Logout,
} = AuthSlice.actions;

export default AuthSlice.reducer;
