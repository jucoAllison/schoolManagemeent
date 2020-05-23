import React from "react";
import MappedHandleResult from "./MappedHandleResult/index";
import Classes from "./HandleResult.module.css";

const HandleResult = props => {
  let tranformedName = (
    <div style={{ textTransform: "uppercase" }}>{props.fullName + "_"}</div>
  );
  let CHECKING;
  if (!props.className && props.handleResult.length > 0) {
    CHECKING = (
      <div className={Classes.FlexCarier}>
        <div style={{ backgroundColor: "inherit" }}> {tranformedName} </div>
        <span> is not assigned to any class but have access to </span>{" "}
      </div>
    );
  } else if (props.className && props.handleResult.length < 1) {
    CHECKING = (
      <div className={Classes.FlexCarier}>
        <div style={{ backgroundColor: "inherit" }}>{tranformedName}</div>
        <span> is assigned to {props.className} only</span>
      </div>
    );
  } else if (!props.className && props.handleResult.length < 1) {
    CHECKING = (
      <div className={Classes.FlexCarier}>
        <div style={{ backgroundColor: "inherit" }}>{tranformedName}</div>
        <span> is not teaching and has access to null</span>
      </div>
    );
  } else {
    CHECKING = (
      <div className={Classes.FlexCarier}>
        <div style={{ backgroundColor: "inherit" }}>{tranformedName}</div>
        <span>is assigned to ${props.className} and also have access to</span>
      </div>
    );
  }

  return (
    <div className={Classes.Wrapper}>
      <div className={Classes.MappedHandle}>
        <div className={Classes.info}>{CHECKING}</div>
        <MappedHandleResult handleResult={props.handleResult} />
      </div>
    </div>
  );
};

export default HandleResult;

// {props.fullName} is assigned to {props.className} and also have access to
