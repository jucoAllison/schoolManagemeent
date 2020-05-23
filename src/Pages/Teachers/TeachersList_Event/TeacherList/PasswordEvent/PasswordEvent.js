import React from "react";
import Modal from "../../../../../Component/UI/Modal/Modal";
import Classes from "./PasswordEvent.module.css";
import Context from "../../../../../Component/Context/Context";

const PasswordEvent = props => {
  const CTX = React.useContext(Context);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const valueOnchangeHandler = e => {
    setValue(e.target.value);
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    if (value.length < 6) {
      return;
    }
    // console.log(value)
    setLoading(true);
    fetch(`http://localhost:2222/admin/teacherpassword/${props.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        password: value
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        alert(res.Message);
        props.closeModal();
      })
      .catch(err => {
        alert("Check your internet connection and continue");
        setLoading(false);
      });
  };

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <Modal top="140px" show={props.show} close={props.close}>
        <div className={Classes.header}>
          <div style={{backgroundColor: "inherit", textTransform: "capitalize"}}>{props.full_name}</div>
          <div>Login ID: {props.login_id}</div>
        </div>
        <div className={Classes.info}>Password must be > 6</div>
          <form onSubmit={formSubmitHandler} className={Classes.FLEX}>
            <input
              type="text"
              onChange={valueOnchangeHandler.bind(this)}
              value={value}
              placeholder="...Type in the new password"
            />
            <button>{loading ? "..." : "Reset Password"}</button>
          </form>
      </Modal>
    </div>
  );
};

export default PasswordEvent;
