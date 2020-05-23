import React from "react";
import Classes from "./Select.module.css";

export const Value = props => {
  return (
    <div className={Classes.Value}>
      <div style={{ backgroundColor: "#fff" }} onClick={props.onClick}>
        {props.children}
      </div>
    </div>
  );
};

export const Select = ({
  loading,
  catchh,
  lable,
  height = "200px",
  children
  // catchErr
}) => {
  const [lablee, setLable] = React.useState(lable);
  const [show, setShow] = React.useState(false);

  const change = e => {
    if (e.target.innerHTML.length > 40) {
      return null;
    }
    setLable(e.target.innerHTML);
    setShow(false);
  };

  let CHECKING = null;
  if (show) {
    CHECKING = (
      <div>
        {catchh ? null : (
          <div
            onClick={change.bind(this)}
            style={{
              borderTop: show ? "none" : "2px solid #e72626",
              // display: show ? "block" : "none",
              height: loading ? "0px" : height,
              fontWeight: "bold"
            }}
            className={Classes.Selected}
          >
            <div className={Classes.Scroll}>{children}</div>
          </div>
        )}
      </div>
    );
  } else {
    CHECKING = null;
  }

  return (
    <div className={Classes.Select}>
      <div
        className={Classes.www}
        style={{
          backgroundColor: "#fff",
          borderBottom: show ? "none" : "2px solid #e72626"
        }}
        onClick={() => setShow(!show)}
      >
        {loading ? "..." : lablee} <span>&#x2190;</span>
      </div>
      {/* {show && props.children} */}
      {CHECKING}
    </div>
  );
};
