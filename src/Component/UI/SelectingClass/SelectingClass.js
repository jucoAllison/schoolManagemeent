import React from "react";
import Classes from "./SelectingClass.module.css";
// import Loading from "../Loading/Loading";
import { Select, Value } from "../Select/Select";
// import Context from "../../Context/Context";
import AllClassesContext from "../../Context/allClasses";

const SelectingClass = ({
  onClick,
  event,
  name,
  lable = "Click Here",
  title = "Select Class",
}) => {
  const ClassCTX = React.useContext(AllClassesContext);

  const allclass = ClassCTX.allClasses
    .filter(v => v._id !== "")
    .map(v => {
      return (
        <div key={v._id}>
          
            <Value onClick={onClick.bind(this, v._id, v.className)}>
              {v.className}
            </Value>
        </div>
      );
    });

  // console.log(ClassCTX.allClasses);

  React.useEffect(_ => {
    if(ClassCTX.allClasses.length > 2){
      return
    }else{
      ClassCTX.setAllClasses()
    }
  },[])

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <div className={Classes.Selecttt}>
        <div style={{ backgroundColor: "#fff" }}>
          <h4 style={{ backgroundColor: "#fff" }}>{title}</h4>
          {/* ALL this Classes will please Fetch from BackEnd */}
          <div className={Classes.select}>
            <Select
              loading={false}
              catchh={false}
              lable={lable}
              className={Classes.select}
            >
              {allclass}
            </Select>
          </div>
        </div>
        <div onClick={event} className={Classes.GET}>
          {name}
        </div>
      </div>
    </div>
  );
};

export default SelectingClass;
