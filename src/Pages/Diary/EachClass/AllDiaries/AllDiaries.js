import React from "react";
import Classes from "./AllDiaries.module.css";

const AllDiaries = props => {
  const [allDiaries, setAllDiaries] = React.useState([
    {
      _id: "567yuhn",
      subject: "English",
      Diary: [
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
      ]
    },
    {
      _id: "78ijjh8",
      subject: "Literature",
      Diary: [
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
      ]
    },
    {
      _id: "89iuji",
      subject: "Maths",
      Diary: [
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
      ]
    },
    {
      _id: "98ujkil,",
      subject: "P.H.E",
      Diary: [
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
      ]
    },
    {
      _id: "09iokjj",
      subject: "Civic",
      Diary: [
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
      ]
    }
  ]);

  //   console.log(allDiaries)

  const mapped = allDiaries.map(v => {
    //   console.log(v)
    return (
      <div style={{backgroundColor: "#fff"}} key={v._id}>
        <div className={Classes.SUb}>{v.subject}</div>
        {v.Diary.map(a => (
          <div style={{backgroundColor: "#fff"}} key={a._id} className={Classes.note}>{a.note}</div>
        ))}
      </div>
    );
  });

  if (!props.showAllDiaries) {
    return null;
  }
  return (
    <div className={Classes.AllDiaries}>
      <h5 style={{backgroundColor: "#fff"}}>{mapped}</h5>
      <div className={Classes.download}>
        <form style={{backgroundColor: "#fff"}}>
          {/* THIS BUTTONS CONVERTS IT TO HTML TO PDF  */}
          <button>Download As PDF</button>
        </form>
      </div>
    </div>
  );
};
export default AllDiaries;
