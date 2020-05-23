import React from "react";
import Classes from "./GetSubject.module.css";
import Loading from "../../../../../../../Component/UI/Loading/Loading";
import { ReactComponent as Retry } from "../../../../../../../Assert/retry.svg";
import { ReactComponent as Trash } from "../../../../../../../Assert/trash.svg";
import DeleteSubject from "./DeleteSubject/DeleteSubject";

const GetSubject = props => {
  const [Delete, setDelete] = React.useState([]);
  const DeleteSubjectHandler = (id, subjects, e) => {
    setDelete([{ _id: id, subjects }]);
  };
  // Showing add SSubjects

  const mappedSubjects = props.subjects.map(v => {
    return (
          <div className={Classes.Flex} key={v._id}>
            <div
              style={{ backgroundColor: "#fff", textTransform: "capitalize" }}
            >
              {v.subjects}
            </div>
            <div
              onClick={DeleteSubjectHandler.bind(this, v._id, v.subjects)}
              style={{ backgroundColor: "#fff" }}
            >
              <Trash
                style={{ backgroundColor: "#fff" }}
                width="19"
                height="19"
                fill="#e72626"
              />
            </div>
          </div>
    );
  });

  // CHECKING WHEN GETTING IT WILL SHOW LOADING
  let CHECKING = null;
  if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.getAllCalendar}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else {
    CHECKING = mappedSubjects;
  }
  return (
    <div className={Classes.GetSubject}>
      {props.loading ? (
        <Loading />
      ) : (
        <div style={{ backgroundColor: "inherit" }}>
          <DeleteSubject
            Delete={Delete}
            GetAllSubjects={props.GetAllSubjects}
            clearDelete={() => setDelete([])}
          />
          {props.message || props.subjects.length < 1 ? (
            <div className={Classes.message}>
              No subjects found. Post new subject to continue
            </div>
          ) : (
            <div className={Classes.Subject}>{CHECKING}</div>
          )}
        </div>
      )}
    </div>
  );
};
export default GetSubject;
