import React from "react";
import Classes from "./Teacher.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import GoBack from "../../Component/UI/GoBack/GoBack";
import TeacherListEvent from "./TeachersList_Event/TeachersList_Event";

const Teacher = props => {
  const GobackHandler = () => {
    props.history.goBack();
  };

  const [totalTeachers, setTotalTeachers] = React.useState(0)

  // setting total teachers 
  const setTotal = (total) => {
    setTotalTeachers(total)
  }
  return (
    <>
      <Nav />
      <GoBack Goback={GobackHandler} />
      <div className={Classes.pageDiscription}>Teachers Management</div>
      <div className={Classes.Teacher}>
        <div className={Classes.Flex}>
          <div></div>
          <div>Total: {totalTeachers}</div>
        </div>
          <TeacherListEvent total={setTotal.bind(this)} />
      </div>
    </>
  );
};

export default Teacher;
