import React from "react";
import Classes from "../Delete/Delete.module.css";
import Modal from "../../../../../Component/UI/Modal/Modal";
import Context from "../../../../../Component/Context/Context";
import Loading from "../../../../../Component/UI/Loading/Loading";

const Freeze = props => {
  const CTX = React.useContext(Context);
  let Capital = (
    <div
      style={{
        textTransform: "capitalize",
        color: "#e72626",
        backgroundColor: "inherit"
      }}
    >
      {props.full_name}
    </div>
  );
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const deleteStudent = (_id, e) => {
    setLoading(true);
    fetch(`http://localhost:2222/admin/_freeze_this_student/${_id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 2500);
        setMessage(res.Message);
        props.closeShowModal()
        props.reload()
      })
      .catch(err => {
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 2500);
        setMessage("Check Your Internet Connection and Continue");
        props.closeShowModal()
      });
  };

  let CHECKING;
  if (loading) {
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
  } else if (message.length > 2) {
    CHECKING = (
      <div
        style={{
          backgroundColor: "inherit",
          fontSize: "11px",
          fontWeight: "bold",
          width: "300px",
          margin: "auto",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {message}
      </div>
    );
  }else{
      CHECKING = null
  }

  return (
    <div
      style={{
        backgroundColor: "inherit",
        marginBottom: "50px",
        fontSize: "14px"
      }}
    >
        {CHECKING}
      <Modal top="190px" show={props.showModal} close={props.closeShowModal}>
        <div style={{ backgroundColor: "inherit" }}>
          <div className={Classes.Delete}>
            <h4>Are you sure you want to Freeze.</h4>
            <h4>{Capital}Freezed students can't recieve message notification</h4>
          </div>
          <div className={Classes.BUTTON}>
            <h5 onClick={props.closeShowModal}>No</h5>
            <h5 onClick={deleteStudent.bind(this, props.studentID)}>Yes</h5>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Freeze;
