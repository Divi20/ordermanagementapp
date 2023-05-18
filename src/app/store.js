import { configureStore } from '@reduxjs/toolkit'
import orderListState from '../orderListState/orderListStore.js'
export default configureStore({
  reducer: {
    orderList : orderListState
  },
})