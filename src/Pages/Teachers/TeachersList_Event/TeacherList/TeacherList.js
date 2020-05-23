import React from "react";
import Classes from "./TeacherList.module.css";
import Assignform from "./AssignEvent/Forms";
import PasswordEvent from "./PasswordEvent/PasswordEvent";
import DeleteEvent from "./DeleteEvent/DeleteEvent";
import { Link } from "react-router-dom";

import { ReactComponent as Trash } from "../../../../Assert/trash.svg";
import { ReactComponent as Pass } from "../../../../Assert/sideBarIcon/scratchCard.svg";
import { ReactComponent as Assign } from "../../../../Assert/good.svg";
import { ReactComponent as Retry } from "../../../../Assert/retry.svg";
import Loading from "../../../../Component/UI/Loading/Loading";
import TearcherContext from "../../../../Component/Context/allClasses";


const TeacherList = props => {
  const TeacherCTX = React.useContext(TearcherContext);
  const [id, setId] = React.useState("");

  const setIdHandler = (e, id) => {
    setId(e);
  };


  const List = TeacherCTX.teacherList
  .filter(v => v.full_name !== "")
  .map(v => {
    return (
      <div key={v._id} className={Classes.Student}>
        <div
          onClick={setIdHandler.bind(this, v._id)}
          className={Classes.mainStudents}
        >
          <Link
            style={{ textDecoration: "none", color: "inherit", backgroundColor: "inherit" }}
            to={`/main=>_teacher/${v._id}`}
          >
            <div className={Classes.speciallink} style={{ backgroundColor: "inherit", textTransform: "capitalize"}}>{v.full_name}</div>
          </Link>
          <div style={{ backgroundColor: "inherit" }}>
            <div style={{ backgroundColor: "inherit" }}>
              <Assign
                onClick={props.onClick.bind(this, v._id)}
                style={{ backgroundColor: "inherit", marginRight: "10px" }}
                width="20"
                height="20"
                fill={v.assignClass == null ? "#e72626" : "#fff"}
                id="Assign"
              />
              <Pass
                onClick={props.onClick.bind(this, v._id)}
                style={{ backgroundColor: "inherit", marginRight: "10px" }}
                width="20"
                height="20"
                fill="#fff"
                id="Pass"
              />
              <Trash
                onClick={props.onClick.bind(this, v._id)}
                style={{ backgroundColor: "inherit" }}
                width="20"
                height="20"
                fill="#fff"
                id="Trash"
              />
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
      <div className={Classes.message} onClick={props.getAllTeachers}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else if (TeacherCTX.teacherList[0].full_name === "") {
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
        <Assignform
          id={id}
          close={props.closeOnClick}
          show={props.AssignModal}
          FullName={props.full_name}
          closeModal={props.closeOnClick}
          changeassign={props.changeassign}
        />
        <PasswordEvent
          id={id}
          close={props.closeOnClick}
          show={props.PasswordModal}
          full_name={props.full_name}
          login_id={props.login_id}
          closeModal={props.closeOnClick}
        />
        <DeleteEvent
          id={id}
          close={props.closeOnClick}
          show={props.TrashModal}
          full_name={props.full_name}
          login_id={props.login_id}
          fillterTeachersList={props.fillterTeachersList}
          closeModal={props.closeOnClick}
        />
      </div>
    </div>
  );
};

export default TeacherList;
