import React from "react";
import Classes from "./Props.module.css";
import Events from "../PropsDocuments/Event";
import Loading from "../../../../Component/UI/Loading/Loading";

import { ReactComponent as Retry } from "../../../../Assert/retry.svg";

const Props = props => {
  const yy = props.request
    .filter(v => {
      return v.header_name !== "";
    })
    .map((v, i) => {
      return (
        <div
          style={{ backgroundColor: "#fff" }}
          className={Classes.SUB}
          key={v._id}
        >
          {v.header_name}
          <div style={{ backgroundColor: "#fff" }}>
            <input
              onChange={props.onChangeHandler.bind(this, i)}
              value={v.value}
              name={v.header_name}
              type="number"
            />{" "}
          </div>
        </div>
      );
    });

  let CHECKING;
  if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.getEachClassFeeSchedule}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else {
    CHECKING = yy;
  }

  if (props.getclass.length < 1) {
    return null;
  }
  return (
    <div className={Classes.Props}>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={props.submitNewFeeSchedule}
            style={{ backgroundColor: "inherit" }}
          >
            {CHECKING}
            <button disable={props.loading ? "true" : "false"}>Send</button>
          </form>
          <Events getclass={props.getclass} />
        </>
      )}
    </div>
  );
};

export default Props;
