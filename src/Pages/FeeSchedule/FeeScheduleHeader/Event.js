import React from "react";
import FeeScheduleHeader from "./FeeScheduleHeader";
import Classes from "./FeeScheduleHeader.module.css";
import Context from "../../../Component/Context/Context";

const Event = props => {
  const CTX = React.useContext(Context);
  const [feeScheduleHeader, setFeeScheduleHeader] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [delMessage, setDelMessage] = React.useState("")
  const [feeHeaders, setFeeHeaders] = React.useState([{ _id: "", header: "" }]);
  const feeScheduleHeaderHandler = () => {
    setFeeScheduleHeader(!feeScheduleHeader);
    setLoading(true);
    setErr(false);
    fetch("http://localhost:2222/admin/fee_schedule", {
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
        if (res.Message) {
          setDelMessage(res.Message);
        }
        setFeeHeaders(res.result);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  // Everthing about inputAdd and also the posting of new fee_Schedule_header
  const [inputAddValue, setInputAddValue] = React.useState("")
  const inputAddOnChange = e => {
    setInputAddValue(e.target.value)
  }
  //  Submitting new feeSceduleHeader
  const onSubmitHandler = e => {
    e.preventDefault();
    setLoading(true);
    setErr(false);
    fetch("http://localhost:2222/admin/fee_schedule", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        header: inputAddValue
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        setInputAddValue("");
          setDelMessage("")
        const spread = [...feeHeaders];
        spread.push(res.result);
        let Check = spread.filter(v => {
          return v._id !== "";
        });
        setFeeHeaders(Check);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  }

  // ReQUEST FOR DELETING AND CLICKED TRASH
  const deleteHeader = id => {
    setLoading(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/fee_schedule/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        if(res.Message === "Ok"){
          let remove = feeHeaders.filter(v => {
          return v._id !== id;
          });
          setFeeHeaders([...remove]);
        }else{
          setDelMessage(res.Message)
        }
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  }
  return (
    <div>
      <div className={Classes.SeePros}>
        <h4 onClick={feeScheduleHeaderHandler}>Fee_Schedule_Header</h4>
      </div>
      <FeeScheduleHeader
        show={feeScheduleHeader}
        feeHeader={feeHeaders}
        loading={loading}
        err={err}
        delMessage={delMessage}
        getFeeScheduleHeaders={feeScheduleHeaderHandler}

        // for deleting any feeScheduleHeader
        deleteHeader={deleteHeader.bind(this)}

        // this properties are for inputADD
        onChange={inputAddOnChange}
        value={inputAddValue}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default Event;
