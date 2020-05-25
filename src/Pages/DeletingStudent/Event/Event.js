import React from "react";
import HomeContext from "../../../Component/Context/HomeContext";
import Context from "../../../Component/Context/Context";
import MainDeletion from "./MainDeletion/MainDeletion";

const Event = props => {
  const HomeCTX = React.useContext(HomeContext);
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [result, setResult] = React.useState([]);

  const GetEveryStudentData = () => {
    setErr(false);
    setLoading(true);
    fetch(
    //   `http://localhost:2222/teacher/graduate/${HomeCTX.deletingStudent._id}`,
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
        setErr(false);
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
        console.log(HomeCTX.deletingStudent)
      GetEveryStudentData();
    }
  }, []);
  return (
    <div>
      <MainDeletion loading={loading} err={err} result={result} />
    </div>
  );
};

export default Event;
