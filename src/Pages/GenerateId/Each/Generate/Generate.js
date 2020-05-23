import React from "react";
import Classes from "./Generate.module.css";
import UUID from "uuid";


import { ReactComponent as Good } from "../../../../Assert/checked.svg";
import Confirm from "./Confirm/Confirm";

const Generate = props => {
  // this is responsible for generating random 17 numbers
  let v = UUID.v4(3);
  let j = v.split("").splice(0, 17);

  const [showModal, setShowModal] = React.useState(false);
  const id = props.id;

  return (
    <>
      <div style={{ backgroundColor: "#fff" }} className={Classes.Generate}>
        <div style={{ backgroundColor: "#fff" }}>{props.fullName}</div>
        <div style={{ backgroundColor: "#fff" }} className={Classes.UserName}>
          {props.gen ? j : props.log_id}
        </div>
        <div style={{ backgroundColor: "#fff" }} className={Classes.Password}>
          {props.gen ? j : props.password}
        </div>

        {/* #important whenever this "div" is Clicked, it GENERATES RANDOM UUID ie j and pass it on as props  to <Confirm /> as id */}
        <div
          onClick={() => setShowModal(true)}
          className={Classes.buttonChange}
        >
          Change
        </div>
      </div>
      <Confirm
        studentID={id}
        showModal={showModal}
        fullName={props.fullName}
        id={j.join("")}
        closeModal={() => setShowModal(false)}
        getEachClassStudent={props.getEachClassStudent}
      />
    </>
  );
};
export default Generate;
