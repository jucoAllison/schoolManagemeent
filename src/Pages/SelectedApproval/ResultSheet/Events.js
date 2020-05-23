import React from "react";
import Classes from "./ResultSheet.module.css";
import ResultSheet from "./ResultSheet";
import Context from "../../../Component/Context/Context";

const Index = props => {
  const CTX = React.useContext(Context);
  const [show, setShow] = React.useState(false);
  const [all_total, setAll_total] = React.useState([]);

  // fixing all tthe inputs that we wil recieve
  const [payloads, setPayloads] = React.useState({
    performance: [{ performance_name: "", value: "" }],
    subjects: [
      {
        sub_name: "",
        
        sub_id: "",
        scores: { test: "", assignment: "", mid_term: "", exams: "" }
      }
    ]
  });
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const getStudentResult = () => {
    setShow(true);
    setLoading(true);
    setErr(false);
    fetch(`http://localhost:2222/teacher/result_for/${props.resultID}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setErr(false);
        setAll_total(res.all_total)
        setPayloads(res.result);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  React.useEffect(_ => {
    getStudentResult();
  }, []);

  const onChangeTextArea = e =>{
    let spread = {...payloads}
    spread.principal_comment = e.target.value
  }
  const fees_paid = (e) => {
    let spread = {...payloads}
    spread.fees_paid = e.target.value
  }
  const fees_owning = (e) => {
    let spread = {...payloads};
    spread.fees_owning = e.target.value
  }

  return (
    <>
      {/* <Modal top="10%" close={() => setShow(false)} show={show}> */}
      <div className={Classes.Scrool}>
        <ResultSheet
          show={show}
          getStudentResult={getStudentResult}
          err={err}
          payloads={payloads}
          loading={loading}
          scorePosition={props.scorePosition}
          resultID={props.resultID}
          closeModal={() => setShow(false)}
          all_total={all_total}
          onChangeTextArea={onChangeTextArea}
          fees_paid={fees_paid}
          fees_owning={fees_owning}
          // after submitting
          ssetAll_total={(e) => setAll_total(e)}
          ssetPayloads={(e) => setPayloads(e)}
          Redirect={props.Redirect}
           // for redirecting
           RedirectToSelectingApprove={props.Redirect}
        />
      </div>
      {/* </Modal> */}
    </>
  );
};

export default Index;
