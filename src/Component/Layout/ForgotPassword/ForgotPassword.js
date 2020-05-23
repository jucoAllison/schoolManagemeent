import React from "react";
import Modal from "../../UI/Modal/Modal";
import Classes from "./ForgotPassword.module.css";

const ForgotPassword = props => {
  const [InputValue, setInputValue] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [isNull, setIsNull] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [allowAccess, setAllowAccess] = React.useState(false);
  const [forgotID, setForgotID] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState(
    "Have you forgotten your password, don't worry just enter your User_Name or your Phone_Number below"
  );

  const onChangeInputValue = e => {
    setIsNull(!isNaN(e.target.value));
    setInputValue(e.target.value);
  };

  // console.log(isNull)
  const submittingForgottenPasswordHandler = e => {
    e.preventDefault();
    setLoading(true);
    setMessage(false);
    fetch("http://localhost:2222/admin/forgotten_password", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        which: isNull ? "NUMBER" : "USERNAME",
        payload: InputValue
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setInputValue("");
        setMessage(res.Message);
        setAllowAccess(res.allowAccess);
        setForgotID(res._id)
        setPhone(res.phone)
      })
      .catch(err => {
        setLoading(false);
        setInputValue("");
        alert("Check Internet Connection and Continue");
      });
  };

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <div
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "inherit",
          fontSize: "11px",
          cursor: "pointer",
          color: "#e72626"
        }}
      >
        Forgot_Password
      </div>
      <Modal top="10% " show={showModal} close={() => setShowModal(false)}>
        <div className={Classes.Disc}>{message}</div>
        {allowAccess ? (
          <div onClick={props.SendingNewPassword.bind(this, forgotID, phone)} className={Classes.Contain}>
            {props.sending ? "..." : "Send SMS"}
          </div>
        ) : (
          <form
            onSubmit={submittingForgottenPasswordHandler}
            className={Classes.Form}
          >
            {/* <label htmlFor="fullName">User_Name</label> */}
            <div className={Classes.Contain}>
              <input
                value={InputValue}
                onChange={onChangeInputValue}
                className={Classes.Input}
                required
                type={isNull ? "number" : "text"}
                autoComplete="false"
              />
            </div>
            <button disabled={loading ? true : false}>
              {loading ? "..." : "Send"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ForgotPassword;
