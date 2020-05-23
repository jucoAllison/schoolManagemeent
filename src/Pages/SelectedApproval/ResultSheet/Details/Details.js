import React from "react";
import Classes from "./Details.module.css";
import SecondDetails from "./SecondDetails";

const Details = props => {
  return (
    <div style={{ backgroundColor: "#fff" }} className={Classes.Details}>
      <DetailsContanier label="Name:" value={props.payloads.full_name} />
      <DetailsContanier label="Class Name:" value={props.payloads.class_name} />
      <div className={Classes.FLEX}>
        <DetailsContanier label="Sex:" value={props.payloads.sex} />
        <DetailsContanier label="Age:" value={props.payloads.age} />
      </div>
      <div className={Classes.FLEX}>
        <DetailsContanier label="L.G.A:" value={props.payloads.lga} />
        <DetailsContanier
          label="State of Origin:"
          value={props.payloads.state_of_origin}
        />
      </div>
      <div className={Classes.FLEX}>
        <DetailsContanier
          label="Average:"
          value={props.payloads.student_average}
        />
        <DetailsContanier label="Total:" value={props.payloads.student_total} />
      </div>

      <div className={Classes.FLEX}>
        <DetailsContanier label="Year:" value={props.payloads.year} />
        <DetailsContanier label="Term:" value={props.payloads.term} />
      </div>

      <DetailsContanier label="Position:" value={props.Position.join("")} />

      <form onSubmit={props.submittingFilled} className={Classes.must_fill}>
        <div className={Classes.FLEX}>
          <MustFill
            value={
              props.payloads.fees_paid === undefined
                ? props.fees_paidState
                : props.payloads.fees_paid
            }
            label="Fees Paid"
            onChange={
              props.payloads.fees_paid === undefined
                ? props.setpaidState
                : props.fees_paidfees_paidfees_paid
            }
            name="fees_paid"
          />
          <MustFill
            label="Fees Owing"
            onChange={
              props.payloads.fees_owning === undefined
                ? props.setFeesOwning
                : props.payloads.setfees_owning
            }
            value={
              props.payloads.fees_owning === undefined
                ? props.fees_owningState
                : props.payloads.fees_owning
            }
            name="fees_owing"
          />
        </div>

        <div
          style={{ backgroundColor: "#fff", marginTop: "20px" }}
          className={Classes.Form}
        >
          Principal Comment :
        </div>
        <div className={Classes.CommentText}>
          <textarea
            rows="3"
            onChange={
              props.payloads.principal_comment === undefined
                ? props.onChangeTextAreaState
                : props.onChangeTextArea
            }
            value={
              props.payloads.principal_comment === undefined
                ? props.TextAreaState
                : props.payloads.principal_comment
            }
          />
        </div>
        <button disabled={props.sending ? true : false}>
          {props.sending ? "..." : "Fill"}
        </button>
      </form>

      <SecondDetails
        performance={props.payloads.performance}
        subjects={props.payloads.subjects}
        // Commect session
        form_teachers_comment={props.payloads.form_teachers_comment}
        times_present={props.payloads.times_present}
        times_school_held={props.payloads.times_school_held}
        //Aprove
        ApproveResult={props.ApproveResult}
        approve={props.approve}
        //Delete
        full_name={props.payloads.full_name}
        resultID={props.resultID}
        // after deleting going back
        RedirectToSelectingApprove={props.RedirectToSelectingApprove}
      />
    </div>
  );
};

export default Details;

export const DetailsContanier = props => (
  <div className={Classes.Contain}>
    <div className={Classes.Label}>{props.label}</div>
    <div className={Classes.Value}>{props.value}</div>
  </div>
);

export const MustFill = props => (
  <div className={Classes.Contain}>
    <div className={Classes.Label}>{props.label}</div>
    <input
      style={{ width: "60px" }}
      value={props.value}
      type="number"
      onChange={props.onChange}
      name={props.name}
    />
  </div>
);
