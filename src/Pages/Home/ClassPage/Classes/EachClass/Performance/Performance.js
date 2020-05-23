import React from "react";
import Classes from "./Performance.module.css";
import GetPerformance from "./GetPerformance/GetPerformance";
import AddPerfromance from "./GetPerformance/AddPerformance/AddPerformance";
import Context from "../../../../../../Component/Context/Context";
import HomeContext from "../../../../../../Component/Context/HomeContext";

const Performance = props => {
  const HomeCTX = React.useContext(HomeContext)
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [performance, setPerformance] = React.useState([
    { _id: "", performance: "" }
  ]);

  const showPerformance = () => {
    props.closePerCom();
    setShow(!show);
    setLoading(true);
    setMessage(false);
    setErr(false);
    fetch(`http://localhost:2222/admin/performance/${HomeCTX.selectingClassClasses._id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        if (res.result.length > 0) {
          setPerformance(res.result);
        } else {
          setPerformance([{ _id: "", performance: "" }]);
          setMessage(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setMessage(false);
        setErr(true);
      });
  };

  // EVERTHING ABOUT POSTING NEW perFORmaNcE AND PUSHING IT TO THE ARRAY IN performance setLoading to true in other to change to ... WHEN loading
  const [value, setValue] = React.useState("");

  const onChange = e => {
    setValue(e.target.value);
  };

  // Submitting Form  ---- POST REQUEST
  const onSubmit = e => {
    setMessage(false);
    setLoading(true);
    e.preventDefault();
    fetch(`http://localhost:2222/admin/performance/${HomeCTX.selectingClassClasses._id}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        performance: value
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setMessage(false);
        setValue("");
        const spread = [...performance];
        spread.push(res.result);
        let Check = spread.filter(v => {
          return v._id !== "";
        });
        setPerformance(Check);
      })
      .catch(err => {
        setLoading(false);
        alert("Oops an Error Occured Check Your Internet");
      });
  };

  // after deleting now filltering list
  const FillterPERFORMANCE = res => {
    const spread = [...performance];
    let filterAll = spread.filter(v => v._id !== res._id);
    setPerformance(filterAll);
  };

  return (
    <div className={Classes.Performance}>
      <div onClick={showPerformance} className={Classes.Jects}>
        <h4>Performance</h4>
      </div>
      <>
        {!props.performanceCom ? (
          <div className={Classes.PerformanceCarrier}>
            <GetPerformance
              performance={performance}
              loading={loading}
              err={err}
              message={message}
              GetAllPerformance={FillterPERFORMANCE.bind(this)}
            />
            <AddPerfromance
              onSubmit={onSubmit}
              value={value}
              onChange={onChange.bind(this)}
              loading={loading}
            />
          </div>
        ) : null}
      </>
    </div>
  );
};
export default Performance;
