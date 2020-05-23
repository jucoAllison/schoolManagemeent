import React from "react";
import Classes from "./EachClass.module.css";
import { Select, Value } from "../../../Component/UI/Select/Select";
import SelectedSub from "./SelectedSub/SelectedSub";
import AllDiary from './AllDiaries/AllDiaries';

const EachClass = props => {
  const [SelectClass, setSelectClass] = React.useState(true);
  const [showAllDiaries, setshowAllDiaries] = React.useState(false);
  const [getSub, setGetSub] = React.useState([]);

  // this AllDiaryHandler is responsible for show and fetchin all the Class Subject and thier ResPective Diaries
  const AllDiaryHandler = () => {
    setSelectClass(!SelectClass);
    setshowAllDiaries(!showAllDiaries)
    getSub.length = 0;
  }

  
  // this will be fetched from backend with React.useEffect
  // THIS IS THE SUBJECTS POSTED BY THE ADMIN
  const [SUB, setSUB] = React.useState([
    { _id: "567yuhn", subject: "English" },
    { _id: "78ijjh8", subject: "Literature" },
    { _id: "89iuji", subject: "Maths" },
    { _id: "98ujkil,", subject: "P.H.E" },
    { _id: "09iokjj", subject: "Civic" }
  ]);

  const sendSub = (id, na, e) => {
    setGetSub([{ _id: id, subject: na }]);
  };
  const Options = SUB.map(v => {
    return (
      <div key={v._id}>
        <Value
          className={Classes.list}
          onClick={sendSub.bind(this, v._id, v.subject)}
        >
          {v.subject}
        </Value>
      </div>
    );
  });

  if (props.show.length < 1) {
    return null;
  }
  return (
    <div className={Classes.EachClass}>
      <div className={Classes.Flex}>
        <h5 style={{backgroundColor: "#fff"}}>{props.show[0].className}</h5>
        <h5 className={Classes.pionter} onClick={AllDiaryHandler}>All Diarys</h5>
      </div>
      {/* <div className={Classes.Diary}>{subject}</div> */}

      <div className={Classes.Select}>
        {SelectClass ? (
          <div style={{backgroundColor: "#fff"}}>
            <h4>Select Subject</h4>
            {/* ALL this Classes will please Fetch from BackEnd */}
            <div className={Classes.select}>
              <Select lable="Click Here" className={Classes.select}>
                {Options}
              </Select>
            </div>
          </div>
        ) : null}
      </div>
      <SelectedSub getSub={getSub} />
      
      <AllDiary showAllDiaries={showAllDiaries} />
    </div>
  );
};
export default EachClass;
