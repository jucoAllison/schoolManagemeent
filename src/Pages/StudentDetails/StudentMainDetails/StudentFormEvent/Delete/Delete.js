import React from "react";
import Classes from "./Delete.module.css";
import Modal from "../../../../../Component/UI/Modal/Modal";
import Context from "../../../../../Component/Context/Context";

const Delete = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
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

  const deleteStudent = () => {
    setLoading(true);
    fetch(`http://localhost:2222/admin/Delete_this/${props.studentID}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        console.log("DELETED");
        props.ChangedClassToTrue()
        props.update()
      })
      .catch(err => {
        setLoading(false);
        alert("Check Your Internet Connection and Continue");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "inherit",
        marginBottom: "50px",
        fontSize: "14px"
      }}
    >
      <Modal top="190px" show={props.showModal} close={props.closeShowModal}>
        <div style={{ backgroundColor: "inherit" }}>
          <div className={Classes.Delete}>
            <h4>Are you sure you want to Delete.</h4>
            <h4>
              {" "}
              Once {Capital} is Deleted, All Data and Result Will be Lost{" "}
            </h4>
          </div>
          <div className={Classes.BUTTON}>
            <h5 onClick={props.closeShowModal}>No</h5>
            <h5 onClick={deleteStudent}>{loading ? "..." : "Yes"}</h5>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Delete;
