import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Event from "./Event/Event";
import HomeContext from "../../Component/Context/HomeContext";


const DeletingStudent = (props) => {
  const HomeCTX = React.useContext(HomeContext)
  // FOR GOING BACK
  const GobackHandler = () => {
    props.history.goBack();
  };
  let FULL_NAME = <div style={{textTransform: "capitalize", color: "#76848d"}}>{HomeCTX.deletingStudent.name}</div>
  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Deleting {FULL_NAME}</div>
      <Event />
    </div>
  );
};

export default DeletingStudent;
