import React from "react";
import Classes from "./Confirm.module.css";
import Modal from "../../../../../Component/UI/Modal/Modal";
import Context from "../../../../../Component/Context/Context";

const Confirm = props => {
  const CTX = React.useContext(Context);

  //   this hooks is for the effective changing of the loginID and password
  // FETCHING WITH PUT REQUEST THAT IS IT CHANGES ONLY THE CLICKED ONE
  const [loading, setLoading] = React.useState(false);
  const changeID = () => {
    setLoading(true);
    fetch(`http://localhost:2222/admin/change/${props.studentID}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        _uuid: props.id
      })
    })
      .then(res => res.json())
      .then(res => {
          console.log(res)
        setLoading(false);
        props.getEachClassStudent();
        props.closeModal();
      })
      .catch(err => {
        alert("Check Interrnet Connection and Continue");
        setLoading(false);
      });
  };
  return (
    <Modal top="100px" show={props.showModal} close={props.closeModal}>
      <div className={Classes.Message}>Change LoginID and Password of</div>
      <div className={Classes.whom}>{props.fullName}</div>
      <div className={Classes.TO}>To</div>
      <div className={Classes.whom}>{props.id}</div>
      <div className={Classes.BTNEvent}>
        <div onClick={props.closeModal}>No</div>
        <div onClick={changeID}>{loading ? "..." : "Yes"}</div>
      </div>
    </Modal>
  );
};

export default Confirm;
