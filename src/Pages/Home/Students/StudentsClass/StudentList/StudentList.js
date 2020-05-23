import React from "react";
import Classes from "./StudentList.module.css";
import Loading from "../../../../../Component/UI/Loading/Loading";
// import StudentDetails from "./StudentDetails/StudentFormEvent/index";
import { Link } from "react-router-dom";
// Student SVG
import { ReactComponent as Boy } from "../../../../../Assert/students/boy.svg";
import { ReactComponent as Who } from "../../../../../Assert/students/who.svg";
import { ReactComponent as Girl } from "../../../../../Assert/students/girl.svg";
import { ReactComponent as Retry } from "../../../../../Assert/retry.svg";

const StudentList = props => {
  // PARSing This To the Props
  const [id, setId] = React.useState([{ _id: "", full_name: "", sex: "" }]);
  // this hook shows the details and it is off with React.useEffect
  const [showDetials, setShowDetials] = React.useState(false);
  const details = (_id, full_name, sex, e) => {
    setId([{ _id, full_name, sex }]);
    setShowDetials(true);
    props.ChangedClassToFlase();
  };

  React.useEffect(_ => {
    setShowDetials(false);
  }, []);

  // Value on the FILTER
  const [filter, setFilter] = React.useState("");
  // Onchange the Filter input
  const filterHandler = e => {
    setFilter(e.target.value);
  };
  // End of Everything About FILTER

  //    FETCHED NOW MAPPING
  const MAPPING = props.StudentNames.filter(v => {
    return v.full_name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  }).map(v => {
    return (
      <Link
        to="/get=>_studentFullDetails"
        style={{ color: "none", textDecoration: "none" }}
      >
        <li
          style={{ backgroundColor: "#fff" }}
          onClick={details.bind(this, v._id, v.full_name, v.sex)}
          className={Classes.LISTLI}
          key={v._id}
        >
          {v.sex == "male" || v.sex == "Male" ? (
            <Boy
              style={{ backgroundColor: "inherit" }}
              width="20"
              height="20"
              fill="#198dfb"
            />
          ) : v.sex == "Female" || v.sex == "female" ? (
            <Girl
              style={{ backgroundColor: "inherit" }}
              width="20"
              height="20"
              fill="#198dfb"
            />
          ) : (
            <Who
              style={{ backgroundColor: "inherit" }}
              width="17"
              height="17"
              fill="#198dfb"
            />
          )}
          <span
            style={{ backgroundColor: "#fff", textTransform: "capitalize" }}
          >
            {v.full_name}
          </span>
        </li>
      </Link>
    );
  });

  let CHECKING = null;
  if (props.err) {
    CHECKING = (
      // dfghhgfdfgh
      <div className={Classes.message} onClick={props.getEachClassStudent}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else if (props.message || props.StudentNames.length < 1) {
    CHECKING = (
      <div className={Classes.message}>
        There are no registered students in this class
      </div>
    );
  } else {
    CHECKING = <div className={Classes.displyGrid}>{MAPPING}</div>;
  }

  return (
    <div className={Classes.BgColor}>
      <div className={Classes.Griding}>
        {/* {showDetials && (
          <div className={Classes.Details}>
            {props.ChangedClass ? null : (
              <StudentDetails
                eachId={id}
                update={props.update}
                ChangedClassToTrue={props.ChangedClassToTrue}
              />
            )}
          </div>
        )} */}
        {props.loading ? (
          <Loading />
        ) : (
          <div id={props.id} style={{ backgroundColor: "#fff" }}>
            <div className={Classes.ApprovedHeaderSection}>
              <h5 style={{ backgroundColor: "#fff" }}>
                Classes of {props.className}
              </h5>
              <h5 style={{ backgroundColor: "#fff", marginBottom: "15px" }}>
                Total: {props.total}
              </h5>
            </div>
            <input
              className={Classes.inputFilter}
              placeholder="Type to filter"
              onChange={filterHandler}
              value={filter}
              type="text"
            />

            {CHECKING}
          </div>
        )}
      </div>
    </div>
  );
};
export default StudentList;
