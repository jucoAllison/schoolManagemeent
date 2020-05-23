import React from "react";
import Classes from "./EachClass.module.css";
// components
import Subjects from "./Subjects/Subjects";
import Performance from "./Performance/Performance";
import HomeContext from "../../../../../Component/Context/HomeContext";

const EachClass = props => {
const HomeCTX = React.useContext(HomeContext)

  if (HomeCTX.selectingClassClassess === null) {
    return null;
  }
  return (
    <div className={Classes.BG}>
      <div className={Classes.EachClass}>
        <Subjects
          showCom={props.showCom}
          closeShowCom={props.closeShowCom}
          classID={props.getClass}
        />
        <Performance
          showCom={props.showCom}
          closeShowCom={props.closeShowCom}
          classID={props.getClass}
          performanceCom={props.performanceCom}
          closePerCom={props.closePerCom}
        />
      </div>
    </div>
  );
};

export default EachClass;
