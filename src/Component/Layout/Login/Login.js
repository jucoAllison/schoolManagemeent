import React from "react";
import Classes from "./Login.module.css";
import Context from "../../Context/Context";
import EventForgotPassword from "../ForgotPassword/EventForgotPassword";

import { ReactComponent as User } from "../../../Assert/user.svg";
import { ReactComponent as Scrach } from "../../../Assert/sideBarIcon/scratchCard.svg";

const Login = props => {
  const CTX = React.useContext(Context);
  // the Error that sets border to Red if AUTH FAiled
  const [err, setErr] = React.useState(false);
  // Hooks that Set the Loading and the Login
  const [Loading, setLoading] = React.useState(false);

  const [message, setMessage] = React.useState("Passion Schools Aba");

  // HANDLING ONCHANGe, VALUE AND THE ONSUBMIT HANDLER
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const usernameHandler = e => {
    setUsername(e.target.value);
  };
  const passwordHandler = e => {
    setPassword(e.target.value);
  };
  const SumbitHandler = e => {
    setLoading(true);
    e.preventDefault();
    fetch("http://localhost:2222/admin/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setMessage(res.Message);
        if (res.Message === "Auth Failed") {
          setErr(true);
        } else {
          CTX.login({
            token: res.token,
            termValue: res.term_value,
            yearValue: res.year_value,
            allowAccess: res.allowAccess,
            main_admin: res.main_admin
          });
        }
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
        alert("Check Your Internet Connection And Continue");
      });
  };
  // Changing the passWORD TypE
  const [passwordtype, setPasswordtype] = React.useState(false);
  const showPasswordHandler = () => {
    setPasswordtype(!passwordtype);
  };

  return (
    <div className={Classes.Login}>
      <div className={Classes.Round}>
        <h4>SIGN IN</h4>
        <h3 style={{ backgroundColor: "inherit" }}>{message}</h3>
        <form
          style={{ backgroundColor: "inherit" }}
          className={Classes.form}
          onSubmit={SumbitHandler.bind(this)}
        >
          <input
            style={{ border: err ? "1.3px solid red" : "1.3px solid white" }}
            type="text"
            placeholder="|  Username"
            required
            value={username}
            autoFocus
            onChange={usernameHandler.bind(this)}
          />
          <span style={{ backgroundColor: "inherit" }}>
            <User
              width="30"
              height="30"
              style={{ backgroundColor: "inherit" }}
              fill={err ? "red" : "#76848d"}
            />
          </span>
          <input
            style={{ border: err ? "1.3px solid red" : "1.3px solid white" }}
            type={passwordtype ? "text" : "password"}
            onDoubleClick={showPasswordHandler}
            onChange={passwordHandler.bind(this)}
            required
            value={password}
            placeholder="|  Password"
          />
          <span style={{ backgroundColor: "inherit" }}>
            <Scrach
              style={{ backgroundColor: "inherit" }}
              width="30"
              height="30"
              fill={err ? "red" : "#76848d"}
            />
          </span>
          <button onSubmit={SumbitHandler}>{Loading ? "..." : "LOGIN"}</button>
        </form>
          {err ? <div style={{backgroundColor: "inherit", marginTop: "20px"}}><EventForgotPassword /> </div> : null}
      </div>
    </div>
  );
};
export default Login;
