import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../util/api'

// First, create the thunk
export const fetchInvite= createAsyncThunk(
  'Invite/fetch',
  async (data) => {
    var queryString =data!=undefined? Object.keys(data).map(key => key + '=' + data[key]).join('&'):''; 
    const response = await api('/invite?'+queryString,'get',DataTransferItem);
    return response.data
  }
);

export const AddInvite= createAsyncThunk(
    'Invite/add',
    async (data) => {
      const response = await api('/invite','post',data);
      console.log(response.data)
      return response.data;
    }
  );

  export const updateInvite= createAsyncThunk(
    'Invite/update',
    async (data,id) => {
      const response = await api('/invite/'+id,'patch',data);
      return response.data;
    }
  );
  export const deleteInvite= createAsyncThunk(
    'Invite/delete',
    async (id) => {
      const response = await api('/invite/'+id,'delete');
      return id;
    }
  );
  export const initialState = {
  entities: [],
  loading: false,
  pageNo:0,
  totalPages:0
} 

// Then, handle actions in your reducers:
const InviteSlice = createSlice({
  name: 'Invite',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchInvite.fulfilled, (state, action) => {
      state.entities = action.payload.docs;
      state.pageNo =  action.payload.page;
      state.total =  action.payload.count;
      state.perpage =action.payload.perpage;
      state.loading =false
    })
    .addCase(fetchInvite.pending, (state) => {
        state.loading =true
    })
    .addCase(AddInvite.fulfilled, (state, action) => {
      // Add  the  ITEM in  state
      // no need to call API and fetch from remote
       state.entities = [ action.payload,...state.entities];
      // console.log(state.entities);
        state.loading =false;
    })
    .addCase(AddInvite.pending, (state) => {
        state.loading =true;
    })
    .addCase(updateInvite.fulfilled, (state, action) => {
        var itemIndex = state.entities.findIndex(x => x._id == action.payload._id);
        state.entities[itemIndex] = action.payload;
        state.loading =false;
    })
    .addCase(updateInvite.pending, (state) => {
        state.loading =true;
    })
    .addCase(deleteInvite.fulfilled, (state, action) => {
        // Remove  the  ITEM From state
        // no need to call API and fetch from remote
        state.entities =state.entities.filter(e=>e._id!=action.payload)
        state.loading =false;
     })
    .addCase(deleteInvite.pending, (state) => {
        state.loading =true;
    })
  },
})
export const selectInvites = (state)=>state.inviteReducer.entities;
export const selectInviteLoading = (state)=>state.inviteReducer.loading;
export const selectInviteTotal = (state)=>state.inviteReducer.total;
export const selectInvitePageNo = (state)=>state.inviteReducer.pageNo;
export const selectIntivePerpage= (state)=>state.inviteReducer.perpage;
//export const { setCurrentPage } = ShiftSlice.actions;
export default InviteSlice.reducer;