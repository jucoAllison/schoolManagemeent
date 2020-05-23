import React from "react";
import Classes from "./index.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Policy from './Policy/Policy'

const Index = props => {
  const GobackHandler = () => {
    props.history.goBack();
  };
  return (
    <div className={Classes.Settings}>
      <Nav />
      <Goback Goback={GobackHandler} />
      <Policy />
    </div>
  );
};

export default Index;
