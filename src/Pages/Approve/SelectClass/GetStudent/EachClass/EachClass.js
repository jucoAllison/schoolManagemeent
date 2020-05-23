import React from "react";
import Classes from "./EachClass.module.css";
import { Link } from "react-router-dom";
import Approve_Context from "../../../../../Component/Context/Approval";

const EachClass = props => {
  const AppCTX = React.useContext(Approve_Context);

  const truee = props.students.filter(v => {
    return v.approved == true;
  });
  const falsee = props.students.filter(v => {
    return v.approved == false;
  });

  const trueee = truee
    .filter(v => {
      return v.full_name !== "";
    })
    .map(b => {
      return (
        <div style={{ backgroundColor: "#ffffff" }} key={b._id}>
          <Link
            style={{ textDecoration: "none" }}
            to={`/Approve_of_=>_/${b.full_name}/${b._id}`}
          >
            <div className={Classes.ApprovedTrue}>{b.full_name}</div>
          </Link>
        </div>
      );
    });

  const falseee = falsee
    .filter(v => {
      return v.full_name !== "";
    })
    .map(b => {
      return (
        <div style={{ backgroundColor: "#ffffff" }} key={b._id}>
          <Link
            className={Classes.cover}
            style={{ textDecoration: "none" }}
            to={`/Approve_of_=>_/${b.full_name}/${b._id}`}
          >
            <div className={Classes.ApprovedFalse}>{b.full_name}</div>
          </Link>
        </div>
      );
    });

  return (
    <>
      {AppCTX.termID === null ? null : (
        <div className={Classes.Aprove}>
          <h5>{AppCTX.namee}</h5>
          <div className={Classes.ApprovedHeaderSection}>
            <h5>Pending</h5>
            <h5>Approved</h5>
          </div>
          <div
            style={{ display: props.writting.length > 0 ? "block" : "none" }}
            className={Classes.Message}
          >
            {props.writting}
          </div>
            
          <div style={{ visibility: props.writting.length > 0 ? "hidden" : "visible" }} className={Classes.cover}>
            <div>{falseee}</div>
            <div>{trueee}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EachClass;
