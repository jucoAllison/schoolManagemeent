import React from "react";
import Context from "../../../../Component/Context/Context";
import AprovalContext from '../../../../Component/Context/Approval';
import EachClass from "./EachClass/EachClass";

const GetStudent = props => {
  const AppCTX = React.useContext(AprovalContext);
  const CTX = React.useContext(Context);
  const [students, setStudents] = React.useState([
    {
      approved: "",
      _id: "",
      full_name: ""
    },
    {
      approved: "",
      _id: "",
      full_name: ""
    }
  ]);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [writting, setMessage] = React.useState("")

  const getAllStudents = () => {
    if (AppCTX.classID === null || AppCTX.termID === null) {
      return;
    } else {
      setMessage(false);
      setLoading(true);
      setErr(false);
      fetch(
        `http://localhost:2222/admin/avialble_term/${AppCTX.classID}/${AppCTX.termID}`,
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
          if (res.Message == undefined) {
            setMessage(false);
            setStudents(res.result);
            setErr(false);
            setLoading(false);
          } else {
            setMessage(res.Message);
          }
        })
        .catch(err => {
          setMessage(false);

          setLoading(false);
          setErr(true);
          // alert("Check Your Internet Connection and Continue");
        });
    }
  };

  React.useEffect(
    _ => {
      getAllStudents();
    },
    [AppCTX.classID, AppCTX.termID]
  );

  return (
    <div>
      <EachClass
        loading={loading}
        writting={writting}
        students={students}
        err={err}
        getClass={props.selectedTerm}
      />
    </div>
  );
};

export default GetStudent;
