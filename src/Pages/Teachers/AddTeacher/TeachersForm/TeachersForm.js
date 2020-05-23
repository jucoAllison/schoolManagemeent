import React from "react";
import Classes from "./TeachersForm.module.css";

const TeachersForm = props => {
  return (
    <form
      onSubmit={props.submitFormHandler.bind(this)}
      className={Classes.FORM}
    >
      <div className={Classes.TeachersForm}>
        <div className={Classes.TeachersLogin}>
          <h5>Teachers Login</h5>
          <div className={Classes.Fullname}>
            <label htmlFor="fullName">Login ID</label>
            <input
              value={props.login_id}
              onChange={props.onChangeInput.bind(this)}
              name="login_id"
              readOnly
              required
              type="text"
              autoComplete="false"
            />
          </div>
          <h6 className={Classes.password}>Default Password: 1234567</h6>
        </div>

        <div className={Classes.TeachersLogin}>
          <h5>Teachers Details</h5>
          <div className={Classes.Fullname}>
            <label htmlFor="fullName">Full Name</label>
            <input
              value={props.full_name}
              onChange={props.onChangeInput.bind(this)}
              name="full_name"
              required
              type="text"
              autoComplete="false"
            />
          </div>
          <div className={Classes.FormControls}>
            <div>
              <label htmlFor="State">State</label>
              <input
                value={props.state}
                onChange={props.onChangeInput.bind(this)}
                name="state"
                required
                type="text"
                autoComplete="false"
              />
            </div>
            <div>
              {/* PASSWORD */}
              <label htmlFor="fullName">LGA</label>
              <input
                value={props.lga}
                onChange={props.onChangeInput.bind(this)}
                name="lga"
                required
                type="text"
                autoComplete="false"
              />
            </div>
          </div>
          <div className={Classes.FormControls}>
            <div>
              <label htmlFor="fullName">Address</label>
              <input
                value={props.address}
                onChange={props.onChangeInput.bind(this)}
                name="address"
                required
                type="text"
                autoComplete="false"
              />
            </div>
            <div>
              {/* PASSWORD */}
                <label htmlFor="Phone">Phone: <h6 style={{display: 'inline', marginLeft: "10px", color: "#e72626"}}>"+234"</h6> </label> 
              <input
                value={props.phone}
                onChange={props.onChangeInput.bind(this)}
                placeholder="+243**********"
                name="phone"
                required
                type="number"
                autoComplete="false"
              />
            </div>
          </div>
          <div className={Classes.FormControls}>
            <div>
              <label htmlFor="N.O.K">N.O.K.</label>
              <input
                value={props.nok}
                onChange={props.onChangeInput.bind(this)}
                name="nok"
                required
                type="text"
                autoComplete="false"
              />
            </div>
            <div>
                <label htmlFor="N.O.K._Phone">N.O.K. Phone: <h6 style={{display: 'inline', marginLeft: "10px", color: "#e72626"}}>"+234"</h6> </label> 
              <input
                value={props.nok_phone}
                onChange={props.onChangeInput.bind(this)}
                name="nok_phone"
                required
                type="number"
                placeholder="+243**********"
                autoComplete="false"
              />
            </div>
          </div>
          <div className={Classes.FormControls}>
            <div>
              <label htmlFor="fullName">Sex</label>
              <select onChange={props.onChangeSelect.bind(this)}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button disable={props.loading ? "true" : "false"}>{props.loading ? "..." : props.label}</button>
    </form>
  );
};

export default TeachersForm;
