import React from "react";
import HomeContext from "../../../Component/Context/HomeContext";
import Context from "../../../Component/Context/Context";
import MainDeletion from "./MainDeletion/MainDeletion";

const Event = props => {
  const HomeCTX = React.useContext(HomeContext);
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [deleteStudent, setDeleteStudent] = React.useState(false);
  const [result, setResult] = React.useState([
    {
      approved: false,
      _id: "",
      full_name: "",
      class_name: "",
      term: "",
      year: ""
    }
  ]);

  const GetEveryStudentData = () => {
    setErr(false);
    setLoading(true);
    fetch(
      `http://localhost:2222/admin/get_all_this/${HomeCTX.deletingStudent._id}`,
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
        setLoading(false);
        setResult(res.result);
        setErr(false);
        if (res.result.length < 1) {
          setDeleteStudent(true);
        } else {
          setDeleteStudent(false);
        }
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  React.useEffect(_ => {
    if (HomeCTX.deletingStudent === null) {
      return;
    } else {
      GetEveryStudentData();
    }
  }, []);

  // console.log(isResult)
  // console.log(isRecord)

  const filterDeleted = (payload, e) => {
    let spread = [...result];
    let isResult = spread.filter(v => v.approved !== undefined);
    let isRecord = spread.filter(v => v.approved === undefined);

    console.log(payload.type);

    if (payload.type === "result") {
      let filterOutSameYear = isResult.filter(v => v.year === payload.year);
      let unyear = spread.filter(v => v.year !== payload.year);
      let removeCurrentDdeleted = filterOutSameYear.filter(
        v => v.term !== payload.term
      );
      let combined = [...unyear, ...removeCurrentDdeleted, ...isRecord];
      if (combined.length < 1) {
        setDeleteStudent(true);
      } else {
        setDeleteStudent(false);
      }
      setResult(combined);
      console.log(combined);
    } else if (payload.type === "record") {
      let filterOutSameYear = isRecord.filter(v => v.year === payload.year);
      let unyear = spread.filter(v => v.year !== payload.year);
      let removeCurrentDdeleted = filterOutSameYear.filter(
        v => v.term !== payload.term
      );
      let combined = [...unyear, ...removeCurrentDdeleted, ...isResult];
      if (combined.length < 1) {
        setDeleteStudent(true);
      } else {
        setDeleteStudent(false);
      }
      setResult(combined);
      console.log(combined);
    } else {
      return;
    }
  };

  return (
    <div>
      <MainDeletion
        loading={loading}
        err={err}
        result={result}
        filterDeleted={filterDeleted.bind(this)}
        deleteStudent={deleteStudent}
        GetEveryStudentData={GetEveryStudentData}
      />
    </div>
  );
};

export default Event;
