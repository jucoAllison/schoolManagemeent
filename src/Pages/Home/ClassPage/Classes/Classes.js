import React from "react";
import Classes from "./Classes.module.css";
import EachClass from "./EachClass/EachClass";
import SelectingClass from "../../../../Component/UI/SelectingClass/SelectingClass";
import HomeContext from "../../../../Component/Context/HomeContext";

const Cllass = props => {
  const HomeCTX = React.useContext(HomeContext)
  const [showCom, setShowCom] = React.useState(false);
  const [performanceCom, setPerformanceCom] = React.useState(false);

  const setGetClassHandler = (id, name, ok) => {
    HomeCTX.setSelectingClass({_id:id, selected: name})
    setShowCom(true);
    setPerformanceCom(true);
  };

  const closeShowCom = () => setShowCom(false);
  const closePerCom = () => setPerformanceCom(false);

  return (
    <div className={Classes.BG}>
      {props.show ? (
        <div>
          <SelectingClass onClick={setGetClassHandler.bind(this)} 
          lable={HomeCTX.selectingClassClasses === null ? "Click Here" : HomeCTX.selectingClassClasses.selected}
          />
        </div>
      ) : null}
      <EachClass
        showCom={showCom}
        closeShowCom={closeShowCom}
        performanceCom={performanceCom}
        closePerCom={closePerCom}
      />
    </div>
  );
};
export default Cllass;
