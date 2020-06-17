import React from "react";
import Loading from "../../../../Component/UI/Loading/Loading";
import { ReactComponent as Trash } from "../../../../Assert/trash.svg";
import { ReactComponent as Retry } from "../../../../Assert/retry.svg";
import Classes from "./MainDeletion.module.css";
import Deleting from "./Deleting/Deleting";
import DeletingStudent from "./Deleting/DELETINGSTUDENT";

const MainDeletion = props => {
  const [deleting, setDeleting] = React.useState([{ _id: "" }]);

  const setDeletingDetails = (_id, e) => {
    setDeleting([{ _id }]);
  };
  let sort = props.result.sort((a, b) => a.term - b.term);
  const Mapped = sort
    .filter(v => v.term !== "")
    .map(v => {
      return (
        <div className={Classes.DeletingContainer} key={v._id}>
          <div className={Classes.ListResult}>
            <div className={Classes.identifier}>
              <h5>Class:</h5>
              <div>{v.class_name}</div>
            </div>
            <div className={Classes.identifier}>
              <h5>Term:</h5>
              <div>{v.term} Term</div>
            </div>
            <div className={Classes.identifier}>
              <h5></h5>
              <div>{v.approved !== undefined ? "Result Sheet" : "Record"}</div>
            </div>
          </div>
          <div
            className={Classes.Trash}
            onClick={setDeletingDetails.bind(this, v._id)}
          >
            <Trash
              style={{ backgroundColor: "#fff", marginTop: "5px" }}
              width="35"
              height="35"
              fill="#76848d"
            />
          </div>
        </div>
      );
    });

  let CHECKING;
  if (props.loading) {
    CHECKING = (
      <div style={{ width: "500px", margin: "auto" }}>
        <Loading />
      </div>
    );
  } else if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.GetEveryStudentData}>
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
    CHECKING = Mapped;
  }

  return (
    <div className={Classes.Griding}>
      <Deleting deleting={deleting} filterDeleted={props.filterDeleted} />
      {CHECKING}
      <DeletingStudent deleteStudent={props.deleteStudent} />
    </div>
  );
};

export default MainDeletion;
