import React from "react";
import Calendar from "./Calendar";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Context from "../../Component/Context/Context";
import CalendarContext from "../../Component/Context/allClasses";

const Event = props => {
  const CalendarCTX = React.useContext(CalendarContext);
  const GobackHandler = () => {
    props.history.goBack();
  };
  const CTX = React.useContext(Context);

  // this hooks turns on oops you don't have any calendar
  const [message, setMessage] = React.useState(false);
  const [Loading, setloading] = React.useState(false);
  const [err, setErr] = React.useState(false);

  // GETTING ALL CALENDARS AND RUNNING THEM IN USEEFFECT
  const getAllCalendar = () => {
    setloading(true);
    setMessage(false);
    setErr(false);
    fetch("http://localhost:2222/admin/schoolCalendar", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setloading(false);
        if (res.result.length > 0) {
          CalendarCTX.setCalendar({calendar: res.result});
        } else {
          setMessage(true);
        }
      })
      .catch(err => {
        setloading(false);
        setErr(true);
      });
  };
  React.useEffect(_ => {
    if(CalendarCTX.calendar[0].calendar === ""){
      getAllCalendar();
    }else{
      return
    }
  }, []);

  // EVERTHING ABOUT POSTING NEW CALENDAR AND PUSHING IT TO THE ARRAY IN calendar AnD ALSO setLoading to true in other to change to ... WHEN loading
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onChange = e => {
    setValue(e.target.value);
  };

  // Submitting Form  ---- POST REQUEST
  const onSubmit = e => {
    setLoading(true);
    e.preventDefault();
    // alert("its Working")
    fetch("http://localhost:2222/admin/schoolCalendar", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        calendar: value
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setMessage(false);
        setValue("");
        const spread = [...CalendarCTX.calendar];
        spread.push(res.result);
        let Check = spread.filter(v => {
          return v._id !== "";
        });
        CalendarCTX.setCalendar({calendar: Check});
      })
      .catch(err => {
        setLoading(false);
        alert("Oops an Error Occured Check Your Internet");
      });
  };

  // DELETE REQUEST
  const deleteCalHandler = (e, id) => {
    fetch(`http://localhost:2222/admin/schoolCalendar/${e}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        let remove = CalendarCTX.calendar.filter(v => {
          return v._id !== e;
        });
        CalendarCTX.setCalendar({calendar: [...remove]});
      })
      .catch(err => alert("Check Internet Connection And Continue"));
  };

  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px" }}>Calendar</div>
      <Calendar
        getAllCalendar={getAllCalendar}
        err={err}
        message={message}
        loading={loading}
        loadingloading={Loading}
        onSubmit={onSubmit}
        value={value}
        onChange={onChange.bind(this)}
        deleteCal={deleteCalHandler.bind(this)}
      />
    </div>
  );
};

export default Event;
