import React from "react";
import Classes from "./TeacherList.module.css";
import AddAdmin from "./AddEvent/AddEvent";
import DeleteEvent from "./DeleteEvent/DeleteEvent";
import ChangeAccess from "./ChangeAccess/ChangeAccess";

import { ReactComponent as Retry } from "../../../../Assert/retry.svg";
import { ReactComponent as Trash } from "../../../../Assert/trash.svg";

import Loading from "../../../../Component/UI/Loading/Loading";
import ManagementContext from "../../../../Component/Context/allClasses";

const ManagementList = props => {
  const ManagementCTX = React.useContext(ManagementContext);
  // showing adding admin
  const [showNew, setShowNew] = React.useState(false);
  const showNewHandler = () => setShowNew(!showNew);

  const [id, setId] = React.useState("");

  const setIdHandler = (id, e) => {
    setId(id);
  };

  const [showModal, setShowModal] = React.useState(false);
  const [clicked, setClicked] = React.useState([
    { _id: "", username: "", allowAccess: "" }
  ]);

  const changeAccess = (id, name, allowAccess, e) => {
    setClicked([{ _id: id, username: name, allowAccess: allowAccess }]);
    setShowModal(true);
  };

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [clickedDelete, setClickedDelete] = React.useState([
    { _id: "", username: "", allowAccess: "", phone: "" }
  ]);
  const DeleteAdmin = (id, name, e) => {
    setShowDeleteModal(true);
    setClickedDelete([{ _id: id, username: name }]);
  };

  const List = ManagementCTX.managementList
  .filter(v => v.main_admin !== true)
  .map(v => {
    return (
      <div key={v._id} className={Classes.Student}>
        <div
          onClick={setIdHandler.bind(this, v._id)}
          className={Classes.mainStudents}
        >
          <div
            className={Classes.speciallink}
            style={{ backgroundColor: "inherit", textTransform: "capitalize" }}
          >
            {v.username}
          </div>
          <div style={{ backgroundColor: "inherit", display: "flex", justifyContent: "space-between" }}>
            <div style={{ backgroundColor: "inherit", display: "block" }}>
              <Trash
                onClick={DeleteAdmin.bind(this, v._id, v.username)}
                style={{ backgroundColor: "inherit", display: "block", marginRight: "10px" }}
                width="20"
                height="20"
                fill="#fff"
                id="Trash"
              />
            </div>
            <div
              onClick={changeAccess.bind(
                this,
                v._id,
                v.username,
                v.allowAccess
              )}
              style={{
                backgroundColor: "inherit",
                color: "#fff",
                textTransform: "capitalize",
                cursor: "pointer"
              }}
            >
              {v.allowAccess ? "true" : "false"}
            </div>
          </div>
        </div>
      </div>
    );
  });

  //  CHECKING ALL

  let CHECKING = null;
  if (props.err) {
    CHECKING = (
      // dfghhgfdfgh
      <div className={Classes.message} onClick={props.getAllManagement}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else if (props.message || ManagementCTX.managementList.length < 1) {
    CHECKING = (
      <div className={Classes.message}>
        You have no teacher. Add teacher to continue
      </div>
    );
  } else {
    CHECKING = List;
  }

  return (
    <div>
      <div className={Classes.Grid}>
        {props.loading ? <Loading /> : CHECKING}
        <h4 onClick={showNewHandler} className={Classes.NewAdmin}>
          Add New_Admin
        </h4>
        <AddAdmin show={showNew} pushNewAdmin={props.pushNewAdmin} />
        <ChangeAccess
          clicked={clicked}
          show={showModal}
          close={() => setShowModal(false)}
          filterManagementList={props.filterManagementList}
        />
        <DeleteEvent
          clickedDelete={clickedDelete}
          close={() => setShowDeleteModal(false)}
          show={showDeleteModal}
          fillAfterDelete={props.fillAfterDelete}
        />
      </div>
    </div>
  );
};

export default ManagementList;
