import React from "react";
import Classes from "../Category/Message.module.css";

const Custom = props => {
  const [inputNumbers, setInputNumbers] = React.useState("");

  const textareaonchange = e => {
    setInputNumbers(e.target.value);
  };

  const [inputMessage, setInputMessage] = React.useState("")
  const textareaonchangeMessage = (e) => {
      setInputMessage(e.target.value);
  }

  // now sending
  const [sending, setSending] = React.useState(false);
  const formOnsubmitHandler = e => {
    setSending(true);
    e.preventDefault();
    fetch(
      `https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=9OIw8xFoYvUFOKwS3c4xsT4XVFuKLXB0h3HoQw42fPmJBjMBLcVCbHdHJNjo&from=JohnsonObioma&to=${inputNumbers}&body=${inputMessage}&dnd=2`,
      {
        method: "POST",
        mode: "no-cors"
        // headers: new Headers({
        //   "Content-Type": "application/json"
        // })
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setSending(false)
      })
      .catch(err => {
        console.log(err)
        setSending(false)
      });
  };


  return (
    <div>
      <div className={Classes.MessageCont} style={{overflow: "scroll"}} >
        <div className={Classes.flex}>
          <h5>Type in the numbers here</h5>
          <button disable={props.sending ? "true" : "false"}>
            {props.sending ? "..." : "Next"}
          </button>
        </div>
        <textarea placeholder="Example:  2348062404140, 2347012345678, 2349087654321" value={inputNumbers} onChange={textareaonchange.bind(this)} />

        <div style={{marginTop:"20px"}} className={Classes.flex}>
          <h5>Type in the message here</h5>
          <button onClick={formOnsubmitHandler} disable={sending ? "true" : "false"}>
            {sending ? "..." : "Send"}
          </button>
        </div>
        <textarea
          value={inputMessage}
          onChange={textareaonchangeMessage.bind(this)}
        />
      </div>
    </div>
  );
};

export default Custom;
