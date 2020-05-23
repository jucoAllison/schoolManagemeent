import React from "react";
import Classes from "./FeeScheduleHeader.module.css";
import { ReactComponent as Trash } from "../../../Assert/trash.svg";
import { ReactComponent as Retry } from "../../../Assert/retry.svg";
import Loading from "../../../Component/UI/Loading/Loading";
import InputAdd from "../../../Component/UI/inputAdd/inputAdd";

const FeeScheduleHeader = props => {
  const mappedSubjects = props.feeHeader
    .filter(v => {
      if(v === ""){
        return
      }
      return v.header !== "";
    })
    .map(v => {
      return (
        <div className={Classes.Flex} key={v._id}>
          <div style={{ backgroundColor: "inherit" }}>{v.header}</div>
          <div onClick={props.deleteHeader.bind(this, v._id)} style={{ backgroundColor: "inherit" }}>
            <Trash
              style={{ backgroundColor: "inherit" }}
              width="19"
              height="19"
              fill="#198dfb"
            />
          </div>
        </div>
      );
    });
  if (!props.show) {
    return null;
  }
  let CHECKING;
  if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.getFeeScheduleHeaders}>
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
  return (
    <div className={Classes.FeeScheduleHeader}>
      <div className={Classes.Cover}>
      {props.delMessage.length > 2 ?<div className={Classes.promptStyle}>{ props.delMessage }</div>: null}
        {props.show ? (
          <div className={Classes.SeeProspectus}>
            {props.loading ? <Loading />: <div className={Classes.Subject}>{CHECKING}</div>}
            <InputAdd
              onSubmit={props.onSubmit}
              value={props.value}
              onChange={props.onChange.bind(this)}
              loading={props.loading}
              placeholder="Name"
              label="Add_New_Header"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default FeeScheduleHeader;
