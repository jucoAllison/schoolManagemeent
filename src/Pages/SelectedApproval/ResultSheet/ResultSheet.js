import React from "react";
import Classes from "./ResultSheet.module.css";
import Details from "./Details/Details";
import Loading from "../../../Component/UI/Loading/Loading";
import Context from "../../../Component/Context/Context";

import { ReactComponent as Retry } from "../../../Assert/retry.svg";

const ResultSheet = props => {
  const CTX = React.useContext(Context);
  // this is for position
  let all_total_numbers = [];
  props.all_total.map(v => {
    all_total_numbers = [...all_total_numbers, v.student_total];
  });
  // now filtering the all_total_numbers from undfined, null,
  let filter_undefined = all_total_numbers.filter(v => v !== undefined);
  
  let filter_null = filter_undefined.filter(v => v !== null);
  let sort_decending_order = filter_null.sort((a, b) => b - a);
  let Position = sort_decending_order.map((v, i) => {
    if (v == props.payloads.student_total) {
      return i + 1;
    }
  });

  const [TextAreaState, setTextAreaState] = React.useState("");
  const [fees_paidState, setFees_paidState] = React.useState("");
  const [fees_owningState, setFees_owningState] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const submittingFilled = e => {
    e.preventDefault();
    setSending(true);
    fetch(`http://localhost:2222/admin/complete_result/${props.resultID}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        fees_owning:
          props.payloads.fees_owning === undefined
            ? fees_owningState
            : props.payloads.fees_owning,
        fees_paid:
          props.payloads.fees_paid === undefined
            ? fees_paidState
            : props.payloads.fees_paid,
        principal_comment:
          props.payloads.principal_comment === undefined
            ? TextAreaState
            : props.payloads.principal_comment
      })
    })
      .then(res => res.json())
      .then(res => {
        setSending(false);
        props.ssetAll_total(res.all_total);
        props.ssetPayloads(res.result);
      })
      .catch(err => {
        alert("Check Internet Connection and Continue");
        setSending(false);
      });
  };

  const [approve, setApprove] = React.useState(false);

  const ApproveResult = () => {
    if (approve) {
      return;
    } else {
      setApprove(true);
      fetch(`http://localhost:2222/admin/approve_result/${props.resultID}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      })
        .then(res => res.json())
        .then(res => {
          props.Redirect();
          setApprove(false);
        })
        .catch(err => {
          setApprove(false);
          alert("Check Internet Connection and Continue");
        });
    }
  };

  let CHECKING;

  if (props.loading) {
    CHECKING = <Loading />;
  } else if (props.err) {
    CHECKING = (
      <>
        <div className={Classes.message} onClick={props.getStudentResult}>
          <div className={Classes.message}>
            Error Occured Check Your Internet
          </div>
          <Retry
            style={{ backgroundColor: "#fff", marginTop: "5px" }}
            width="40"
            height="40"
            fill="#76848d"
          />
        </div>
      </>
    );
  } else {
    CHECKING = (
      <div className={Classes.ResultSheet}>
        <Details
          scorePosition={props.scorePosition}
          closeModal={props.closeModal}
          Position={Position}
          payloads={props.payloads}
          // onchanging the principal side
          onChangeTextArea={props.onChangeTextArea}
          TextAreaState={TextAreaState}
          onChangeTextAreaState={e => setTextAreaState(e.target.value)}
          //fee_paid
          fees_paidState={fees_paidState}
          fees_owningState={fees_owningState}
          setpaidState={e => setFees_paidState(e.target.value)}
          setFeesOwning={e => setFees_owningState(e.target.value)}
          fees_paidfees_paidfees_paid={props.fees_paid}
          setfees_owning={props.fees_owning}
          // submitting
          submittingFilled={submittingFilled}
          sending={sending}
          // now approve
          ApproveResult={ApproveResult}
          approve={approve}
          // for redirecting
          RedirectToSelectingApprove={props.RedirectToSelectingApprove}
          resultID={props.resultID}
        />
      </div>
    );
  }

  return <>{CHECKING}</>;
};

export default ResultSheet;
