import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../util/api'

// First, create the thunk
 const fetchCompany= createAsyncThunk(
  'company/fetch',
  async (data) => {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&'); 
    const response = await api('/company?'+queryString,'get',DataTransferItem);
    return response.data
  }
);

 const AddCompany= createAsyncThunk(
    'company/add',
    async (data) => {
      const response = await api('/company','post',data);
      return response.data;
    }
  );

 const updateCompany= createAsyncThunk(
    'company/update',
    async (data,id) => {
      const response = await api('/company/'+id,'patch',data);
      return response.data;
    }
  );
  const deleteCompany= createAsyncThunk(
    'company/delete',
    async (id) => {
      const response = await api('/company/'+id,'delete');
      return response.data;
    }
  );
const initialState = {
  entities: [],
  loading: 'idle',
  pageNo:0,
  totalPages:0
} 

// Then, handle actions in your reducers:
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchCompany.fulfilled, (state, action) => {
      state.entities = action.payload.data;
      state.pageNo =  action.payload.page;
      state.totalPages =  action.payload.totalPages;
      state.loading =false
    })
    .addCase(fetchCompany.pending, (state) => {
        state.loading =true
    })
    .addCase(AddCompany.fulfilled, (state, action) => {
        state.entities = [ action.payload,...state.entities];
        state.loading =false;
    })
    .addCase(AddCompany.pending, (state) => {
        state.loading =true;
    })
    .addCase(updateCompany.fulfilled, (state, action) => {
        var itemIndex = state.entities.findIndex(x => x._id == action.payload._id);
        state.entities[itemIndex] = action.payload;
        state.loading =false;
    })
    .addCase(updateCompany.pending, (state) => {
        state.loading =true;
    })
    .addCase(deleteCompany.fulfilled, (state, action) => {
        state.entities =state.entities.filter(e=>e._id!=action.payload._id)
        state.loading =false;
     })
    .addCase(deleteCompany.pending, (state) => {
        state.loading =true;
    })
  },
})

export default companySlice.reducer;