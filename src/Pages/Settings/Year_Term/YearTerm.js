import React from "react";
import Classes from "./YearTerm.module.css";

const YearTerm = props => {
  //  IN THIS COMPONENT IS ONLY FOR SETTING THE YEAR AND TERM
  //   it is to handle only get and post
  let CHECKING = null;
  if (props.yearmessage) {
    CHECKING = props.yearDetails;
  } else {
    CHECKING = null;
  }
  return (
    <div>
      {props.show ? (
        <div className={Classes.YearTerm}>
          <div
            style={{ display: props.yearmessage ? "block" : "none" }}
            className={Classes.Message}
          >
            {CHECKING}
          </div>
          <form
            onSubmit={props.submittingYear.bind(this)}
            className={Classes.From}
          >
            <div
              style={{ backgroundColor: "#fff" }}
              className={Classes.FormControls}
            >
              <label htmlFor="Passion_Year">YEAR</label>
              <input
                autoComplete={false}
                name="Passion_Year"
                required
                type="number"
                onChange={props.yearValueOnchange.bind(this)}
                value={props.yearValue}
              />
            </div>
            <button disabled={props.yearloading ? true : false}>
              {props.yearloading ? "..." : "Post"}
            </button>
          </form>
          <form
            onSubmit={props.submittingTerm.bind(this)}
            className={Classes.From}
          >
            <div
              style={{ backgroundColor: "#fff" }}
              className={Classes.FormControls}
            >
              <label htmlFor="Passion_Term">
                TERM: <span style={{ fontSize: "11px" }}>"1-2-3"</span>
              </label>
              <input
                autoComplete={false}
                value={props.loading ? "..." : props.termValue}
                onChange={props.termValueOnchange.bind(this)}
                name="Passion_Term"
                required
                type="text"
              />
            </div>
            <button disabled={props.termLoading ? true : false}>
              {props.termLoading ? "..." : "Post"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default YearTerm;
