import React from "react";
import Classes from "./PostCalendar.module.css";
import InputAdd from "../../../Component/UI/inputAdd/inputAdd";

const PostCalendar = props => {
  return (
    <div className={Classes.BgColor}>
      <div className={Classes.Select}>
        <div style={{ backgroundColor: "#fff" }}>
          <InputAdd
            onSubmit={props.onSubmit}
            value={props.value}
            onChange={props.onChange.bind(this)}
            loading={props.loading}
            placeholder="Date... Details"
            label="Post_Calendar"
          />
        </div>
        <div className={Classes.loading}></div>
      </div>
    </div>
  );
};

export default PostCalendar;
