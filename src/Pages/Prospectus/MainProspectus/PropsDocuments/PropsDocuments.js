import React from "react";
import InputAdd from "../../../../Component/UI/inputAdd/inputAdd";
import Classes from "./PropsDocuments.module.css";

import { ReactComponent as Trash } from "../../../../Assert/trash.svg";
import { ReactComponent as Retry } from "../../../../Assert/retry.svg";
import Loading from "../../../../Component/UI/Loading/Loading";

const PropsDocuments = props => {
  const yy = props.requirement
    .filter(v => {
      if (v == "") {
        return;
      }
      return v._id !== "";
    })
    .map(v => {
      return (
        <div
          key={v._id}
          className={Classes.Flex}
          style={{ backgroundColor: "inherit" }}
        >
          <div style={{ backgroundColor: "#fff" }} className={Classes.SUB}>
            {v.requirement}
          </div>
          <div
            onClick={props.deleteRequirement.bind(this, v._id)}
            style={{ backgroundColor: "#fff" }}
          >
            <Trash
              style={{ backgroundColor: "#fff" }}
              width="19"
              height="19"
              fill="#198dfb"
            />
          </div>
        </div>
      );
    });

  let CHECKING;
  if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.ProspectusHandler}>
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

  if (props.loading) {
    return null;
  }
  return (
    <>
      {props.showReq ? (
        <div
          style={{ backgroundColor: "#fff" }}
          className={Classes.PropsDocuments}
        >
          {props.message.length > 2 ? (
            <div className={Classes.promptStyle}>{props.message}</div>
          ) : null}
          {props.loading ? (
            <Loading />
          ) : (
            <>
              <div
                className={Classes.Grid2}
                style={{ backgroundColor: "#fff" }}
              >
                {CHECKING}
              </div>
              <InputAdd
                onSubmit={props.onSubmit}
                value={props.value}
                onChange={props.onChange.bind(this)}
                loading={props.loading}
                placeholder="Name"
                label="Add_New_Requirement"
              />
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default PropsDocuments;
