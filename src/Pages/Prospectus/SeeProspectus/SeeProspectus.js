import React from "react";
import Classes from "./SeeProspectus.module.css";

import { ReactComponent as Retry } from "../../../Assert/retry.svg";
import { ReactComponent as Trash } from "../../../Assert/trash.svg";
import InputAdd from "../../../Component/UI/inputAdd/inputAdd";
import Loading from "../../../Component/UI/Loading/Loading";

const SeeProspectus = props => {
  const mappedSubjects = props.prospectusHeaders
    .filter(v => {
      if (v === "") {
        return;
      }
      return v.header !== "";
    })
    .map(v => {
      return (
        <div className={Classes.Flex} key={v._id}>
          <div style={{ backgroundColor: "#fff" }}>{v.header}</div>
          <div onClick={props.deleteHeader.bind(this, v._id)} style={{ backgroundColor: "#fff" }}>
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
  //  checking all before showing mappedItems
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
    CHECKING = mappedSubjects;
  }

  // detecting when to show or not
  if (!props.show) {
    return null;
  }
  return (
    <>
      <div className={Classes.Cover}>
        {props.delMessage.length > 2 ? (
          <div className={Classes.promptStyle}>{props.delMessage}</div>
        ) : null}
        {props.loading ? (
          <Loading />
        ) : (
          <>
            <div className={Classes.SeeProspectus}>
              <div className={Classes.Subject}>{CHECKING}</div>
            </div>
            <InputAdd
              onSubmit={props.onSubmit}
              value={props.value}
              onChange={props.onChange.bind(this)}
              loading={props.loading}
              placeholder="Name"
              label="Add_New_Header"
            />
          </>
        )}
      </div>
    </>
  );
};
export default SeeProspectus;
