import React from "react";
// import Classes from "./SelectedApproval.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import ResultSheetEvent from './ResultSheet/Events';

const SelectedApproval = props=> {
  // FOR GOING BACK
  const GobackHandler = () => {
    props.history.goBack();
  };


  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Approve Result</div>
      <ResultSheetEvent resultID={props.match.params.id} Redirect={() => props.history.goBack()} />
    </div>
  );
};

export default SelectedApproval;
