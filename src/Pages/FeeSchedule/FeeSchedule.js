import React from "react";
import Classes from "./FeeSchedule.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Event from "./FeeScheduleHeader/Event";
import MainFeeSchedule from "./MainFeeSchedule/MainFeeSchedule";

const FeeSchedule = props => {
  const GobackHandler = () => {
    props.history.goBack();
  };

  const [feeScheduleInput, setFeeScheduleInput] = React.useState(false);

  const feeScheduleInputHandler = () => {
    setFeeScheduleInput(!feeScheduleInput);
  };
  return (
    <div className={Classes.Prospectus}>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Fee Schedule</div>
      <Event />

      <div className={Classes.ChangePros}>
        <h4 onClick={feeScheduleInputHandler}>Change_Fee_Schedule</h4>
      </div>
      <MainFeeSchedule show={feeScheduleInput}/>
    </div>
  );
};

export default FeeSchedule;
