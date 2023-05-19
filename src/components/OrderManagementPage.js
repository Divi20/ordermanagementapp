import { useSelector, useDispatch } from 'react-redux';
import { filterList, limitList, prev, next, getPageData, resetList } from '../orderListState/orderListStore'
import { useEffect, useState } from 'react';
export default function OrderManagementPage(){
    const orderList = useSelector((state) => state.orderList.value);
    const dispatch = useDispatch();
    const [noOfPages, setNoOfPage] = useState([]);
    const [noOfEntries, setNoOfEntries] = useState(5);
    const [originalList, setOrig]  = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');

    useEffect(()=>{
      getPaginationValues()
      setOrig(originalList);
    }, [])

    const resetFn = () =>{
       dispatch(resetList({originalList : originalList}));
        setSearchInput('');
        getPaginationValues();
    }

    const getPaginationValues = () => {
        console.log("called")
        let orderLen = orderList.length;
        let noPage = Math.ceil(orderLen / noOfEntries);
        let pageList = [];
        for(let i = 1; i <= noPage; i ++){
         pageList.push(i);
        }
        setNoOfPage([...pageList])
    }

    const getPaginatedValueBasedonEntries = (e) =>{
        setNoOfEntries(() => e.target.value);
        dispatch(limitList({noOfEntries: e.target.value, originallits : originalList}));
        getPaginationValues()
    }

    const handleSearchInput = (e) =>{
        setSearchInput(e.target.value)
        dispatch(filterList({searchInput : e.target.value, originalList : originalList}))
    }
  
    return (
        <div className='container mt-5'>
          <div className='row mb-5'>
            <div style={{display:'flex', flexDirection : 'row'}}>
            <input
            style={{width : "30%"}}
            className='form-control'
            type = "text"
            placeholder="search"
              aria-label="Search"
              onInput={(e) => handleSearchInput(e)}
            >
              
            </input>
            
            <button
            aria-label="Decrement value"
            onClick={() => dispatch(filterList({ searchInput : searchInput , orderList : orderList, }))}
            type='button'
            className='btn btn-primary mx-2'
          >
            Filter
          </button>
            <button
            type='button'
            className='btn btn-primary mx-2'
              aria-label="Decrement value"
              onClick={() => resetFn()}
            >
              Reset
            </button>
            </div>
     
            </div>
            <table className="table table-striped">
          <thead className='thead-dark'>
          <th>Order Id</th>
          <th>Vendor Name</th>
         <th>Pickup Date</th>
          <th>Status</th>
          </thead>
        <tbody>
        {orderList && orderList.map((orderItem, index) =>(
            <tr key={index}>
            <td>{orderItem.id}</td>
            <td>{orderItem.name}</td>
            <td></td>
            <td></td>
            </tr>

    ))}
        </tbody>
           
          
            </table>
            <div className='card'>
            <div style={{display:"flex", flexDirection:"row", padding:"1%"}}>
          <div>
          <select onChange={(e) => getPaginatedValueBasedonEntries(e)}    className='form-control' title='Select no of entries'>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          </select>
          </div>
           <div style={{ marginLeft: "auto"}}>

        <button
        aria-label="Decrement value"
        onClick={() => dispatch(prev({noOfEntries : noOfEntries, originalList : originalList}))}
        type='button'
        className='btn btn-primary mx-2 btn-sm'
      >
  Prev
      </button>

      {noOfPages && noOfPages.map((num)=>{
        return <span onClick={() => dispatch(getPageData({num : num, noOfEntries :noOfEntries, originalList : originalList}))} className='mx-1' style={{width : '50px', height : '50px', borderRadius : '2%', backgroundColor : "#eee", padding:"2%"}}>{num}</span>
    })}
        <button
        type='button'
        className='btn btn-primary mx-2 btn-sm'
          aria-label="Decrement value"
          onClick={() => dispatch(limitList({orderList : orderList, noOfEntries : noOfEntries, originalList : orderList}))}
        >
          Next
        </button>
           </div>
           
            </div>
          </div>
          
        </div>
      )
}