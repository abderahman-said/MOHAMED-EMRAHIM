// http://192.168.0.201:8080/mohamedibrahim/rest/test.categories/getAllCategories
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Url = "https://apps.mohamed-ibrahiem.com";
// const Url = "http://192.168.0.201:8080/mohamedibrahim";
// /rest/test.product/getAllProducts

export const GtALlCats = createAsyncThunk(
  "cp/GtALlCats",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.categories/getAllCategories?timestamp=${new Date().getTime()}`, {
          page: 0,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const GetFilteredProducts = createAsyncThunk(
  "cp/GetFilteredProducts",
  async (filters, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        // .post(`${Url}/rest/test.product/getFilteredProducts?timestamp=${new Date().getTime()}`, {
        .post(`http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getFilteredProduct?timestamp=${new Date().getTime()}`, {
          // page: 0,
          ...filters
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getClientss

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getAllProducts
export const GetALLProducts = createAsyncThunk(
  "cp/GetALLProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getFilteredProduct?timestamp=${new Date().getTime()}`, {})
        .then((res) => res.data);
      console.log(data)
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getAvailableProducts
export const getAvailableProducts = createAsyncThunk(
  "cp/getAvailableProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getAvailableProducts?timestamp=${new Date().getTime()}`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getUnAvailableProducts
export const getUnAvailableProducts = createAsyncThunk(
  "cp/getUnAvailableProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getUnAvailableProducts?timestamp=${new Date().getTime()}`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getWithNoImagess
export const getWithNoImagess = createAsyncThunk(
  "cp/getWithNoImagess",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getWithNoImagess?timestamp=${new Date().getTime()}`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getHeaders
export const getHeaders = createAsyncThunk(
  "cp/getHeaders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getHeaders?timestamp=${new Date().getTime()}`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getUserss
export const getUserss = createAsyncThunk(
  "cp/getUserss",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getUserss?timestamp=${new Date().getTime()}`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getClientss
export const getClientss = createAsyncThunk(
  "cp/getClientss",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getClientss?timestamp=${new Date().getTime()}`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getBills
export const getBills = createAsyncThunk(
  "cp/getBills",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getBills?timestamp=${new Date().getTime()}`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.categories/saveCategory
export const saveCategory = createAsyncThunk(
  "cp/saveCategory",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.categories/saveCategory`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.categories/updateCategory
export const updateCategory = createAsyncThunk(
  "cp/updateCategory",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.categories/updateCategory`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.categories/deleteCategory
export const deleteCategory = createAsyncThunk(
  "cp/deleteCategory",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.categories/deleteCategory`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/saveP/
export const SaveProducts = createAsyncThunk(
  "cp/SavePRoducts",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/saveP/`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/updateProduct/
export const updateProduct = createAsyncThunk(
  "cp/updateProduct",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/updateProduct/`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/deleteProduct/
export const deleteProduct = createAsyncThunk(
  "cp/deleteProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteProduct/`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/getProductSpecs
export const getProductSpecs = createAsyncThunk(
  "cp/getProductSpecs",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getProductSpecs`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const EditeDescription = createAsyncThunk(
  "cp/EditeDescription",
  async (res, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState().ControlPanal.ProductSpecsArr;
    try {
      // const data = state;
      const data = state.filter((ele) => ele.specId === res.specId);
      data.specId = res.specId;
      data.ProductName = res.ProductName;
      data.specName = res.specName;
      data.value = res.value;
      data.productId = res.productId;
      const result = {
        productId: data.productId,
        specId: data.specId,
        ProductName: data.ProductName,
        specName: data.specName,
        value: data.value,
      };
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// ${Url}/rest/test.product/saveProductSpecs

export const saveProductSpecs = createAsyncThunk(
  "cp/saveProductSpecs",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState().ControlPanal.sendProductSpecsArr;
    try {
      const res = {
        data: state,
        size: state.length,
      };
      // console.log(res);
      const data = await axios
        .post(`${Url}/rest/test.product/saveProductSpecs`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/saveHeader
export const saveHeader = createAsyncThunk(
  "cp/saveHeader",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/saveHeader`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/updateHeader

export const updateHeader = createAsyncThunk(
  "cp/updateHeader",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/updateHeader`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteHeader
export const deleteHeader = createAsyncThunk(
  "cp/deleteHeader",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteHeader`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteUser
export const deleteUser = createAsyncThunk(
  "cp/deleteUser",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteUser`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteClient
export const deleteClient = createAsyncThunk(
  "cp/deleteClient",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteClient`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/addClient
export const addClient = createAsyncThunk(
  "cp/addClient",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/addClient`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/updateClientss
export const updateClientss = createAsyncThunk(
  "cp/updateClientss",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/updateClientss`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.orderbill/deleteOrder
export const deleteOrder = createAsyncThunk(
  "cp/deleteOrder",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.orderbill/deleteOrder`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getOrderDeatils
export const getOrderDeatils = createAsyncThunk(
  "cp/getOrderDeatils",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/getOrderDeatils`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getMessages
export const getMessages = createAsyncThunk(
  "cp/getMessages",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getMessages`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteMessage
export const deleteMessage = createAsyncThunk(
  "cp/deleteMessage",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteMessage`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// // http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getHeaders
// export const getWebHeaders = createAsyncThunk(
//   "cp/getHeaders",
//   async (_, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const data = await axios
//         .get(`${Url}/rest/test.product/getMessages`)
//         .then((res) => res.data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );
// http://192.168.0.201:8080/mohamedibrahim/rest/test.orderbill/finishOrderForAdmin
export const finishOrderForAdmin = createAsyncThunk(
  "cp/finishOrderForAdmin",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.orderbill/finishOrderForAdmin`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/saveHeaderBanner
export const saveHeaderBanner = createAsyncThunk(
  "cp/saveHeaderBanner",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/saveHeaderBanner`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/updateHeaderBanner
export const updateHeaderBanner = createAsyncThunk(
  "cp/updateHeaderBanner",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/updateHeaderBanner`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getSiteJson
export const getSiteJson = createAsyncThunk(
  "cp/getSiteJson",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}/rest/test.product/getSiteJson`)
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteProductImagee

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/updateSiteJson
export const updateSiteJson = createAsyncThunk(
  "cp/updateSiteJson",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/updateSiteJson`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteProductImagee
export const deleteProductImagee = createAsyncThunk(
  "cp/deleteProductImagee",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteProductImagee`, {
          id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getBanners
// export const getBanners = createAsyncThunk(
//   "cp/getBanners",
//   async (res, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const data = await axios
//         .get(`${Url}/rest/test.product/getBanners`)
//         .then((res) => res.data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/saveBanner
export const saveBanner = createAsyncThunk(
  "cp/saveBanner",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/saveBanner`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/saveHeader
// getHeaders
// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/getHeaders
// export const getHeaders = createAsyncThunk(
//   "cp/getHeaders",
//   async (id, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const data = await axios
//         .post(`${Url}/rest/test.product/getHeaders`, {
//           id,
//         })
//         .then((res) => res.data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/deleteHomeBannerPojo

export const deleteHomeBannerPojo = createAsyncThunk(
  "cp/deleteHomeBannerPojo",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/deleteHomeBannerPojo`, {
          ...id,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// http://192.168.0.201:8080/mohamedibrahim/rest/test.product/updateHomeBannerPoj
export const updateHomeBannerPoj = createAsyncThunk(
  "cp/updateHomeBannerPojo",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${Url}/rest/test.product/updateHomeBannerPojo`, {
          ...res,
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const ControlPanal = createSlice({
  name: "cp",
  initialState: {
    isLoading: false,
    error: null,
    AllCatsArr: null,
    ALLProducts: null,
    AvailableProductsArr: null,
    UnAvailableProductsArr: null,
    WithNoImagessArr: null,
    HeadersArr: null,
    UserssArr: null,
    ProvClientssArr: null,
    BillsArr: null,
    ProductSpecsArr: [],
    sendProductSpecsArr: [],
    OrderDeatilsArr: null,
    MessagesArr: null,
    SiteJsonArr: null,
  },
  extraReducers: {
    // login

    [GtALlCats.fulfilled]: (state, action) => {
      state.AllCatsArr = action.payload.cats;
      // console.log(action.cats);
    },
    // GetFilteredProducts
    [GetFilteredProducts.fulfilled]: (state, action) => {
      state.ALLProducts = action.payload.products;
      console.log("filtered", action.payload)
    },
    // GetALLProducts

    [GetALLProducts.fulfilled]: (state, action) => {
      state.ALLProducts = action.payload.products;
      console.log(action.payload)
      // console.log(action.cats);
    },
    // getAvailableProducts

    [getAvailableProducts.fulfilled]: (state, action) => {
      state.AvailableProductsArr = action.payload.products;
      // console.log(action.cats);
    },

    // getUnAvailableProducts
    [getUnAvailableProducts.fulfilled]: (state, action) => {
      state.UnAvailableProductsArr = action.payload.products;
      // console.log(action.cats);
    },
    // getWithNoImagess

    [getWithNoImagess.fulfilled]: (state, action) => {
      state.WithNoImagessArr = action.payload.products;
      // console.log(action.cats);
    },

    // getHeaders

    [getHeaders.fulfilled]: (state, action) => {
      state.HeadersArr = action.payload;
      // console.log(action.cats);
    },

    // getUserss

    [getUserss.fulfilled]: (state, action) => {
      state.UserssArr = action.payload.data;
      // console.log(action.cats);
    },

    // getClientss

    [getClientss.fulfilled]: (state, action) => {
      state.ProvClientssArr = action.payload.data;
      // console.log(action.cats);
    },

    // BillsArr

    [getBills.fulfilled]: (state, action) => {
      state.BillsArr = action.payload.data;
      // console.log(action);
    },

    // saveCategory

    // BillsArr

    // [saveCategory.fulfilled]: (state, action) => {
    //   // state.BillsArr= action.payload.data;
    //   console.log(state.AllCatsArr.length);
    // },

    // updateCategory

    [updateCategory.fulfilled]: (state, action) => {
      // state.BillsArr= action.payload.data;
      // let item = state.AllCatsArr.findIndex((obj => obj.id == action.meta.arg.id));
      // console.log(state.AllCatsArr[item]);
      // console.log(item);
      console.log(action);
    },
    [updateCategory.rejected]: (state, action) => {
      // state.BillsArr= action.payload.data;
      // let item = state.AllCatsArr.findIndex((obj => obj.id == action.meta.arg.id));
      // console.log(state.AllCatsArr[item]);
      // console.log(item);
      console.log(action);
    },

    // deleteCategory

    [deleteCategory.fulfilled]: (state, action) => {
      // state.AllCatsArr= action.payload.data;
      state.AllCatsArr = state.AllCatsArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      // console.log(action);
    },

    // SaveProducts

    [SaveProducts.fulfilled]: (state, action) => {
      // state.AllCatsArr= action.payload.data;
      state.ALLProducts.push(action.payload);
      // state.AllCatsArr = state.AllCatsArr.filter((ele) => ele.id !== action.meta.arg);
      console.log("here", action);
    },

    // updateProduct
    [updateProduct.rejected]: (state, action) => {
      console.log(action.payload)
      // state.AllCatsArr= action.payload.data;
      //  state.ALLProducts.push(action.payload);
      // const all = state.ALLProducts.filter(
      //   (ele) => ele.id !== action.meta.arg.id
      // );
      // console.log(all)

      // state.ALLProducts = all.push(action.payload)
      // setTimeout(() => {
      //   state.ALLProducts.push(action.payload);
      // }, 1000);
      // console.log(update.push(action.payload))
      // console.log(update.push(action.payload));
    },

    [updateProduct.fulfilled]: (state, action) => {
      console.log(action.payload)
      // state.AllCatsArr= action.payload.data;
      //  state.ALLProducts.push(action.payload);
      // const all = state.ALLProducts.filter(
      //   (ele) => ele.id !== action.meta.arg.id
      // );
      // console.log(all)

      // state.ALLProducts = all.push(action.payload)
      // setTimeout(() => {
      //   state.ALLProducts.push(action.payload);
      // }, 1000);
      // console.log(update.push(action.payload))
      // console.log(update.push(action.payload));
    },

    // deleteProduct

    [deleteProduct.fulfilled]: (state, action) => {
      // state.AllCatsArr= action.payload.data;
      //  state.ALLProducts.push(action.payload);
      // state.AllCatsArr = state.AllCatsArr.filter((ele) => ele.id !== action.meta.arg);
      state.ALLProducts = state.ALLProducts.filter(
        (ele) => ele.id !== action.meta.arg
      );
      console.log(action);
    },

    // getProductSpecs

    [getProductSpecs.fulfilled]: (state, action) => {
      state.ProductSpecsArr = action.payload;
      state.sendProductSpecsArr = action.payload;
      // sendProductSpecsArr
      // console.log(state.ProductSpecsArr)
      // console.log(action);
    },

    // EditeDescription

    [EditeDescription.fulfilled]: (state, action) => {
      const sec = state.sendProductSpecsArr.filter(
        (ele) => ele.specId !== action.payload.specId
      );
      state.sendProductSpecsArr = [
        ...sec,
        Object.assign({}, { ...action.payload }),
      ];
    },
    // saveProductSpecs
    // [saveProductSpecs.fulfilled]: (state, action) => {
    //   // state.ProductSpecsArr = action.payload;
    //   // console.log(action);
    //   // console.log(state.sendProductSpecsArr);
    // },

    // saveHeader
    // [saveHeader.fulfilled]: (state, action) => {
    //   // state.AllCatsArr= action.payload.data;
    //   // state.HeadersArr.push(action.payload);
    //   // console.log(action);
    // },

    // deleteHeader
    [deleteHeader.fulfilled]: (state, action) => {
      // state.AllCatsArr= action.payload.data;
      state.HeadersArr = state.HeadersArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      // console.log(action);
    },
    // updateHeader
    // [updateHeader.fulfilled]: (state, action) => {
    //   // state.AllCatsArr= action.payload.data;
    //   // state.HeadersArr = state.HeadersArr.filter(
    //   //   (ele) => ele.id !== action.meta.arg
    //   // );
    //   // console.log(action);
    // },
    // deleteClient
    [deleteClient.fulfilled]: (state, action) => {
      // state.AllCatsArr= action.payload.data;
      state.ProvClientssArr = state.ProvClientssArr.filter(
        (ele) => ele.code !== action.meta.arg
      );
      // console.log(action);
    },
    // addClient
    // [addClient.fulfilled]: (state, action) => {
    //   // state.AllCatsArr= action.payload.data;
    //   // state.HeadersArr = state.HeadersArr.filter(
    //   //   (ele) => ele.id !== action.meta.arg
    //   // );
    //   // console.log(action);
    // },
    // updateClientss
    // [updateClientss.fulfilled]: (state, action) => {
    //   // state.AllCatsArr= action.payload.data;
    //   // state.HeadersArr = state.HeadersArr.filter(
    //   //   (ele) => ele.id !== action.meta.arg
    //   // );
    //   // console.log(action);
    // },

    // getOrderDeatils

    [getOrderDeatils.fulfilled]: (state, action) => {
      state.OrderDeatilsArr = action.payload;
      // console.log(action);
    },

    // deleteOrder

    [deleteOrder.fulfilled]: (state, action) => {
      state.BillsArr = state.BillsArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      // state.OrderDeatilsArr = action.payload;
      // console.log(action);
    },

    // getMessages
    [getMessages.fulfilled]: (state, action) => {
      state.MessagesArr = action.payload.data;
      // state.OrderDeatilsArr = action.payload;
      // console.log(action);
    },

    // deleteMessage
    [deleteMessage.fulfilled]: (state, action) => {
      state.MessagesArr = state.MessagesArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      // state.OrderDeatilsArr = action.payload;
      // console.log(action);
    },

    // finishOrderForAdmin
    // [finishOrderForAdmin.fulfilled]: (state, action) => {
    //   // state.MessagesArr = state.MessagesArr.filter((ele) => ele.id !== action.meta.arg);
    //   // state.OrderDeatilsArr = action.payload;
    //   // console.log(action);
    // },

    // saveHeaderBanner

    [saveHeaderBanner.fulfilled]: (state, action) => {
      // state.MessagesArr = state.MessagesArr.filter((ele) => ele.id !== action.meta.arg);
      // state.OrderDeatilsArr = action.payload;
      // console.log(action);
    },

    // getSiteJson
    [getSiteJson.fulfilled]: (state, action) => {
      // state.MessagesArr = state.MessagesArr.filter((ele) => ele.id !== action.meta.arg);
      state.SiteJsonArr = action.payload;
      // console.log(action);
    },
    // updateSiteJson
    [updateSiteJson.fulfilled]: (state, action) => {
      // state.MessagesArr = state.MessagesArr.filter((ele) => ele.id !== action.meta.arg);
      // state.SiteJsonArr = action.payload;
      state.SiteJsonArr = action.payload;

      // console.log(action);
    },
    // updateSiteJson
    // [updateHeaderBanner.pending]: (state, action) => {
    //   console.log(action);
    // },

    // [updateHeaderBanner.rejected]: (state, action) => {
    //   console.log(action);
    // },

    // [updateHeaderBanner.fulfilled]: (state, action) => {
    //   console.log(action);
    // },
    // // deleteHomeBannerPojo
    // [deleteHomeBannerPojo.fulfilled]: (state, action) => {
    //   console.log(action);
    // },
    // saveBanner
    // [saveBanner.fulfilled]: (state, action) => {
    //   console.log(action);
    // },
    // [saveBanner.rejected]: (state, action) => {
    //   console.log(action);
    // },
    // updateHomeBannerPoj
    [updateHomeBannerPoj.fulfilled]: (state, action) => {
      console.log(action);
    },
    [updateHomeBannerPoj.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

// export const {
//   EditeDescription
// } = ControlPanal.actions;
export default ControlPanal.reducer;
