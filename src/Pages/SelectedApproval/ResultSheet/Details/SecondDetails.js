import React from "react";
import Classes from "./Details.module.css";
import DeleteResult from "./DeleteResult/DeleteResult";

const SecondDetails = props => {
  // performace mapping
  let RatingMap;
  if (props.performance.length > 1) {
    RatingMap = props.performance.map((rate, i) => (
      <div className={Classes.Carrier} key={rate.performance_name}>
        <div className={Classes.Rate}>
          <div style={{ backgroundColor: "#fff", textTransform: "uppercase" }}>
            {rate.performance_name}
          </div>
          <div className={Classes.inpuut} style={{ backgroundColor: "#fff" }}>
            {" "}
            <div>{rate.value}</div>
          </div>
        </div>
      </div>
    ));
  } else {
    RatingMap = (
      <div
        style={{
          textAlign: "center",
          backgroundColor: "inherit",
          paddingTop: "20px"
        }}
      >
        There is no posted performance
      </div>
    );
  }

  // everthing about mapping out the subjects
  const SubMap = props.subjects.map(v => (

    <div key={v.sub_id}>
      <div className={Classes.GridingSub}>
        <div className={Classes.mainSubject}>{v.sub_name}</div>
        <div>
          <div className={Classes.Scores}>
            <h5>Test</h5>
            <input type="text" readOnly value={v.scores.test} />
            <h5>Ass.</h5>
            <input type="text" readOnly value={v.scores.assignment} />
            <h5>Mid-Term</h5>
            <input type="text" readOnly value={v.scores.mid_term} />
            <h5>Exams</h5>
            <input type="text" readOnly value={v.scores.exams} />
          </div>
        </div>
      </div>
    </div>
  ));

  // everything about showing and displaying the delete rersult Modal
  const [ShowModal, setShowModal] = React.useState(false);
  const [id, setId] = React.useState([{ _id: "", term: "" }]);

  const DeleteResultHandler = (id, term, e) => {
    setShowModal(true);
    setId([{ _id: id, term }]);
  };

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <div
        style={{ backgroundColor: "#fff", marginTop: "20px" }}
        className={Classes.Form}
      >
        Form Teachers Comment :
      </div>
      <div className={Classes.CommentText}>
        <textarea rows="3" value={props.form_teachers_comment} />
      </div>

      <div className={Classes.FlexT}>{RatingMap}</div>

      {/* NO. OF TIMES */}
      <div className={Classes.present}>
        <div className={Classes.Flexx}>
          <div className={Classes.presentCarrier}>No. of Time Present</div>{" "}
          <h5>{props.times_present}</h5>
        </div>
        <div className={Classes.Flexx}>
          <div className={Classes.presentCarrier}>No. Times School Held</div>{" "}
          <h5>{props.times_school_held}</h5>
        </div>
      </div>

      <div className={Classes.Scrool}>
        <div style={{ backgroundColor: "inherit", marginTop: "50px" }}>
          {SubMap}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "inherit",
          marginTop: "20px",
          fontSize: "13.5px",
          color: "#e72626"
        }}
      >
        <div
          onClick={props.ApproveResult}
          style={{
            backgroundColor: "inherit",
            cursor: "pointer"
          }}
        >
          {props.approve ? "..." : "Approve Result"}
        </div>
        <div
          style={{
            backgroundColor: "inherit",
            cursor: "pointer"
          }}
          onClick={DeleteResultHandler.bind(this, )}
        >
          Delete Result
        </div>
      </div>
      <DeleteResult
        id={id}
        close={() => setShowModal(false)}
        show={ShowModal}
        full_name={props.full_name}
        closeModal={() => setShowModal(false)}
        resultID={props.resultID}
        RedirectToSelectingApprove={props.RedirectToSelectingApprove}
      />
    </div>
  );
};

export default SecondDetails;
