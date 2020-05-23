import React from "react";
import Classes from "./Diary.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import { Select, Value } from "../../Component/UI/Select/Select";
import EachClass from "./EachClass/EachClass";

const Diary = props => {
  // This are the Fetched Class
  const returned = [
    // Each Class Will Come With {_id, className,} PASSWORD WILL BE REMOVED
    { className: "Pri_Nursery 1", _id: "678ikjh" },
    { className: "Pri_Nursery 2", _id: "7890polkjhgnm" },
    { className: "Nursery 1", _id: "98765tyhujk" },
    { className: "Nursery 2", _id: "098iuiol,mm" },
    { className: "Nursery 3", _id: "ji98765jkl" },
    { className: "Basic 1", _id: "hu87654h" },
    { className: "Basic 2", _id: "cdftyu890" },
    { className: "Basic 3", _id: "345rtyhj" },
    { className: "Basic 4", _id: "3eedftyui890" },
    { className: "Basic 5", _id: "567yuhjkm" },
    { className: "Basic 6", _id: "87654rfghj" },
    { className: "Junior_Secondary 1", _id: "ghjkmuiyh" },
    { className: "Junior_Secondary 2", _id: "678" },
    { className: "Junior_Secondary 3", _id: "65rtyuj" },
    { className: "Senior_Secondary 1", _id: "8765rtyuj" },
    { className: "Senior_Secondary 2", _id: "987678ikjhyu" },
    { className: "Senior_Secondary 3", _id: "876y7u8ii0" }
  ];
  const [getclass, setGetClass] = React.useState([]);

  const option = (id, na, e) => {
    setGetClass([{ _id: id, className: na }]);
  };

  const Options = returned.map(v => {
    return (
      <div key={v._id}>
        <Value
          className={Classes.list}
          onClick={option.bind(this, v._id, v.className)}
        >
          {v.className}
        </Value>
      </div>
    );
  });

  // FOR GOING BACK
  const GobackHandler = () => {
    props.history.goBack();
  };
  return (
    <div className={Classes.BG}>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Diaries</div>
      <div>
        <div className={Classes.Select}>
          <div style={{ backgroundColor: "#fff" }}>
            <h4 style={{ backgroundColor: "#fff" }}>Select Class</h4>
            {/* ALL this Classes will please Fetch from BackEnd */}
            <div className={Classes.select}>
              <Select lable="Click Here" className={Classes.select}>
                {Options}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <EachClass show={getclass} />
    </div>
  );
};

export default Diary;
