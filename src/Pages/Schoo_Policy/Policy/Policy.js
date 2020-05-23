import React from "react";
import Classes from "./Policy.module.css";
import Context from "../../../Component/Context/Context";
import Loading from "../../../Component/UI/Loading/Loading";

import { ReactComponent as Retry } from "../../../Assert/retry.svg";

const Policy = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [policy, setPolicy] = React.useState({});
  const [sending, setSending] = React.useState(false);

  const get_school_policy = () => {
    setLoading(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/school_policy`, {
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
        setPolicy(res.result);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  React.useEffect(_ => {
    get_school_policy();
  }, []);

  const textAreaOnchange = e => {
    const spread = {...policy}
    spread.school_policy = e.target.value
    setPolicy(spread);
  };

  let Checking;
  if (loading) {
    Checking = <div className={Classes.Selecttt}> <Loading /></div>
  } else if (err) {
    Checking = (
      <div
        style={{ marginTop: "20px" }}
        className={Classes.message}
        onClick={get_school_policy}
      >
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else {
    Checking = (
      <div className={Classes.Selecttt}>
        <textarea onChange={textAreaOnchange} value={policy.school_policy} />
        <div className={Classes.select}></div>
      </div>
    );
  }


  const sendPolicy = () => {
    setSending(true);
    setErr(false);
    fetch(`http://localhost:2222/admin/school_policy/${policy._id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        school_policy: policy.school_policy
      })
    })
      .then(res => res.json())
      .then(res => {
        setSending(false);
        setErr(false);
        setErr(false);
        setPolicy(res.result);
      })
      .catch(err => {
        setSending(false);
        setErr(true);
      });
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "40px 0px" }}>
        School Policy
      </div>
      <div className={Classes.flex}>
        <div></div>
        <button onClick={sendPolicy} disable={sending ? "true" : "false"}>
          {props.sending ? "..." : "Send"}
        </button>
      </div>
      {Checking}
    </div>
  );
};

export default Policy;
