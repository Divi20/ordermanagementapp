import { useSelector, useDispatch } from "react-redux";
import {
  filterList,
  prev,
  next,
  getPageData,
  resetList,
} from "../orderListState/orderListStore";
import { useEffect, useState } from "react";
export default function OrderManagementPage() {
  const orderList = useSelector((state) => state.orderList.origListOnPage);
  const orderListFiltered = useSelector((state) => state.orderList.value);
  const dispatch = useDispatch();
  const [noOfPages, setNoOfPage] = useState([]);
  const [noOfEntries, setNoOfEntries] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getPaginatedValueBasedonEntries(5, 1);
  }, []);

  const resetFn = () => {
    dispatch(resetList());
    setSearchInput("");
    setCurrentPage(1);
    getPaginationValues();
  };

  useEffect(() => {
    getPaginationValues();
  }, [orderListFiltered]);

  const getPaginationValues = () => {
    let orderLen = orderListFiltered.length;
    let noPage = Math.ceil(orderLen / noOfEntries);
    let pageList = [];
    for (let i = 1; i <= noPage; i++) {
      pageList.push(i);
    }

    setNoOfPage([...pageList]);
  };

  const getPaginatedValueBasedonEntries = (noOfEnt, page) => {
    setNoOfEntries(() => noOfEnt);
    setCurrentPage(page);
    dispatch(getPageData({ num: noOfEnt, currentPage: page }));
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    dispatch(
      filterList({ searchInput: e.target.value, noOfEntries: noOfEntries })
    );
  };

  const getFilteredData = () => {
    dispatch(
      filterList({ searchInput: searchInput, noOfEntries: noOfEntries })
    );
  };

  const handleCurrentPage = (action) => {
    if (action == "pre") {
      setCurrentPage(parseInt(currentPage) - 1);
      getPaginatedValueBasedonEntries(
        parseInt(noOfEntries),
        parseInt(currentPage) - 1
      );
    }

    if (action == "next") {
      setCurrentPage(parseInt(currentPage) + 1);

      getPaginatedValueBasedonEntries(
        parseInt(noOfEntries),
        parseInt(currentPage) + 1
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            style={{ width: "30%" }}
            className="form-control"
            type="text"
            placeholder="search"
            aria-label="Search"
            onInput={(e) => handleSearchInput(e)}
          ></input>

          <button
            aria-label="Decrement value"
            onClick={() => getFilteredData}
            type="button"
            className="btn btn-primary mx-2"
          >
            Filter
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            aria-label="Decrement value"
            onClick={() => resetFn()}
          >
            Reset
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Order Id</th>
            <th>Vendor Name</th>
            <th>Pickup Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderList &&
            orderList.map((orderItem, index) => (
              <tr key={index}>
                <td>{orderItem.orderId}</td>
                <td>{orderItem.vendorName}</td>
                <td>{orderItem.pickupDate}</td>
                <td>{orderItem.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="card">
        <div style={{ display: "flex", flexDirection: "row", padding: "1%" }}>
          <div>
            <select
              onChange={(e) =>
                getPaginatedValueBasedonEntries(parseInt(e.target.value), 1)
              }
              className="form-control"
              title="Select no of entries"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div style={{ marginLeft: "auto", width: "20%" }}>
            {currentPage > 1 && (
              <button
                aria-label="Decrement value"
                onClick={() => handleCurrentPage("pre")}
                type="button"
                className="btn btn-primary mx-2 btn-sm"
              >
                Prev
              </button>
            )}

            {noOfPages &&
              noOfPages.map((num) => {
                return (
                  <span
                    onClick={() =>
                      getPaginatedValueBasedonEntries(noOfEntries, num)
                    }
                    className="mx-1"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "2%",
                      backgroundColor:
                        currentPage == num ? "#0d6efd" : "#6e6e6e",
                      padding: "2% 8%",
                    }}
                  >
                    {num}
                  </span>
                );
              })}
            {currentPage < noOfPages.length && (
              <button
                type="button"
                className="btn btn-primary mx-2 btn-sm"
                aria-label="Decrement value"
                onClick={() => handleCurrentPage("next")}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
