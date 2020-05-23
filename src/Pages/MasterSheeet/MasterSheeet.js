import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Classes from "./MasterClass.module.css";
import SelectingClass from "./SelectingClass/SelectingClass";

const MasterSheeet = props => {
  const GobackHandler = () => {
    props.history.goBack();
  };
  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />

      <div style={{ textAlign: "center", margin: "40px 0px" }}>
        Master Sheeet
      </div>

      {/* SETTING UP THE DIV CONTAINER FOR THE SELECTIONS */}
      <div className={Classes.Select}>
        <SelectingClass />
        
      </div>
    </div>
  );
};

export default MasterSheeet;
