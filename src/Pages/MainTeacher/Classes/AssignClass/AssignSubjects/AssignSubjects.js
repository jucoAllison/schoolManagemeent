import React from "react";
import { ReactComponent as Retry } from "../../../../../Assert/retry.svg";
import Context from "../../../../../Component/Context/Context";
import Loading from "../../../../../Component/UI/Loading/Loading";
import Classes from "./AssignSubjects.module.css"

const AssignSubjects = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [subjects, setSubjects] = React.useState([{ _id: "", subjects: "" }]);

  const getAllSubjects = () => {
    setLoading(true);
    setMessage(false);
    setErr(false);
    fetch(`http://localhost:2222/admin/subjects/${props.classID}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        if (res.result.length > 0) {
          setSubjects(res.result);
        } else {
          setMessage(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setMessage(false);
        setErr(true);
      });
  };
  React.useEffect(_ => {
    getAllSubjects();
  }, []);

  const [set, setSet] = React.useState([]);

  const onChangeHandler = (_id, subject_name, spliceNum, e) => {



    let checking = set.find(v => v.spliceNum === spliceNum)

    if(checking === undefined){
      let spread = [... set]
      spread.push({ subject_name, _id, spliceNum})
      setSet(spread)
    }else{
      let filterChecked = set.filter(v => v.spliceNum !== spliceNum)
      setSet(filterChecked)
    }
  };

  const mappedSubjects = subjects.map((v, i) => {
    return (
      <div style={{ backgroundColor: "inherit", textAlign: "left", textTransform: "capitalize" }} key={v._id}>
        <input
        className={Classes.inputt}
          onChange={onChangeHandler.bind(this, v._id, v.subjects, i)}
          type="checkbox"
        />
        {v.subjects}
      </div>
    );
  });

  // CHECKING WHEN GETTING IT WILL SHOW LOADING
  let CHECKING = null;
  if (err) {
    CHECKING = (
      <div
        style={{
          backgroundColor: "inherit",
          fontWeight: "bold",
          textAlign: "center"
        }}
        onClick={getAllSubjects}
      >
        <div
          style={{
            backgroundColor: "inherit",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          Error Occured Check Your Internet
        </div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else if (message || subjects.length < 1) {
    CHECKING = (
      <div style={{ backgroundColor: "inherit", fontWeight: "13px" }}>
        No subjects found. Post new subject to continue
      </div>
    );
  } else {
    CHECKING = mappedSubjects;
  }
  return (
    <div style={{ backgroundColor: "inherit" }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              backgroundColor: "inherit",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "9px"
            }}
          >
            {CHECKING}
          </div>
          <button
            style={{
              textAlign: "center",
              padding: ".4em",
              border: ".8px solid Black",
              backgroundColor: "inherit",
              marginTop: "20px",
              marginBottom: "9px"
            }}
            onClick={props.fill.bind(this, set)}
          >
            Fillsubjects
          </button>
        </>
      )}
    </div>
  );
};

export default AssignSubjects;
