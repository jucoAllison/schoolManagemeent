import React from "react";
import Classes from "./index.module.css";

const SecondStudentForm = props => {
  return (
    <div style={{ backgroundColor: "inherit" }}>
      <form
        onSubmit={props.submittingDetailsHandler.bind(this)}
        className={Classes.MainForm}
      >
        {/* UPDATING TEACHER IS NOT YET COMPLETE WE WILL HAVE TO ALSO HAVE DIFFERENT COMPONENTS FOR GETTING-CURRENT TEACHER AND UPDATING TEACHER  */}

        <div
          style={{ backgroundColor: "#fff" }}
          className={Classes.FormControls}
        >
          <Sample
            labelName="Full Name"
            onChange={props.onChange}
            name="full_name"
            value={props.full_name}
            type="text"
          />
          <div className={Classes.grid2}>
            <Sample
              labelName="State of Origin"
              onChange={props.onChange}
              name="state_of_origin"
              value={props.state_of_origin}
              type="text"
            />
            <Sample
              labelName="L.G.A"
              onChange={props.onChange}
              name="lga"
              value={props.lga}
              type="text"
            />
          </div>
          <div className={Classes.grid3}>
            <Sample
              labelName="Age"
              onChange={props.onChange}
              name="age"
              value={props.age}
              type="number"
            />
            <Sample
              labelName="Sex"
              onChange={props.onChange}
              name="sex"
              value={props.sex}
              type="text"
            />
            <Sample
              labelName="D.O.B"
              onChange={props.onChange}
              name="dob"
              value={props.dob}
              type="text"
            />
          </div>
          <div className={Classes.grid2}>
            <Sample
              labelName="Phone:    '+234'"
              onChange={props.onChange}
              name="phone"
              value={props.phone}
              type="number"
            />
            <Sample
              labelName="Address"
              onChange={props.onChange}
              name="address"
              value={props.address}
              type="text"
            />
          </div>
          <Sample
            labelName="Parents Name"
            onChange={props.onChange}
            name="parents_name"
            value={props.parents_name}
            type="text"
          />
          <Sample
            labelName="Parents Occupation"
            onChange={props.onChange}
            name="parents_occupation"
            value={props.parents_occupation}
            type="text"
          />
          <div className={Classes.grid2}>
            <Sample
              labelName="Religion"
              onChange={props.onChange}
              name="religion"
              value={props.religionValue}
              type="text"
            />
            <Sample
              labelName="Church"
              onChange={props.onChange}
              name="church"
              value={props.church}
              type="text"
            />
          </div>
          <Sample
            labelName="Emergency Name"
            onChange={props.onChange}
            name="emergency_name"
            value={props.emergency_name}
            type="text"
          />
          <div className={Classes.grid2}>
            <Sample
              labelName="Emergency Phone:   '+234'"
              onChange={props.onChange}
              name="emergency_phone"
              value={props.emergency_phone}
              type="number"
            />
            <Sample
              labelName="Emergency Address"
              onChange={props.onChange}
              name="emergency_address"
              value={props.emergency_address}
              type="text"
            />
          </div>
          <Sample
            labelName="Emergency Relationship"
            onChange={props.onChange}
            name="emergency_relationship"
            value={props.emergency_relationship}
            type="text"
          />
          {/* <label htmlFor="lastname">N.O.K Phone</label>
          <input required type="text" autoComplete="false" /> */}
        </div>
        <button className={Classes.button}>
          {props.loadingCom ? "..." : "Change"}
        </button>
      </form>
    </div>
  );
};

export default SecondStudentForm;

export const Sample = ({ onChange, value, name, labelName, type }) => (
  <div style={{ backgroundColor: "inherit" }}>
    <label className={Classes.label} htmlFor={labelName}>
      {labelName}
    </label>
    <input
      onChange={onChange}
      value={value}
      className={Classes.input}
      name={name}
      required
      type={type}
      autoComplete="false"
    />
  </div>
);
