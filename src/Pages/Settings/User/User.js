import React from "react";
import Classes from "./User.module.css";
import Context from "../../../Component/Context/Context";

const User = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [Message, setMessage] = React.useState("");
  // TRACKING THE INPUTS
  const [old, setOld] = React.useState("");
  const [change, setChange] = React.useState("");
  const oldHandler = e => {
    setOld(e.target.value);
  };
  const newHandler = e => {
    setChange(e.target.value);
  };
  // END OF TRACKING THE INPUTS

  // Handling the Submission
  const formSubmitHandler = e => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:2222/admin/putusername", {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        username: change,
        oldUsername: old
      })
    })
      .then(res => res.json())
      .then(res => {
        setChange("");
        setOld("");
        setMessage(res.Message);
        setLoading(false);
      })
      .catch(err => {
        setMessage("Oops an Error Occured Check Your Internet");
        setLoading(false);
      });
  };

  let writting = null;
  if (Message.length > 2) {
    writting = Message;
  }

  return (
    <div className={Classes.User}>
      {props.show ? (
        <div className={Classes.Show}>
          <div
            style={{ display: writting == null ? "none" : "block" }}
            className={Classes.Message}
          >
            {writting}
          </div>
          <form
            onSubmit={formSubmitHandler}
            style={{ backgroundColor: "#fff" }}
          >
            <div
              style={{ backgroundColor: "#fff" }}
              className={Classes.FormControls}
            >
              <label style={{ backgroundColor: "#fff" }} htmlFor="fullName">
                Old User_Name
              </label>
              <input
                value={old}
                onChange={oldHandler.bind(this)}
                required
                type="text"
                autoComplete="false"
              />
              <label style={{ backgroundColor: "#fff" }} htmlFor="address">
                New User_Name
              </label>
              <input
                value={change}
                onChange={newHandler.bind(this)}
                required
                type="text"
                autoComplete="false"
              />
              <button onClick={formSubmitHandler} style={{cursor: "pointer"}} disabled={loading ? true : false}>{loading ? "..." : "Change"}</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default User;
