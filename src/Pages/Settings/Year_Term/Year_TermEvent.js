import React from "react";
import YearTerm from "./YearTerm";
import Context from "../../../Component/Context/Context";

const Year_TermEvent = props => {
  const CTX = React.useContext(Context);
  const [yearValue, setYearValue] = React.useState(CTX.yearValue === undefined ? "" : CTX.yearValue.year);
  const [yearloading, setYearLoading] = React.useState(false);
  const [yearmessage, setYearMessage] = React.useState(false);
  const [yearDetails, setYearDetails] = React.useState("");
  const [termValue, setTermValue] = React.useState(CTX.termValue === undefined ? "" : CTX.termValue.term);
  const [termLoading, setTermLoading] = React.useState(false);

  // changing the value of yearValue with onChange
  const yearValueOnchange = e => {
    setYearValue(e.target.value);
  };
  const termValueOnchange = e => {
    setTermValue(e.target.value);
  };
  // posting the year or the new year
  const postYear = e => {
    e.preventDefault();
    setYearMessage(false);
    setYearLoading(true);
    fetch("http://localhost:2222/admin/latest_year", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        year: +yearValue
      })
    })
      .then(res => res.json())
      .then(res => {
        setYearLoading(false);
        if (res.Message) {
          setYearMessage(true);
          setYearDetails(res.Message);
        } else {
        }
      })
      .catch(err => {
        setYearMessage(true);
        setYearDetails("Check Your Internet");
        setYearLoading(false);
      });
  };
  // posting the new TERM of the nre term
  const postTerm = e => {
    e.preventDefault();
    setYearMessage(false);
    setTermLoading(true);
    fetch("http://localhost:2222/admin/latest_term", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        term: termValue
      })
    })
      .then(res => res.json())
      .then(res => {
        setTermLoading(false);
        if (res.Message) {
          setYearMessage(true);
          setYearDetails(res.Message);
        } else {
        }
      })
      .catch(err => {
        setYearMessage(true);
        setYearDetails("Check Your Internet");
        setTermLoading(false);
      });
  };
  return (
    <div>
      <YearTerm
        show={props.show}
        // year onSubmitting, onChange, and value
        submittingYear={postYear}
        yearValueOnchange={yearValueOnchange}
        yearValue={yearValue}
        // response gotten from POSTING
        yearloading={yearloading}
        yearmessage={yearmessage}
        yearDetails={yearDetails}
        // for TErm       
        termValue={termValue}
        termValueOnchange={termValueOnchange}
        termLoading={termLoading}
        submittingTerm={postTerm}
      />
    </div>
  );
};

export default Year_TermEvent;
