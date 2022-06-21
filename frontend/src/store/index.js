import { configureStore } from '@reduxjs/toolkit'
import invite  from '../slices/invite';
import company from '../slices/company';
import shift from '../slices/shift';
export const store = configureStore({
  reducer: {
      inviteReducer: invite,
      shiftReducer: shift,
      companyReducer:company
  },
  devTools: true,
});

export default store;