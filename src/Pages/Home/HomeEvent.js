import React from "react";
import MainHome from "./index";
import Context from "../../Component/Context/Context";

const HomeEvent = () => {
  const CTX = React.useContext(Context);
  const [changing, setChanging] = React.useState(0);

  const [totalStudent, setTotalStudent] = React.useState(0);
  const fetchTotalStudent = () => {
    fetch("http://localhost:2222/admin/getstudents", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => setTotalStudent(res.result))
      .catch(err =>
        alert(
          "Looks like you are offline check internet connection and continue"
        )
      );
  };

  const [totalMessages, setTotalMessages] = React.useState(0);
  const fetchTotalMessages = () => {
    fetch("http://localhost:2222/admin/total/messages", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => setTotalMessages(res.result))
      .catch(err =>
        alert(
          "Looks like you are offline check internet connection and continue"
        )
      );
  };

  const [totalClasses, setTotalClasses] = React.useState(0);
  const fetchTotalClasses = () => {
    fetch("", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => setTotalClasses(res.result))
      .catch(err =>
        alert(
          "Looks like you are offline check internet connection and continue"
        )
      );
  };

  React.useEffect(
    _ => {
      setTimeout(() => {
        setChanging(changing + 1);
      }, 1000000);
      //   console.log("going to fetch all the message, class and student again");
      fetchTotalStudent();
      fetchTotalMessages();
    //   fetchTotalClasses();
    },
    [changing]
  );
  return (
    <div>
      <MainHome
        totalStudent={totalStudent}
        totalMessages={totalMessages}
        totalClasses={totalClasses}
      />
    </div>
  );
};

export default HomeEvent;
