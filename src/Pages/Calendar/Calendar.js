import React from "react";
import Classes from "./Calendar.module.css";

import { ReactComponent as Trash } from "../../Assert/trash.svg";
import { ReactComponent as Retry } from "../../Assert/retry.svg";
import PostCalendar from "./PostCalendar/PostCalendar";
import Loading from "../../Component/UI/Loading/Loading";
import CalendarContext from "../../Component/Context/allClasses";

const Calendar = props => {
    const CalendarCTX = React.useContext(CalendarContext);
  const mapped = CalendarCTX.calendar.map(v => {
    return (
      <div className={Classes.Flex} key={v._id}>
        <div className={Classes.eachMessage}>{v.calendar}</div>

        {/* ONCLICK on this Span, their will be an Fetch request on Delete */}
        <span onClick={props.deleteCal.bind(this, v._id)}>
          <Trash
            style={{ backgroundColor: "#fff" }}
            width="20"
            height="20"
            fill="#76848d"
          />
        </span>
      </div>
    );
  });

  // CHECKING WHEN GETTING IT WILL SHOW LOADING
  let CHECKING = null;
  if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.getAllCalendar}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else if (props.message || CalendarCTX.calendar.length < 1) {
    CHECKING = (
      <div className={Classes.message}>
        Empty calendar. Post new calendar to continue
      </div>
    );
  } else {
    CHECKING = mapped;
  }

  return (
    <>
      <div className={Classes.BgColor}>
        <div className={Classes.Calendar}>
          <PostCalendar
            value={props.value}
            onChange={props.onChange.bind(this)}
            onSubmit={props.onSubmit}
            loading={props.loading}
          />
          <div className={Classes.carrier}>
            {props.loadingloading ? <Loading /> : CHECKING}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
