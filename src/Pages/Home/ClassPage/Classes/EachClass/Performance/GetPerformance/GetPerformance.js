import React from "react";
import Classes from "./GetPerformance.module.css";
import Loading from "../../../../../../../Component/UI/Loading/Loading";
import { ReactComponent as Retry } from "../../../../../../../Assert/retry.svg";
import { ReactComponent as Trash } from "../../../../../../../Assert/trash.svg";
import DeletePerformance from "./DeletePerformance/DeletePerformance";

const GetPerformance = props => {
  const [Delete, setDelete] = React.useState([]);
  const DeleteSubjectHandler = (id, performance, e) => {
    setDelete([{ _id: id, performance }]);
  };
  // Showing add Performance

  const mappedPerformance = props.performance.map(v => {
    return (
      <div className={Classes.Flex} key={v._id}>
        <div style={{ backgroundColor: "#fff", textTransform: "uppercase" }}>
          {v.performance}
        </div>
        <div
          onClick={DeleteSubjectHandler.bind(this, v._id, v.performance)}
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
    CHECKING = mappedPerformance;
  }

  return (
    <div style={{ backgroundColor: "#fff" }} className={Classes.GetPerformance}>
      {props.loading ? (
        <Loading />
      ) : (
        <div style={{ backgroundColor: "inherit" }}>
          <DeletePerformance
            Delete={Delete}
            GetAllPerformance={props.GetAllPerformance}
            clearDelete={() => setDelete([])}
          />
          {props.message || props.performance.length < 1 ? (
            <div className={Classes.message}>
              No performance found. Post performance to continue
            </div>
          ) : (
            <div className={Classes.Performance}>{CHECKING}</div>
          )}
        </div>
      )}
    </div>
  );
};
export default GetPerformance;
