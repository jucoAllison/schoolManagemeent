import React from "react";
import Classes from "./index.module.css";
import Loading from "../../../../../../../../Component/UI/Loading/Loading";
import Graduate from "../Graduate/Index";
import Delete from "../Delete/Delete";
import SecondStudentForm from "./SecondStudentForm";

import { ReactComponent as Retry } from "../../../../../../../../Assert/retry.svg";

const StudentDetails = props => {
  // for showing graduting component
  const [showGraduate, setShowGraduate] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState("");

  return (
    <div className={Classes.StudentDetails}>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          {props.err ? (
            <div className={Classes.message} onClick={props.getEachStudent}>
              <div className={Classes.message}>
                Error Occured Check Your Internet
              </div>
              <Retry
                style={{ backgroundColor: "#fff", marginTop: "5px" }}
                width="40"
                height="40"
                fill="#76848d"
              />
            </div>
          ) : (
            <>
              <div
                style={{ display: message.length < 3 ? "none" : "block" }}
                className={Classes.MessageFromBack}
              >
                {message}
              </div>
              <div
                style={{
                  backgroundColor: "inherit",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  marginBottom: "50px"
                }}
              >
                <div
                  onClick={() => setShowGraduate(!showGraduate)}
                  className={Classes.otherbutton}
                >
                  Change Class
                </div>
                <div
                  onClick={() => setShowModal(true)}
                  className={Classes.otherbutton}
                >
                  Delete Student
                </div>
              </div>
              <Delete
                full_name={props.full_name}
                showModal={showModal}
                closeShowModal={() => setShowModal(false)}
                studentID={props.childID}
                ChangedClassToTrue={props.ChangedClassToTrue}
                update={props.update}
              />
              <Graduate
                show={showGraduate}
                full_name={props.full_name}
                eachId={props.childID}
                update={props.update}
                ChangedClassToTrue={props.ChangedClassToTrue}
                setMessage={res => setMessage(res)}
              />
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
          )}
        </>
      )}
    </div>
  );
};

export default StudentDetails;
