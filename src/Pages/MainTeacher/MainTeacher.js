import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Form from  './Form/Form';
import Class from './Classes/Classes';

const MainTeacher = props => {
  // FOR GOING BACK
  const GobackHandler = () => {
    props.history.goBack();
  };

  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />
      <Form teachersID={props.match.params.id}/>
      <Class teacherID={props.match.params.id}/>
    </div>
  );
};

export default MainTeacher;
