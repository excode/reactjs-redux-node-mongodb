import { configureStore } from '@reduxjs/toolkit'
import invite  from '../slices/invite';
import company from '../slices/company';
import shift from '../slices/shift';
/*

combined all REDUCERS

COMPAY REDUCER has no usage 
*/
export const store = configureStore({
  reducer: {
      inviteReducer: invite,
      shiftReducer: shift,
      companyReducer:company
  },
  devTools: true,
});

export default store;