import React from "react";
import Classes from "./SelectedSub.module.css";

const SelectedSub = props => {
  // THIS ARE THE DIARRIES THAT WILL BE FECTHED FROM THE BACKEND THAT ARE POSTED BY THE TEACHER ON THE SUNJECT AND ON YEAR
  const [diaries, setDiaries] = React.useState([
    {
      _id: "789ii9i",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    },
    {
      _id: "2342w",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    },
    {
      _id: "rf4edr4",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    },
    {
      _id: "22w4rt5",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    },
    {
      _id: "wde455",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    },
    {
      _id: "543wse44",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    },
    {
      _id: "4454r545r5",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    },
    {
      _id: "4433we",
      note: "Week 1 we learnt about Reavion",
      year: "2019",
      term: "2"
    }
  ]);

  let mapped = diaries.map(v => {
    return (
      <div key={v._id}>
        <div className={Classes.diaries}>{v.note}</div>
      </div>
    );
  });

  if (props.getSub.length < 1) {
    return null;
  }
  return (
    <div className={Classes.SelectedSub}>
      <h5 style={{backgroundColor: "#fff"}}>{props.getSub[0].subject}</h5>

      <div className={Classes.mapped}>{mapped}</div>

      {/* THIS FORM HERE DOWNLOADS IT AS A PDF */}
      <div className={Classes.download}>
        <form style={{backgroundColor: "#fff"}}>
          {/* THIS BUTTONS CONVERTS IT TO HTML TO PDF  */}
          <button>Download As PDF</button>
        </form>
      </div>
    </div>
  );
};
export default SelectedSub;
