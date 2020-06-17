import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import EventDetails from "./Details/EventDetails";
const Record = props => {
  // FOR GOING BACK
  const GobackHandler = () => {
    props.history.goBack();
  };

  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />
      <EventDetails />
    </div>
  );
};

export default Record;
