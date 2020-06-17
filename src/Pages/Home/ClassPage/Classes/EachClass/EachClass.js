import React from "react";
import Classes from "./EachClass.module.css";
// components
import Subjects from "./Subjects/Subjects";
import Performance from "./Performance/Performance";

const EachClass = props => {

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
