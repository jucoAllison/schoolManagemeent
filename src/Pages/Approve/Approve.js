import React from "react";
import Classes from "./Approve.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import SelectClass from './SelectClass/SelectClass';

const Approve = props => {
  // FOR GOING BACK
  const GobackHandler = () => {
    props.history.goBack();
  };

  return (
    <div className={Classes.Approve}>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Approve Result</div>
      <SelectClass />
    </div>
  );
};

export default Approve;
