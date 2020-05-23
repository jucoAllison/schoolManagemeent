import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import Card from "../../Component/UI/Card/Card";
import Classess from "./Home.module.css";
// SVG
import { ReactComponent as Student } from "../../Assert/sideBarIcon/Stu.svg";
import { ReactComponent as Message } from "../../Assert/sideBarIcon/messages.svg";
import { ReactComponent as Classes } from "../../Assert/home/message.svg";
import HomeContext from "../../Component/Context/HomeContext";
// Other Components
import Students from "./Students/Students";
import MessagePage from "./Message/Message";
import ClassesPage from "./ClassPage/ClassPage";
const Home = props => {
  const HomeCTX = React.useContext(HomeContext);
  // Handling Show Students

  const showStudentsHandler = () => HomeCTX.setClickedHandler({ student: true, message: false, class: false });

  const showMessageHandler = () => HomeCTX.setClickedHandler({ student: false, message: true, class: false });

  const showClassesHandler = () => HomeCTX.setClickedHandler({ student: false, message: false, class: true });

  return (
    <div>
      <Nav BgColor="aliceblue" />
      <div className={Classess.QuickLinks}>
        <div style={{ textDecoration: "none", cursor: "pointer" }}>
          <Card
            onClick={showStudentsHandler}
            name="Students"
            number={props.totalStudent}
            SVG={
              <Student
                style={{ backgroundColor: "inherit" }}
                width="60"
                height="60"
                fill="#fff"
              />
            }
          />
        </div>
        <div style={{ textDecoration: "none" }}>
          <Card
            onClick={showMessageHandler}
            name="Messages"
            BgColor="#808c93"
            number={props.totalMessages}
            SVG={
              <Message
                style={{ backgroundColor: "inherit" }}
                width="60"
                height="60"
                fill="#fff"
              />
            }
          />
        </div>
        <div style={{ textDecoration: "none", cursor: "pointer" }}>
          <Card
            onClick={showClassesHandler}
            name="Classes"
            number="18"
            BgColor="#e72626"
            SVG={
              <Classes
                style={{ backgroundColor: "inherit" }}
                width="60"
                height="60"
                fill="#fff"
              />
            }
          />
        </div>
      </div>

      {/* Rendering other Components */}
      {HomeCTX.clickedHandler.student ? <Students /> : null}
      {HomeCTX.clickedHandler.message ? <MessagePage /> : null}
      {HomeCTX.clickedHandler.class ? (
        <ClassesPage show={HomeCTX.clickedHandler.class} />
      ) : null}
    </div>
  );
};

export default Home;
