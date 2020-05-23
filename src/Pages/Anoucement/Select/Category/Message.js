import React from "react";
import Classes from "./Message.module.css";

import Loading from '../../../../Component/UI/Loading/Loading';
import {ReactComponent as Retry} from '../../../../Assert/retry.svg'

const Message = props => {
  let Checking;
  if (props.loading) {
    Checking = <Loading />;
  } else if (props.err) {
    Checking = (
      <div className={Classes.message} onClick={props.getAllCalendar}>
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
      <div className={Classes.MessageCont}>
        <div className={Classes.flex}>
          <h5>Type in the message here</h5>
          <button disable={props.sending ? "true": "false"}>{props.sending? '...': "Send"}</button>
        </div>
        <textarea value={props.textareavalue} onChange={props.textareaonchange.bind(this)}/>
      </div>
    );
  }

  if(!props.show){
    return null
  }
  return <form onSubmit={props.formOnsubmitHandler}>{Checking}</form>;
};

export default Message;
