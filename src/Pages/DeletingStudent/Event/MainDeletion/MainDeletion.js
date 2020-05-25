import React from "react";
import Loading from "../../../../Component/UI/Loading/Loading";
import { ReactComponent as Trash } from "../../../../Assert/trash.svg";
import { ReactComponent as Retry } from "../../../../Assert/retry.svg";
import Classes from "./MainDeletion.module.css";

const MainDeletion = props => {

  const Mapped = 

  let CHECKING;
  if (props.loading) {
    CHECKING = (
      <div style={{ width: "500px", margin: "auto" }}>
        <Loading />
      </div>
    );
  } else if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.getAllCalendar}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  }else{
      CHECKING = "HELLO WORLD"
  }

  return <div className={Classes.Griding}>{CHECKING}</div>;
};

export default MainDeletion;
