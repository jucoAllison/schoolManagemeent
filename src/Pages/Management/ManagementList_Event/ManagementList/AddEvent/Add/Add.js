import React from "react";
import Classes from "./Add.module.css";

const Add = props => {
  // TRACKING THE INPUTS

  return (
    <div className={Classes.Add}>
      {props.show ? (
        <div className={Classes.Show}>
          <div
            style={{ display: props.writting == null ? "none" : "block" }}
            className={Classes.Message}
          >
            {props.writting}
          </div>
          <form
            onSubmit={props.SubmittingForm}
            style={{ backgroundColor: "#fff" }}
          >
            <div className={Classes.FormControls}>
              <label htmlFor="fullName">User_Name</label>
              <input
                value={props.userName}
                onChange={props.inputOnchange.bind(this)}
                required
                name="userName"
                type="text"
                style={{textTransform: "capitalize"}}
                autoComplete="false"
              />
              
              <label htmlFor="address">Password</label>
              <input
                value={props.password}
                onChange={props.inputOnchange.bind(this)}
                required
                onDoubleClick={props.changePasswordType}
                name="password"
                type={props.passwordType ? "text" : "password"}
                autoComplete="false"
              />
              <label htmlFor="fullName">Phone_Number:  "234"</label>
              <input
                value={props.phone}
                onChange={props.inputOnchange.bind(this)}
                required
                name="phone"
                type="number"
                autoComplete="false"
              />
              <label htmlFor="address">Allow_Access</label>
              {/* <input required type="boolean" autoComplete="false" /> */}
              <select onChange={props.selectOnchange.bind(this)}>
                <option>false</option>
                <option>true</option>
              </select>
              <button>{props.loading ? "..." : "Add"}</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Add;

// tinyPNG.com
