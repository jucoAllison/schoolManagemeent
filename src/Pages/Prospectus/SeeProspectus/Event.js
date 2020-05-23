import React from "react";
import Classes from "./SeeProspectus.module.css";
import SeeProspectus from "./SeeProspectus";
import Context from "../../../Component/Context/Context";

const Event = () => {
  const CTX = React.useContext(Context);
  // this hook shows the mapped shows
  const [showSeeProspectus, setShowSeeProspectus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [delMessage, setDelMessage] = React.useState("");
  const [prospectusHeaders, setProspectusHeaders] = React.useState([{ _id: "", header: "" }]);

  const ProspectusHandler = () => {
    setShowSeeProspectus(!showSeeProspectus);
    setLoading(true);
    setErr(false);
    fetch("http://localhost:2222/admin/prospectus", {
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
        setProspectusHeaders(res.result);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  // Everthing about inputAdd and also the posting of new Prospectus_header
  // Everthing about inputAdd and also the posting of new Prospectus_header
  const [inputAddValue, setInputAddValue] = React.useState("")
  const inputAddOnChange = e => {
    setInputAddValue(e.target.value)
  }

  //  SUBMITTING NEW PROSPECTUS HEADER
  const onSubmitHandler = e => {
    e.preventDefault();
    setLoading(true);
    setErr(false);
    fetch("http://localhost:2222/admin/prospectus", {
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
        const spread = [...prospectusHeaders];
        spread.push(res.result);
        let Check = spread.filter(v => {
          return v._id !== "";
        });
        setProspectusHeaders(Check);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  }

  // ReQUEST FOR DELETING ANY CLICKED TRASH
  const deleteHeader = id => {
    setLoading(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/prospectus/${id}`, {
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
          let remove = prospectusHeaders.filter(v => {
          return v._id !== id;
          });
          setProspectusHeaders([...remove]);
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
    <div style={{ backgroundColor: "inherit" }}>
      <div className={Classes.SeePros}>
        <h4 onClick={ProspectusHandler}>See_Prospectus</h4>
      </div>
      <SeeProspectus
        show={showSeeProspectus}
        loading={loading}
        err={err}
        delMessage={delMessage}
        prospectusHeaders={prospectusHeaders}

        // for deleting any feeScheduleHeader
        deleteHeader={deleteHeader.bind(this)}


        // everything about inputAdd
        value={inputAddValue}
        onChange={inputAddOnChange}
        onSubmit={onSubmitHandler}
        // 
        ProspectusHandler={ProspectusHandler}
      />
    </div>
  );
};

export default Event;
