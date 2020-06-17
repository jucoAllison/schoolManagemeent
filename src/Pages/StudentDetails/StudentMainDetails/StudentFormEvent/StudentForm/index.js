import React from "react";
import Classes from "./index.module.css";
import Loading from "../../../../../Component/UI/Loading/Loading";
import Graduate from "../Graduate/Index";
import Delete from "../Delete/Delete";
import Freeze from "../Freeze/Freeze";
import EventRecord from "../Record/Event";
import SecondStudentForm from "./SecondStudentForm";

import { ReactComponent as Retry } from "../../../../../Assert/retry.svg";
import { ReactComponent as Control } from "../../../../../Assert/controls.svg";

const StudentDetails = props => {
  // all this hooks are for helping the menu button with themodal
  const [showMenu, setShowMenu] = React.useState(false);
  const [showGraduate, setShowGraduate] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalFreeze, setShowModalFreeze] = React.useState(false);
  const [showModalRecord, setShowModalRecord] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onClickChangeClass = () => {
    setShowGraduate(!showGraduate);
    setShowMenu(false);
  };

  const onClickFreezeStudent = () => {
    setShowModalFreeze(true);
    setShowMenu(false);
  };

  const onClickDeleteStudent = () => {
    setShowModal(true);
    setShowMenu(false);
  };

  const onClickRecord = () => {
    setShowModalRecord(true);
    setShowMenu(false);
  };

  let CHECKING;
  if (props.loading) {
    CHECKING = (
      <div
        style={{
          width: "300px",
          margin: "auto",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Loading />
      </div>
    );
  } else if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.getEachStudent}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else {
    CHECKING = (
      <>
        <div className={Classes.TOleft} onClick={() => setShowMenu(!showMenu)}>
          <Control
            style={{ backgroundColor: "#fff", marginTop: "5px" }}
            width="33"
            height="33"
            fill="#454f51"
          />
        </div>
        <div
          style={{
            transform: showMenu ? "translateX(0)" : "translateX(-20%)",
            display: showMenu ? "block" : "none",
            opacity: showMenu ? "1" : "0"
          }}
          className={Classes.Sidedrawer}
        >
          <div>
            <div onClick={onClickChangeClass} className={Classes.Link}>
              {!showGraduate ? "Change Class" : `${props.full_name} details`}
            </div>
            <div onClick={onClickFreezeStudent} className={Classes.Link}>
              {props.freeze ? "Unfreeze Student" : "Freeze Student"}
            </div>
            <div onClick={onClickDeleteStudent} className={Classes.Link}>
              Delete Student
            </div>
            <div className={Classes.Link} onClick={onClickRecord}>
              Record Transaction
            </div>
          </div>
        </div>

        {showGraduate ? null : (
          <>
            <h4 style={{ backgroundColor: "#fff", color: "#454f51" }}>
              Student Details
            </h4>
            <SecondStudentForm
              onChange={props.onChange}
              full_name={props.full_name}
              state_of_origin={props.state_of_origin}
              lga={props.lga}
              age={props.age}
              sex={props.sex}
              dob={props.dob}
              phone={props.phone}
              parents_name={props.parents_name}
              parents_occupation={props.parents_occupation}
              religionValue={props.religionValue}
              church={props.church}
              emergency_name={props.emergency_name}
              emergency_phone={props.emergency_phone}
              emergency_address={props.emergency_address}
              emergency_relationship={props.emergency_relationship}
              submittingDetailsHandler={props.submittingDetailsHandler}
            />
          </>
        )}
      </>
    );
  }

  return (
    <div className={Classes.StudentDetails}>
      <div
        style={{ display: message.length < 3 ? "none" : "block" }}
        className={Classes.MessageFromBack}
      >
        {message}
      </div>
      <Freeze
        full_name={props.full_name}
        showModal={showModalFreeze}
        closeShowModal={() => setShowModalFreeze(false)}
        studentID={props.childID}
        reload={props.getEachStudent}
      />
      {CHECKING}
      <Delete
        full_name={props.full_name}
        showModal={showModal}
        closeShowModal={() => setShowModal(false)}
        studentID={props.childID}
      />
      <Graduate
        show={showGraduate}
        full_name={props.full_name}
        eachId={props.childID}
        setMessage={res => setMessage(res)}
      />
      <EventRecord
        full_name={props.full_name}
        showModal={showModalRecord}
        closeShowModal={() => setShowModalRecord(false)}
        studentID={props.childID}
        reload={props.getEachStudent}
      />
    </div>
  );
};

export default StudentDetails;
