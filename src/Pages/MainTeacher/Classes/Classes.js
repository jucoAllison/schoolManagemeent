import React from "react";
import Context from "../../../Component/Context/Context";
import Loading from "../../../Component/UI/Loading/Loading";
import Class from "./Classes.module.css"
import AssignClass from "./AssignClass/AssignClass";
import { Redirect } from "react-router-dom";

const Classes = props => {
  const CTX = React.useContext(Context);
  const [allClasses, setAllClasses] = React.useState([
    { className: "", _id: "" }
  ]);
  const [loading, setLoading] = React.useState(false);

  // this hooks causes the redirect
  const [redirect, setRedirect] = React.useState(false);
  const getAllClasses = () => {
    setRedirect(false);
    if (loading) {
      return;
    } else {
      setLoading(true);
      fetch("http://localhost:2222/admin/class", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      })
        .then(res => res.json())
        .then(res => {
          setLoading(false);
          setAllClasses(res.result);
        })
        .catch(err => {
          alert("Check Internet Connection and Continue");
          setLoading(false);
        });
    }
  };

  const [selectedClasses, setSelectedClasses] = React.useState([]);

  const onChangeHandler = (_id, className, spliceNum, e) => {
    // console.log(id, name ,e)
    
    let checking = selectedClasses.find(v => v.spliceNum === spliceNum)

    if(checking === undefined){
      let spread = [... selectedClasses]
      spread.push({_id, className, spliceNum})
      setSelectedClasses(spread)
    }else{
      let filterChecked = selectedClasses.filter(v => v.spliceNum !== spliceNum)
      setSelectedClasses(filterChecked)
    }
    
    
  };


  const allclass = allClasses
    .map((v, i) => {
      return (
        <div key={v._id} style={{ margin: "7px" }}>
          <input
            className={Class.inputt}
            onChange={onChangeHandler.bind(this, v._id, v.className, i)}
            type="checkbox"
          />
          {v.className}
        </div>
      );
    })
    .splice(11, 6);

  const [showAssign, setShowAssign] = React.useState(false);
  const getTheClasses = () => {
    setShowAssign(!showAssign);
  };

  return (
    <>
      {redirect ? <Redirect to="/Handle=>_teachers" /> : null}
      {!showAssign ? (
        <div style={{ textAlign: "center" }}>
          <div
            style={{ marginBottom: "30px", cursor: "pointer" }}
            onClick={getAllClasses}
          >
            Change Access
          </div>
          {allClasses.length > 2 ? (
            <div
              style={{
                backgroundColor: "inherit",
                fontSize: "12px",
                color: "#e72626",
                marginBottom: "8px"
              }}
            >
              {" "}
              Click on the box to choose any class{" "}
            </div>
          ) : null}
          {loading ? <Loading /> : (
            <div className={Class.DisplayGrid2fr}>
              {allclass}
            </div>
          )}
          {allClasses.length > 2 ? (
            <button
              style={{
                textAlign: "center",
                padding: ".4em",
                border: ".8px solid Black",
                backgroundColor: "inherit",
                margin: "20px 0px 20px 0px"
              }}
              onClick={getTheClasses}
            >
              Done
            </button>
          ) : null}
        </div>
      ) : (
        // <div onClick={getTheClasses}>&#x2190;</div>
        <AssignClass
          showAssign={showAssign}
          selectedClasses={selectedClasses}
          getTheClasses={getTheClasses}
          teacherID={props.teacherID}
          // Setting the redirect
          setredirect={() => setRedirect(true)}
        />
      )}
    </>
  );
};

export default Classes;