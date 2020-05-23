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
              <label htmlFor="fullName">Old Phone Number |  234</label>
              <input
                value={props.oldPassword}
                onChange={props.inputOnchange.bind(this)}
                required
                type="number"
                autoComplete="false"
                name="oldPassword"
              />
              <label htmlFor="address">New Phone Number |  234</label>
              <input
                value={props.newPassword}
                onChange={props.inputOnchange.bind(this)}
                required
                type="number"
                autoComplete="false"
                name="newPassword"
              />
              
              <button disabled={props.loading?  false : true}>{props.loading ? "..." : "Change"}</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Password;
