import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../util/api'

// First, create the thunk
export const fetchShift= createAsyncThunk(
  'Shift/fetch',
  async (data) => {
  
   
    var queryString =data!=undefined? Object.keys(data).map(key => key + '=' + data[key]).join('&'):''; 
     // {name:azad,date:2022-12-12} will be became name=azad&date=022-12-12
     
    const response = await api('/shift?'+queryString,'get',DataTransferItem);
   
    return response.data
  }
);

export const AddShift= createAsyncThunk(
    'Shift/add',
    async (data) => {
      const response = await api('/shift','post',data);
      return response.data;
    }
  );

  export const updateShift= createAsyncThunk(
    'Shift/update',
    async (data,id) => {
      const response = await api('/shift/'+id,'patch',data);
      return response.data;
    }
  );
  export const deleteShift= createAsyncThunk(
    'Shift/delete',
    async (id) => {
      const response = await api('/shift/'+id,'delete');
      return response.data;
    }
  );
const initialState = {
  entities: [],
  loading: false,
  pageNo:0,
  total:0,
  perpage:0
} 

// Then, handle actions in your reducers:
const ShiftSlice = createSlice({
  name: 'Shift',
  initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchShift.fulfilled, (state, action) => {
     // console.log(action.payload)
      state.entities = action.payload.docs;
      state.pageNo =  action.payload.page;
      state.total =  action.payload.count;
      state.perpage =action.payload.perpage;
      state.loading =false
     
    })
    .addCase(fetchShift.pending, (state) => {
        state.loading =true
    })
    .addCase(AddShift.fulfilled, (state, action) => {
        state.entities = [ action.payload,...state.entities];
        state.loading =false;
    })
    .addCase(AddShift.pending, (state) => {
        state.loading =true;
    })
    .addCase(updateShift.fulfilled, (state, action) => {
        var itemIndex = state.entities.findIndex(x => x._id == action.payload._id);
        state.entities[itemIndex] = action.payload;
        state.loading =false;
    })
    .addCase(updateShift.pending, (state) => {
        state.loading =true;
    })
    .addCase(deleteShift.fulfilled, (state, action) => {
        state.entities =state.entities.filter(e=>e._id!=action.payload._id)
        state.loading =false;
     })
    .addCase(deleteShift.pending, (state) => {
        state.loading =true;
    })
  },
})
export const selectShifts = (state)=>state.shiftReducer.entities;
export const selectLoading = (state)=>state.shiftReducer.loading;
export const selectTotal = (state)=>state.shiftReducer.total;
export const selectPageNo = (state)=>state.shiftReducer.pageNo;
export const selectPerpage= (state)=>state.shiftReducer.perpage;
export default ShiftSlice.reducer;