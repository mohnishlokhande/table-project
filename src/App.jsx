import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Table from "./component/table/Table";
import { useDebounce } from "./utils/helper";

const data = [
  { id: 1, fname: "mohnish", lname: "Lokhande", class: "9th", age: 16 },
  { id: 2, fname: "Check", lname: "Rakesh", class: "2th", age: 22 },
  { id: 3, fname: "John", lname: "lkkk", class: "10th", age: 26 },
  { id: 4, fname: "John", lname: "lkkk", class: "10th", age: 26 },
  { id: 5, fname: "John", lname: "lkkk", class: "10th", age: 26 },
  { id: 6, fname: "John", lname: "lkkk", class: "10th", age: 26 },
  { id: 7, fname: "John", lname: "lkkk", class: "10th", age: 26 },
  { id: 8, fname: "John", lname: "lkkk", class: "10th", age: 26 },
];

// Throttle function
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

function App() {
  const [search, setSearch] = useState("");

  const [limit] = useState(5);
  const [throttleValue, setThrottleValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [tableData, setTableData] = useState(
    data.slice(limit * offset, limit * offset + limit)
  );
  const debounceValue = useDebounce(search);

  // Throttle handler
  const handleThrottledChange = useCallback(
    throttle((value) => {
      console.log("Throttled:", value);
      setThrottleValue(value);
    }, 500),
    []
  );

  const onSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleThrottledChange(value);
  };

  useEffect(() => {
    let fileterData = data.filter((child) => {
      return (
        child.fname.toLowerCase().includes(debounceValue.toLowerCase()) ||
        child.lname.toLowerCase().includes(debounceValue.toLowerCase()) ||
        child.class.toLowerCase().includes(debounceValue.toLowerCase())
      );
    });
    setTableData(fileterData.slice(limit * offset, limit * offset + limit));
  }, [debounceValue, offset, limit]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2>My table</h2>
      <input value={search} onChange={onSearch} placeholder="Search..." />
      <div>{throttleValue}</div>
      <div>{debounceValue}</div>
      <Table data={tableData} setOffset={setOffset} />
    </div>
  );
}

export default App;
