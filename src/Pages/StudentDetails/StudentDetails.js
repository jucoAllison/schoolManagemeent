import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import GoBack from "../../Component/UI/GoBack/GoBack";
const StudentDetails = props => {
    const GobackHandler = () => {
        props.history.goBack();
      };
    
    return (
        <>
          <Nav />
          <GoBack Goback={GobackHandler} />
          <div style={{ textAlign: "center", margin: "40px 0px",color: "#000" }}>Full Details of {"Hello_World"}</div>
        </>
      );
}

export default StudentDetails;
