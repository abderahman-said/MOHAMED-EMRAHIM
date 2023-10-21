import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Url = "https://apps.mohamed-ibrahiem.com";
// const Url = "http://192.168.0.201:8080/mohamedibrahim";

// getClients
export const getClients = createAsyncThunk(
  "Home/getClients",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getClients`)
        .then((res) => res.data);
      // console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// getMostViewed
export const getMostViewed = createAsyncThunk(
  "Home/getMostViewed",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getMostViewed`)
        .then((res) => res.data);
      // console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// getLastproductJson
export const getLastproductJson = createAsyncThunk(
  "Home/getLastproductJson",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getLastproductJson`)
        .then((res) => res.data);
      // console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// getHeaderBanners
export const getHeaderBanners = createAsyncThunk(
  "Home/getHeaderBanners",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getHeaderBanners`)
        .then((res) => res.data);
      // console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getBanners

export const getBanners = createAsyncThunk(
  "Home/getBanners",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getBanners?timestamp=${new Date().getTime()}`)
        // .get(`https://apps.mohamed-ibrahiem.com/rest/test.product/getBanners`)
        .then((res) => res);
      console.log(data);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const HomeSlice = createSlice({
  name: "Home",
  initialState: {
    isLoading: false,
    error: null,
    HomeHello: "HI Next",
    ClientsArr: null,
    MostViewedArr: null,
    LastproductJsonArr: null,
    HeaderBannersArr: null,
    BannersArr: null,
    Url: "https://apps.mohamed-ibrahiem.com",
    // Url: "http://192.168.0.201:8080/mohamedibrahim",
  },
  reducers: {
    PrintHello: (state, action) => {
      state.HomeHello = "Update Next";
    },
  },
  extraReducers: {
    // ClientsArr

    [getClients.fulfilled]: (state, action) => {
      state.ClientsArr = action.payload.data;
      // console.log(action);
    },

    // getMostViewed

    [getMostViewed.fulfilled]: (state, action) => {
      state.MostViewedArr = action.payload.products;
      // console.log(action);
    },
    // getLastproductJson

    [getLastproductJson.fulfilled]: (state, action) => {
      state.LastproductJsonArr = action.payload.products;
      // console.log(action);
    },
    // getHeaderBanners

    [getHeaderBanners.fulfilled]: (state, action) => {
      state.HeaderBannersArr = action.payload.data;
      // console.log(action);
    },
    // getBanners

    [getBanners.fulfilled]: (state, action) => {
      state.BannersArr = action.payload;
      console.log(action);
    },
    // [getBanners.rejected]: (state, action) => {
    //   // state.BannersArr = action.payload;
    //   console.log(action);
    // },
  },
});
export const { PrintHello } = HomeSlice.actions;

export default HomeSlice.reducer;
