import React from "react";
import Record from "./Record";
import Context from "../../../../../Component/Context/Context";

const Event = props => {
  const CTX = React.useContext(Context);

  // HOOKS FOR FETCHING RECORDS
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [records, setRecords] = React.useState([
    { _id: "", student_name: "", class_name: "", term: "" }
  ]);

  // GETTING THE RECORDS FROM THE USEEFFECT HOOK
  const GetStudentAccount = () => {
    setLoading(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/get_all_record/${props.studentID}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.found_account) {
          setRecords(res.found_account);
        }
        setMessage(res.Message);
        setErr(false);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  React.useEffect(_ => {
    if (props.studentID === undefined) {
      return;
    } else {
      GetStudentAccount();
    }
  }, []);

  //   Creaing new Record POST request
  const CreateNewRecordAccount = () => {
    setLoading(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/posting_new_record/${props.studentID}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        account: []
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.Message !== undefined) {
        setMessage(res.Message);
        }else if(res.result !== undefined){
          let spread = [...records]
          spread.push(res.result)
          let filter = spread.filter(v => v.term !== "")
          setRecords(filter);
          setMessage("Account Record is Complete")
        }
        setErr(false);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };
  return (
    <div>
      <Record
        full_name={props.full_name}
        showModal={props.showModal}
        closeShowModal={props.closeShowModal}
        studentID={props.childID}
        reload={props.getEachStudent}
        // from gotten fecthed
        loading={loading}
        err={err}
        message={message.length === undefined ? "" : message}
        records={records}
        GetStudentAccount={GetStudentAccount}
        CreateNewRecordAccount={CreateNewRecordAccount}
      />
    </div>
  );
};

export default Event;
