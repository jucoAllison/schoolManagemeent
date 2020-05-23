import React from "react";
import Classes from "./Management.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import GoBack from "../../Component/UI/GoBack/GoBack";
import ManagementListEvent from "./ManagementList_Event/ManagementList_Event";

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
      <div className={Classes.pageDiscription}>Management</div>
      <div className={Classes.Teacher}>
        <div className={Classes.Flex}>
          <div></div>
          <div>Total: {totalTeachers}</div>
        </div>
          <ManagementListEvent total={setTotal.bind(this)} />
      </div>
    </>
  );
};

export default Teacher;
