import Classes from "./MainMaster.module.css"
import React from "react";

const MasterSheet = props => {
  const mappedSubjects = props.master.map(l => {
    let mainSub = props.classSubject.map(v => {
      let score = props.master.map(b => {
        if (l.full_name === b.full_name) {
          // console.log(b)
          if (b.subjects) {
            return b.subjects.map(z => {
              if (z.sub_name === v.subjects) {
                return z.total;
              }
            });
          } else {
            return 0;
          }
        }
      });
      return (
        <div style={{ backgroundColor: "#fff" }} key={v._id}>
          <div
            style={{
              height: "40px",
              display: "flex",
              backgroundColor: "#fff",
              alignContent: "center",
              overflow: "hidden",
              textTransform: "capitalize",
              marginBottom: "10px"
            }}
          >
            {v.subjects}
          </div>
          <div style={{ backgroundColor: "#fff" }}>{score}</div>
        </div>
      );
    });
    return (
      <div style={{ backgroundColor: "#fff" }} key={l._id}>
        <div
          style={{
            backgroundColor: "#fff",
            display: "grid",
            gridTemplateColumns: `repeat(${props.classSubject.length +
              4}, 1fr)`,
            gridGap: "10px",
            color: "#000",
            border: "1px solid red",
            fontSize: "12px",
            padding: ".8em",
            boxSizing: "border-box",
            marginBottom: "20px",
            fontWeight: "bold",
            textTransform: "capitalize"
          }}
        >
          {l.full_name}
          {mainSub}
          <div style={{ backgroundColor: "#fff", fontWeight: "bold" }}>
            <div style={{ backgroundColor: "#fff" }}>Total</div>
            <div style={{ marginTop: "36px", backgroundColor: "#fff" }}>
              {l.student_total}
            </div>
          </div>
          <div style={{ backgroundColor: "#fff", fontWeight: "bold" }}>
            <div style={{ backgroundColor: "#fff" }}>Average</div>
            <div style={{ marginTop: "36px", backgroundColor: "#fff" }}>
              {l.student_average}
            </div>
          </div>
          <div style={{ backgroundColor: "#fff", fontWeight: "bold" }}>
            <div style={{ backgroundColor: "#fff" }}>Position</div>
            <div style={{ marginTop: "36px", backgroundColor: "#fff" }}>
              {l.student_position}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={Classes.Contain}>
      <div className={Classes.Scrool}>
        <div style={{ backgroundColor: "#fff" }}>{mappedSubjects}</div>
      </div>
    </div>
  );
};

export default MasterSheet;
