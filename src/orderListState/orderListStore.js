import { createSlice } from '@reduxjs/toolkit';

export const orderListStore = createSlice({
    name: 'orderList',
    initialState: {
      value : [
        {id : 1,
        name : "shirt"
        },
        {id : 2,
          name : "shirt"
          },
          {id : 3,
            name : "shirt"
            },
            {id : 4,
              name : "shirt"
              },
              {id : 5,
                name : "shirt"
                },
                {id : 6,
                  name : "shirt"
                  },
                  {id : 7,
                    name : "shirt"
                    },
                    {id : 8,
                      name : "shirt"
                      }, {id : 9,
                        name : "shirt"
                        },
                        {id : 1,
                          name : "shirt"
                          }
      ],
      origList : []
    },
    reducers: {
      filterList: (state, action) => {
        let origValue = state.value;
        console.log(state.value)
        state.value= origValue.filter((obj)=> obj.id == action.payload.searchInput || obj.name == action.payload.searchInput)
      },
      getPageData: (state, action) => {     
        let {num, numberOfEntries, originalList} = action.payload 
        if(num > 0 && num < originalList.length){
          state.value = originalList.slice(0, (num * numberOfEntries) + 1 )
        }     
      },
      limitList: (state, action) => {      
        let {numberOfEntries, originalList} = action.payload;
        if(numberOfEntries > 0 && numberOfEntries < originalList.length){
          state.value = originalList.slice(0, numberOfEntries + 1 )
        }     
      },
      prev: (state, action) => {
        let {numberOfEntries, originalList} = action.payload
        let from = state.value[0].id;
        let to = state.value[state.value.length - 1].id;
        let newfrom = from - numberOfEntries; 
        let newto = to - numberOfEntries;
        if(newto > 0 && from > 0){
          state.value = originalList.slice(newfrom, newto + 1 )
        }
        
      },

      next: (state, action) => {
        let {numberOfEntries, originalList} = action.payload
        let from = state.value[0].id;
        let to = state.value[state.value.length - 1].id;
        let newfrom = from + numberOfEntries; 
        let newto = to + numberOfEntries;
        if(newto < originalList.length && from > originalList.length){
          state.value = originalList.slice(newfrom, newto + 1 )
        }
        
      },
      resetList:(state, originalList) =>{
        state.value = originalList
      }
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { filterList, limitList, prev, next, getPageData, resetList} = orderListStore.actions
  
  export default orderListStore.reducer