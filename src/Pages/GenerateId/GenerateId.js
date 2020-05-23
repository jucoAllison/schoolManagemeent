import React from "react";
import Classes from "./GenerateId.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import SelectingClass from "../../Component/UI/SelectingClass/SelectingClass";
import Each from "./Each/Each";
import Context from "../../Component/Context/Context";

const GenerateId = props => {
  const CTX = React.useContext(Context);
  const GobackHandler = () => {
    props.history.goBack();
  };
  const [selectedClass, setSelectedClass] = React.useState("");
  const setGetClassHandler = id => {
    setSelectedClass(id);
  };

  const [studentLogin, setStudentLogin] = React.useState([
    { full_name: "", log_id: "", access: "", _id: "" }
  ]);
  const [className, setClassName] = React.useState("");
  const [total, setTotal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [err, setErr] = React.useState(false);
  // setting showEach component
  const [showEach, setShowEach] = React.useState(false);

  const getEachClassStudent = () => {
    if (selectedClass.length < 3) {
      alert("Select a classname and continue");
      return;
    }
    setShowEach(true);
    setMessage(false);
    setLoading(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/get_loginpass/${selectedClass}`, {
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
        setClassName(res.class_name);
        setTotal(res.total);
        if (res.result.length > 0) {
          setStudentLogin(res.result);
        } else {
          setMessage(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
        setMessage(false);
      });
  };

  React.useEffect(_ => {
    setShowEach(false);
  }, []);

  return (
    <div>
      <div className={Classes.BG}>
        <Nav />
        <Goback Goback={GobackHandler} />
        <div className={Classes.pageDiscription}>Scrach Card</div>
        <SelectingClass
          event={getEachClassStudent}
          name="Get"
          onClick={setGetClassHandler.bind(this)}
        />

        {showEach ? (
          <Each
            className={className}
            studentLogin={studentLogin}
            total={total}
            loading={loading}
            message={message}
            err={err}
            id={selectedClass}
            getEachClassStudent={getEachClassStudent}
          />
        ) : null}
      </div>
    </div>
  );
};

export default GenerateId;
