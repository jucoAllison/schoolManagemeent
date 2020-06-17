import React from "react";
import Classes from "./Delete.module.css";
import Modal from "../../../../../Component/UI/Modal/Modal";
import HomeContext from "../../../../../Component/Context/HomeContext";
import { Link } from "react-router-dom";

const Delete = props => {
  const HomeCTX = React.useContext(HomeContext);
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

  const deleteStudent = (_id, name, e) => {
    HomeCTX.setDeletingStudent({ _id, name });
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
            <Link
              onClick={deleteStudent.bind(
                this,
                props.studentID,
                props.full_name
              )}
              style={{ textDecoration: "none", color: "inherit" }}
              to="/deleting_students"
            >
              <h5
              >
                Yes
              </h5>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Delete;
