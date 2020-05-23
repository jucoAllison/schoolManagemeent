import React from "react";
import Classes from "./Subjects.module.css";
import GetSubject from "./GetSubject/GetSubject";
import Context from "../../../../../../Component/Context/Context";
import AddSubject from "./GetSubject/AddSubject/AddSubject";
import HomeContext from "../../../../../../Component/Context/HomeContext"
// import

const Subjects = props => {
  const HomeCTX = React.useContext(HomeContext)
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [subjects, setSubjects] = React.useState([{ _id: "", subjects: "" }]);
  const showSubjects = () => {
    props.closeShowCom();
    setShow(!show);
    setLoading(true);
    setMessage(false);
    setErr(false);
    fetch(`http://localhost:2222/admin/subjects/${HomeCTX.selectingClassClasses._id}`, {
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
          setSubjects([{ _id: "", subjects: "" }]);
          setMessage(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setMessage(false);
        setErr(true);
      });
  };

  // EVERTHING ABOUT POSTING NEW Subject AND PUSHING IT TO THE ARRAY IN calendar AnD ALSO setLoading to true in other to change to ... WHEN loading
  const [value, setValue] = React.useState("");

  const onChange = e => {
    setValue(e.target.value);
  };

  // Submitting Form  ---- POST REQUEST
  const onSubmit = e => {
    setMessage(false);
    setLoading(true);
    e.preventDefault();
    // alert("its Working")
    fetch(`http://localhost:2222/admin/subjects/${HomeCTX.selectingClassClasses._id}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        subject: value
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setMessage(false);
        setValue("");
        const spread = [...subjects];
        spread.push(res.result);
        let Check = spread.filter(v => {
          return v._id !== "";
        });
        setSubjects(Check);
      })
      .catch(err => {
        setLoading(false);
        alert("Oops an Error Occured Check Your Internet");
      });
  };

  // after deleting now filltering list
  const FillterSUBJECT = (res) => {
    const spread = [...subjects]
    let filterAll = spread.filter(v => v._id !== res._id)
    setSubjects(filterAll)
  }

  return (
    <div className={Classes.Subjects}>
      <div onClick={showSubjects} className={Classes.Jects}>
        <h4>Subjects</h4>
      </div>
      <>
        {!props.showCom ? (
          <div className={Classes.SubjectsCarrier}>
            <GetSubject
              subjects={subjects}
              loading={loading}
              err={err}
              message={message}
              GetAllSubjects={FillterSUBJECT.bind(this)}
            />
            <AddSubject
              onSubmit={onSubmit}
              value={value}
              onChange={onChange.bind(this)}
              loading={loading}
            />
          </div>
        ) : null}
      </>
    </div>
  );
};
export default Subjects;
