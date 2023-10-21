import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Url = "https://apps.mohamed-ibrahiem.com";
// const Url = "http://192.168.0.201:8080/mohamedibrahim";

export const AddToCart = createAsyncThunk(
  "Shop/AddToCart",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/addd`, {
          ...item,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getCarts
export const getCarts = createAsyncThunk(
  "Shop/getCarts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getUserOrderDetails`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/search/

export const SearchDis = createAsyncThunk(
  "Shop/SearchDis",
  async (pro, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const headers = {
      "Content-Type": "application/json",
      // 'Authorization': 'JWT fefege...'
    };
    try {
      const data = await axios
        .post(
          `${Url}/rest/test.product/search/`,
          {
            ...pro,
          },
          {
            headers: headers,
          }
        )
        .then((res) => res.data);
      console.log(data)
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// https://apps.mohamed-ibrahiem.com/rest/test.product/getParentCategories/
export const getParentCategories = createAsyncThunk(
  "Shop/getParentCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getParentCategories/`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// https://apps.mohamed-ibrahiem.com/rest/test.product/getSubCategories/
export const getSubCategories = createAsyncThunk(
  "Shop/getSubCategories",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getSubCategories/`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// https://apps.mohamed-ibrahiem.com/rest/test.product/getproductJson/

export const getproductJson = createAsyncThunk(
  "Shop/getproductJson",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getproductJson/`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCtsproduct = createAsyncThunk(
  "Shop/getCtsproduct",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getproductJson/`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/print
// export const PDF_Print = createAsyncThunk(
//   "Shop/PDF_Print",
//   async (id, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const data = await axios
//         .post(`${Url}/rest/test.product/print`, {
//           id,
//         })
//         .then((res) => res.data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteLine/1/1
export const deleteLine = createAsyncThunk(
  "Shop/deleteLine",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteLines`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.orderbill/updateCart
export const updateCart = createAsyncThunk(
  "Shop/updateCart",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.orderbill/updateCart`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.orderbill/finishCart
export const finishCart = createAsyncThunk(
  "Shop/finishCart",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.orderbill/finishCart`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.orderbill/finishCart
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getOriginalImagee/
export const getOriginalImagee = createAsyncThunk(
  "Shop/getOriginalImagee",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getOriginalImagee`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getUserFinishedBills
export const getUserFinishedBills = createAsyncThunk(
  "cp/getUserFinishedBills",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getUserFinishedBills`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const ShopSlice = createSlice({
  name: "Shop",
  initialState: {
    isLoading: false,
    error: null,
    CartArr: null,
    searchArr: [],
    ShowSearch: true,
    SetSearchInput: "",
    CartsArr: null,
    MainCatsArr: null,
    SubCategoriesArr: null,
    ProductsCats: [],
    CtsproductArr: [],
    TestProArr: [],
    PDFUrl: "",
    SubCatsArr: [],
    OriginalImageArr: null,
    UserFinishedBillsArr: null,
  },
  reducers: {
    searchChar: (state, action) => {
      state.SetSearchInput = action.payload;
    },
    InitaialCtsproductArr: (state, action) => {
      state.TestProArr = action.payload;
    },
    ClearCart: (state, action) => {
      state.CartsArr = null;
    },
  },
  extraReducers: {
    // ClientsArr

    [AddToCart.fulfilled]: (state, action) => {
      // state.ClientsArr = action.payload.data;
      // console.log(action);
    },

    // getCarts

    [getCarts.fulfilled]: (state, action) => {
      state.CartsArr = action.payload;
      // console.log(action);
    },

    // SearchDis

    [SearchDis.fulfilled]: (state, action) => {
      if (action.meta.arg.page === 0) {
        state.searchArr = action.payload.products;
      }
      if (state.SetSearchInput.length > 0) {
        if (action.meta.arg.page === 0) {
          state.searchArr = action.payload.products;
        } else {
          state.searchArr = state.searchArr.concat(action.payload.products);
        }
      } else {
        if (action.meta.arg.page === 0) {
          state.searchArr = action.payload.products;
        } else {
          state.searchArr = state.searchArr.concat(action.payload.products);
        }
      }
      state.ShowSearch = true;
    },

    // getParentCategories
    [getParentCategories.fulfilled]: (state, action) => {
      state.MainCatsArr = action.payload.cats;
      // console.log(action);
    },
    // getSubCategories

    [getSubCategories.fulfilled]: (state, action) => {
      state.ShowSearch = false;
      state.SubCategoriesArr = action.payload.cats;
      // console.log(action);
    },
    // getproductJson

    [getproductJson.fulfilled]: (state, action) => {
      state.ShowSearch = false;
      if (action.meta.arg.page === 0) {
        state.ProductsCats = action.payload.products;
      } else if (action.meta.arg.page > 0) {
        state.ProductsCats = state.ProductsCats.concat(action.payload.products);
      }
      // console.log(action);
    },

    // getCtsproduct

    [getCtsproduct.fulfilled]: (state, action) => {
      state.ShowSearch = false;
      if (action.meta.arg.page === 0) {
        state.CtsproductArr = action.payload.products;
      } else if (action.meta.arg.page > 0) {
        state.CtsproductArr = state.CtsproductArr.concat(
          action.payload.products
        );
        // console.log(state.CtsproductArr);
      }
      // console.log(action);
    },

    // Get PDFURL
    // [PDF_Print.pending]: (state, action) => {
    //   // console.log(action);
    //   // console.log(action);

    //   state.error = null;
    // },
    // [PDF_Print.fulfilled]: (state, action) => {
    //   state.PDFUrl = action.payload;
    //   // console.log(action);
    //   // console.log(action);
    // },
    // [PDF_Print.rejected]: (state, action) => {
    //   state.error = action.payload;
    //   // console.log(action);
    //   // console.log(action);
    // },
    // deleteLine

    [deleteLine.fulfilled]: (state, action) => {
      // state.PDFUrl = action.payload;
      state.CartsArr = action.payload;
      // console.log(action);
    },

    // finishCart

    [finishCart.fulfilled]: (state, action) => {
      // state.PDFUrl = action.payload;
      // console.log(action);
    },

    // getOriginalImagee

    [getOriginalImagee.fulfilled]: (state, action) => {
      state.OriginalImageArr = action.payload.val;
      // console.log(action);
    },

    // getUserFinishedBills

    [getUserFinishedBills.fulfilled]: (state, action) => {
      state.UserFinishedBillsArr = action.payload.data;
      // console.log(action);
    },
  },
});
export const {
  searchChar,
  InitaialCtsproductArr,
  ClearCart,
} = ShopSlice.actions;

export default ShopSlice.reducer;
