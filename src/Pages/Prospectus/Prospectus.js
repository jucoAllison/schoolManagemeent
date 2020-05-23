import React from "react";
import Classes from "./Prospectus.module.css";
import EventSeeProspectus from "./SeeProspectus/Event";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import ChangePros from "./MainProspectus/ChangePros";

const Prospectus = props => {
  const GobackHandler = () => {
    props.history.goBack();
  };

  const [showChangeProspectus, setShowChangeProspectus] = React.useState(false);
  const showChangeProspectusHandler = () => {
    setShowChangeProspectus(!showChangeProspectus);
  };
  return (
    <div className={Classes.Prospectus}>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Prospectus</div>
      <EventSeeProspectus />
      
      <div className={Classes.ChangePros}>
        <h4 onClick={showChangeProspectusHandler}>Change_Prospectus</h4>
      </div>
        <ChangePros show={showChangeProspectus} />
    </div>
  );
};
export default Prospectus;
