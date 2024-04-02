import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import ReactDOM from "react-dom";
import UpointHook from "../Hooks/UpointHook";
import Report from "./Report";
import Userreport from "./Userreport";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo((props) => {
  const [searchID, setSearchID] = useState("");
  const [orderID, setOrderID] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [zar, setZar] = useState("");
  const [addPoint, setAddPoint] = useState("");
  const [added, setAdded] = useState("");
  const upointctx = useContext(UpointHook);

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent userData={props.userData} />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const get = () => {
    ReactDOM.render(
      <React.StrictMode>
        <List
          searchID={searchID}
          orderID={orderID}
          enteredDate={enteredDate}
          lastDate={lastDate}
          zar={zar}
          addPoint={addPoint}
          added={added}
        />
      </React.StrictMode>,
      document.getElementById("foobarOne")
    );
  };
  useEffect(() => {
    get();
  }, [searchID, orderID, lastDate, enteredDate, zar, addPoint, added]);

  return (
    <div>
      <div className="displayflex alignitemscenter"></div>
      <div className="row header">
        <div style={{ width: "120px" }}>
          <div>
            <span className="header">ID</span>
            <input
              type="text"
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "120px" }}>
          <div>
            <span className="header">user ID</span>
            <input
              type="text"
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "80px" }}>
          <div>
            <span className="header">Олгосон</span>
            <input
              type="text"
              value={added}
              onChange={(e) => setAdded(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "80px" }}>
          <div>
            <span className="header">Зарцуулсан</span>
            <input
              type="text"
              value={zar}
              onChange={(e) => setZar(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "180px" }}>
          <div>
            <span className="header">Олгосон огноо</span>
            <input
              type="date"
              value={enteredDate}
              onChange={(e) => setEnteredDate(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "180px" }}>
          <div>
            <span className="header">Зарцуулалт хийсэн огноо</span>
            <input
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {upointctx.reportSecond && <Report />}
      {upointctx.userreport && <Userreport />}
      <div id="foobarOne"></div>
    </div>
  );
}, areEqual);

export default Index;
