import React from "react";
import Modal from "../../../../../Component/UI/Modal/Modal";
import Classes from "./ChangeAccess.module.css";
import Context from "../../../../../Component/Context/Context";

const ChangeAccess = (props) => {
    const CTX = React.useContext(Context);
    const [loading, setLoading] = React.useState(false);
    const DeleteEventHandler = () => {
      setLoading(true);
      fetch(`http://localhost:2222/admin/management_controller/${props.clicked[0]._id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      })
        .then(res => res.json())
        .then(res => {
          // setDone(true);
          setLoading(false);
          props.filterManagementList(res.result)
          props.close()
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
            <h4 style={{textTransform: "capitalize"}}>Are you sure you want to Change Access for {props.clicked[0].username} to {props.clicked[0].allowAccess ? "False" : "True"}</h4> 
            <h4 style={{textTransform: "capitalize"}}>{props.full_name}</h4>
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

export default ChangeAccess;
