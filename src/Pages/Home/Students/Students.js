import React from "react";
import StudentClass from "./StudentsClass/StudentsClass";
import Context from "../../../Component/Context/Context";
import HomeContext from "../../../Component/Context/HomeContext";

const Students = () => {
  const CTX = React.useContext(Context);
  const HomeCTX = React.useContext(HomeContext);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [className, setClassName] = React.useState("");
  const [StudentNames, setStudentNames] = React.useState([
    { _id: "", full_name: "", sex: "" }
  ]);
  const [err, setErr] = React.useState(false);

  const GEtAllStudentInThisClass = () => {
    setLoading(true);
    setMessage(false);
    setErr(false);
    fetch(
      `http://localhost:2222/admin/get_students/${HomeCTX.selectingClassStudents._id}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        setTotal(res.total);
        setClassName(res.class_name);
        if (res.result.length < 1) {
          setMessage(true);
          setStudentNames([{ _id: "", full_name: "", sex: "" }]);
        } else {
          setMessage(false);
          setStudentNames(res.result);
        }
      })
      .catch(err => {
        setMessage(false);
        setErr(true);
        setLoading(false);
      });
  };

  React.useEffect(
    _ => {
      if (HomeCTX.selectingClassStudents === null) {
        return;
      } else {
        GEtAllStudentInThisClass();
      }
    },
    [HomeCTX.selectingClassStudents]
  );

  return (
    <div>
      <StudentClass
        err={err}
        loading={loading}
        message={message}
        total={total}
        className={className}
        StudentNames={StudentNames}
        getEachClassStudent={GEtAllStudentInThisClass}
      />
    </div>
  );
};

export default Students;
