import React from "react";
import Classes from "./ChangePros.module.css";
import Event from "./Props/Event";
import SelectingClass from "../../../Component/UI/SelectingClass/SelectingClass";

const ChangePros = props => {
  const [getclass, setGetClass] = React.useState([]);

  const option = (id,) => {
    setGetClass([{ _id: id,}]);
  };


  if (!props.show) {
    return null;
  }
  return (
    <div className={Classes.ChangePropsAS}>
      <SelectingClass  onClick={option.bind(this)} />
      <Event getclass={getclass} />
    </div>
  );
};

export default ChangePros;
