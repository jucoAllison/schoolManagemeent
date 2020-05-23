import React from "react";
import Classes from "./MainFeeSchedule.module.css";
import SelectingClass from "../../../Component/UI/SelectingClass/SelectingClass";
import Event from "./Each/Event";

const MainFeeSchedule = props => {
  const [getclass, setGetClass] = React.useState([]);

  const option = (id,) => {
    setGetClass([{ _id: id,}]);
  };


  if (!props.show) {
    return null;
  }
  return (
    <div className={Classes.ChangeProps}>
      <SelectingClass  onClick={option.bind(this)} />
      <Event getclass={getclass} />
    </div>
  );
};

export default MainFeeSchedule;
