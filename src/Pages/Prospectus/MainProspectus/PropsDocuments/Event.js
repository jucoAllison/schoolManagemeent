import React from "react";
import PropsDocuments from "./PropsDocuments";
import Context from "../../../../Component/Context/Context";
import Classes from "./PropsDocuments.module.css";

const Event = props => {
  const CTX = React.useContext(Context);
  const [loading, setloading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [requirement, setRequirement] = React.useState([
    { _id: "", requirement: "" }
  ]);
  const [showReq, setShowReq] = React.useState(false);

  const getEachClassRequirements = () => {
    if (loading) {
      return;
    }
    setShowReq(!showReq);
    setloading(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/requirement/${props.getclass[0]._id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setloading(false);
        setErr(false);
        if (res.Message) {
          setMessage(res.Message);
        }
        setRequirement(res.result);
      })
      .catch(err => {
        setErr(true);
        setloading(false);
      });
  };

  const [inputValue, setInputValue] = React.useState("");
  const onChangeHandler = e => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (inputValue.length < 2) {
      return;
    }
    setloading(true);
    fetch(`http://localhost:2222/admin/requirement/${props.getclass[0]._id}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        requirement: inputValue
      })
    })
      .then(res => res.json())
      .then(res => {
        setloading(false);
        setInputValue("");
        let spread = [...requirement];
        spread.push(res.result);
        setMessage("");
        setRequirement(spread);
      })
      .catch(err => {
        setloading(false);
        alert("Check Internet Connection and Continue");
      });
  };

  // done with posting now at deleting any clicked Requirement
  const deleteRequirementHandler = id => {
      setloading(true)
    fetch(`http://localhost:2222/admin/requirement/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      })
        .then(res => res.json())
        .then(res => {
            setloading(false);
            if(res.Message === "Ok"){
                let spread = [...requirement]
                let Check = spread.filter(v => {
                    return v._id !== id
                })
                setRequirement(Check)
            }
        })
        .catch(err => {
          setloading(false);
          alert("Check Internet Connection and Continue");
        });
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#fff" }}
        className={Classes.PropsDocuments}
      >
        <h5
          onClick={getEachClassRequirements}
          style={{ backgroundColor: "#fff" }}
        >
          Requirements
        </h5>
      </div>
      <PropsDocuments
        loading={loading}
        err={err}
        requirement={requirement}
        message={message}
        showReq={showReq}
        deleteRequirement={deleteRequirementHandler}
        // Everthing about adding new Requirement
        onChange={onChangeHandler}
        value={inputValue}
        onSubmit={onSubmitHandler}
      />
    </>
  );
};

export default Event;
