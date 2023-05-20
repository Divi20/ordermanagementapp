import { createSlice } from '@reduxjs/toolkit';
import orders from './orders.json'

export const orderListStore = createSlice({
    name: 'orderList',
    initialState: {
      value : [...orders.orders],
      origList : [...orders.orders],
      origListOnPage : []
      
    },
    reducers: {
      filterList: (state, action) => {
        let origValue = [...state.origList];
        let filteredList = origValue.filter((obj)=> obj.orderId.includes(action.payload.searchInput) || obj.vendorName.includes(action.payload.searchInput) || obj.pickupDate.includes(action.payload.searchInput) || obj.status.includes(action.payload.searchInput));
        
        let newOrderList  = filteredList.slice(0, 5);
        
        return {
          ...state,
         value : filteredList.length > 0 ? [...filteredList] : [],
         origListOnPage : [...newOrderList]
        };
      },

      getPageData: (state, action) => {     
        let {num, currentPage} = action.payload 
        let origValue = [...state.origList];
        state.origListOnPage = origValue.slice(num * (currentPage - 1), (num * currentPage) )
      },
   
      resetList:(state) =>{
        let origValue = [...state.origList];
        let newOrderList  = origValue.slice(0,5);  
        return {
          ...state,
         value : [...origValue],
         origListOnPage : [...newOrderList]
        };
      }
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { filterList, prev, next, getPageData, resetList} = orderListStore.actions
  
  export default orderListStore.reducer