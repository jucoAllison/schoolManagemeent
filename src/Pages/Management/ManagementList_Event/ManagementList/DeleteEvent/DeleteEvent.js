  import React from "react";
import Classes from "./DeleteEvent.module.css";
import Modal from "../../../../../Component/UI/Modal/Modal";
import Context from "../../../../../Component/Context/Context";

const DeleteEvent = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const DeleteEventHandler = () => {
    setLoading(true);
    fetch(
      `http://localhost:2222/admin/management_controller/${props.clickedDelete[0]._id}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        props.close();
        if(!res.Error){
          props.fillAfterDelete(res.result);
        }else{
          return
        }
      })
      .catch(err => {
        alert("Check your internet connection and continue");
        setLoading(false);
      });
  };

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <Modal top="190px" show={props.show} close={props.close}>
        <div style={{ backgroundColor: "inherit" }}>
          <div className={Classes.Delete}>
            <h4>Are you sure you want to delete</h4>
            <h4 style={{ textTransform: "capitalize" }}>
              {props.clickedDelete[0].username}
            </h4>
          </div>
          <div className={Classes.BUTTON}>
            <h5 onClick={props.close}>No</h5>
            <h5 onClick={DeleteEventHandler}>{loading ? "..." : "Yes"}</h5>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteEvent;
