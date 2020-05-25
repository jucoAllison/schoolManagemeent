import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Event from "./Event/Event";

const DeletingStudent = (props) => {
  // FOR GOING BACK
  const GobackHandler = () => {
    props.history.goBack();
  };
  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Deleting Student</div>
      <Event />
    </div>
  );
};

export default DeletingStudent;
