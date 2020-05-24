import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import GoBack from "../../Component/UI/GoBack/GoBack";
import StudentMainDetails from "./StudentMainDetails/StudentFormEvent/index";
import HomeContext from "../../Component/Context/HomeContext";
const StudentDetails = props => {
  const HomeCTX = React.useContext(HomeContext);
  const GobackHandler = () => {
    props.history.goBack();
  };

  console.log(HomeCTX.clickedDetails)

  return (
    <>
      <Nav />
      <GoBack Goback={GobackHandler} />
      <div style={{ textAlign: "center", margin: "40px 0px", color: "#000", textTransform: "capitalize" }}>
        Full Details of {HomeCTX.clickedDetails.full_name}
      </div>

      <StudentMainDetails
        eachId={HomeCTX.clickedDetails._id}
        update={props.update}
        ChangedClassToTrue={props.ChangedClassToTrue}
      />
    </>
  );
};

export default StudentDetails;
