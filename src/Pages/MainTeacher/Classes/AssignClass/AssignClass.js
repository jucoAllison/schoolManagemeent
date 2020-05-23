import React from "react";
import Modal from "../../../../Component/UI/Modal/Modal";
import AssignSubjects from "./AssignSubjects/AssignSubjects";
import Context from "../../../../Component/Context/Context";
import Classes from "./AssignClass.module.css";

const AssignClass = props => {
  const CTX = React.useContext(Context);
  const [showModal, setShowModal] = React.useState(false);
  const [classID, setClassID] = React.useState("");
  const [classNAME, setClassNAME] = React.useState("");
  const getClassSubject = (id, name, spliceNum, e) => {
    setShowModal(true);
    setClassID(id);
    setClassNAME(name);
    // props.selectedClasses.splice(spliceNum, 1);
  };
  let mapped = "ABCDEFGHIGK";
  if (props.showAssign) {
    mapped = props.selectedClasses.map((v, i) => {
      return (
        <div
          style={{
            width: "200px",
            margin: "auto",
            textAlign: "center",
            marginBottom: "12px",
            cursor: "pointer"
          }}
          onClick={getClassSubject.bind(this, v._id, v.className, i)}
          key={v._id}
        >
          {v.className}
        </div>
      );
    });
  }

  // const [subss, setSubs] = React.useState([]);
  const [check, setCheck] = React.useState([]);
  const fillSubjects = subs => {
    // setSubs(subs);

    let checking = check.find(v => v.class_name === classNAME);

    if (checking === undefined) {
      const spread = [...check];
      spread.push({ class_name: classNAME, class_ID: classID, subjects: subs });
      setCheck(spread);
    } else {  
      let filterChecked = check.filter(v => v.class_name !== classNAME);
      let pusing = [...filterChecked] 
      pusing.push({ class_name: classNAME, class_ID: classID, subjects: subs });
      setCheck(pusing);
    }

    setShowModal(false);
  };

  const woo = check.map(v => {
    return (
      <div className={Classes.ClassBorder} key={v.class_ID}>
        <div className={Classes.Class}>{v.class_name}</div>
        {v.subjects.length > 0 ? (
          <div className={Classes.subject_name}>
            {v.subjects.map(sub => {
              return (
                <div className={Classes.MainSubs} key={sub._id}>
                  {sub.subject_name}
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Subjects</div>
        )}
      </div>
    );
  });

  const teacherID = props.teacherID;
  // this const "assignClass" is for handling_Result for secondary teacher setting them up for each class and for each subject
  const assignClass = () => {
    fetch(`http://localhost:2222/admin/put_handle_result/${teacherID}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        handle_result: check
      })
    })
      .then(res => res.json())
      .then(res => {
        props.setredirect();
      })
      .catch(err => {
        alert("Check Internet Connection and Continue");
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {props.showAssign && !showModal ? (
        <h5 style={{ fontSize: "12px", color: "#e72626", marginBottom: "8px" }}>
          Click on the class-name to select subjects
        </h5>
      ) : null}
      {mapped}
      <div className={Classes.ContainerWoo}>{woo}</div>
      <button
        style={{
          textAlign: "center",
          padding: ".4em",
          border: ".8px solid Black",
          backgroundColor: "inherit",
          marginTop: "20px",
          marginBottom: "9px"
        }}
        onClick={assignClass}
      >
        AssignClass
      </button>
      <Modal top="10%" show={showModal}>
        <div
          style={{
            backgroundColor: "inherit",
            fontSize: "12px",
            color: "#e72626",
            marginBottom: "8px"
          }}
        >
          {" "}
          Click on the box to choose any subject to be assigned{" "}
        </div>
        <AssignSubjects fill={fillSubjects} classID={classID} />
      </Modal>
    </div>
  );
};

export default AssignClass;
