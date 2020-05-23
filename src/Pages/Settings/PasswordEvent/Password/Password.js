import React from "react";
import Classes from "./Password.module.css";

const Password = props => {
  return (
    <div className={Classes.Password}>
      {props.show ? (
        <div className={Classes.Show}>
          <div
            style={{ display: props.writting == null ? "none" : "block" }}
            className={Classes.Message}
          >
            {props.writting}
          </div>
          <form onSubmit={props.formSubmitHandler.bind(this)} style={{backgroundColor: "#fff"}}>
            <div className={Classes.FormControls}>
              <label htmlFor="fullName">Old Password</label>
              <input
                value={props.oldPassword}
                onChange={props.inputOnchange.bind(this)}
                required
                type={props.passwordType ? "text" : "password"}
                onDoubleClick={props.changePasswordType}
                autoComplete="false"
                name="oldPassword"
              />
              <label style={{ color: props.checkConfirm ? "#e72626": null}} htmlFor="address">New Password</label>
              <input
                value={props.newPassword}
                onChange={props.inputOnchange.bind(this)}
                required
                style={{border: props.checkConfirm ? "1px solid #e72626": null}}
                type={props.passwordType ? "text" : "password"}
                onDoubleClick={props.changePasswordType}
                autoComplete="false"
                name="newPassword"
              />
              <label style={{ color: props.checkConfirm ? "#e72626": null}} htmlFor="address">Comfirm Password</label>
              <input
                value={props.confirmPassword}
                onChange={props.inputOnchange.bind(this)}
                required
                style={{border: props.checkConfirm ? "1px solid #e72626" : null}}
                type="password"
                autoComplete="false"
                name="confirmPassword"
              />
              <button disabled={props.loading?  true : false}>{props.loading ? "..." : "Change"}</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Password;
