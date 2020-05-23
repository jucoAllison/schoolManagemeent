import React from "react";
import Classes from "./Each.module.css";
import Generate from "./Generate/Generate";
import { ReactComponent as Retry } from "../../../Assert/retry.svg";
import Loading from "../../../Component/UI/Loading/Loading";

const Each = props => {
  const [gen, setGen] = React.useState(false);

  const GenerateButtonClicked = e => {
    e.preventDefault();
    setGen(!gen);
  };


  const mapped = props.studentLogin.map((v, i) => {
    return (
      <div style={{ backgroundColor: "#fff" }} key={v._id}>
        <Generate
          gen={gen}
          fullName={v.full_name}
          log_id={v.log_id == undefined ? "New Student" : v.log_id}
          password={v.access == undefined ? "New Student" : v.access}
          id={v._id}
          getEachClassStudent={props.getEachClassStudent}
        />
      </div>
    );
  });

  let CHECKING = null;
  if (props.err) {
    CHECKING = (
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
  } else if (props.message || props.studentLogin.length < 1) {
    CHECKING = (
      <div className={Classes.message}>
        There are no registered students in this class
      </div>
    );
  } else {
    CHECKING = mapped;
  }

  return (
    <div className={Classes.Each}>
      <div className={Classes.discription}>
        <div></div>
        <div>Login ID</div>
        <div>Password</div>
        <div></div>
      </div>
      {props.loading ? <Loading /> : CHECKING}
    </div>
  );
};
export default Each;
