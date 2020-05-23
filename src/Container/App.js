import React, { Component } from "react";
// import Home from "../Pages/Home/index";
import Context from "../Component/Context/Context";
import ApprovalContext from "../Component/Context/Approval";
import ClassesContext from "../Component/Context/allClasses";
import MasterSheetContext from "../Component/Context/MasterSheet";
import ForHomeContext from "./ForHomeContext";


class App extends Component {
  // Setting up the Contex using the appJs

  state = {
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsIl9pZCI6IjVlMTgyMDJkOTZhNjM4NGVhNWQyNGNjYSIsImlhdCI6MTU3ODk5NjY5OSwiZXhwIjoxNTc5MDgzMDk5fQ.yXK3el7clve_RQF7k8DIvdDvAE1m94TL23UD30RXV3A"
    termValue: null,
    yearValue: null,
    allowAccess: null,
    main_admin: null,
    token: null,
    // for  Approving Result
    termID: null,
    namee: null,
    classID: null,
    termName: "Click Here",

    // from allClasses Context
    allClasses: [{ className: "", _id: "" }],

    //CONTEXT VALUE FOR MASTERSHEET
    classDetails: null,
    yearDetails: null,
    termDetails: null,

    //Context for teacher Component but appended to  "ClassesContext"
    teacherList: [{ full_name: "", _id: "", assignClass: "" }],
    //Context for MANAGEMENT Component but appended to  "ClassesContext"
    managementList: [{ allowAccess: false, _id: "", username: "", phone: "" }],
    //Context for CALENDAR Component but appended to  "ClassesContext"
    calendar: [{ _id: "", calendar: "" }]
  };
  setClassID = namee =>
    this.setState({ classID: namee._id, namee: namee.namee });
  setTermID = _id => this.setState({ termID: _id._id, termName: _id.termName });

  // getting all the Classes once the Admin is logged IN
  getAllClasses = () => {
    fetch("http://localhost:2222/admin/class", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ allClasses: res.result });
      })
      .catch(err => {
        alert("Check Internet Connection and Continue");
        this.getAllClasses();
      });
  };

  contextloginHandler = token => {
    this.setState({
      token: token,
      termValue: token.termValue,
      yearValue: token.yearValue,
      allowAccess: token.allowAccess,
      main_admin: token.main_admin
    });
  };

  //  for allClassess Context
  setClasses = () => {
    this.getAllClasses();
  };

  // FOR ALL MASTERSHEET
  setClassDetails = payload =>
    this.setState({ classDetails: payload.classIDDetails });
  setYearDetails = payload =>
    this.setState({ yearDetails: payload.yearDetails });
  setTermDetails = payload =>
    this.setState({ termDetails: payload.termDetails });
  //for teacher Component
  setTeacherList = payload =>
    this.setState({ teacherList: payload.teacherList });
  //for MANAGEMENT Component
  setManagementList = payload =>
    this.setState({ managementList: payload.managementList });
  //for CALENDAR Component
  setCalendar = payload => this.setState({ calendar: payload.calendar });

  render() {
    return (
      <Context.Provider
        value={{
          login: this.contextloginHandler,
          token: this.state.token,
          termValue: this.state.termValue,
          yearValue: this.state.yearValue,
          allowAccess: this.state.allowAccess,
          main_admin: this.state.main_admin
        }}
      >
        <ApprovalContext.Provider
          value={{
            classID: this.state.classID,
            namee: this.state.namee,
            setClassID: this.setClassID,
            termID: this.state.termID,
            setTermID: this.setTermID,
            termName: this.state.termName
          }}
        >
          <ClassesContext.Provider
            value={{
              allClasses: this.state.allClasses,
              setAllClasses: this.setClasses,
              //  teacher context side ie teacher component
              teacherList: this.state.teacherList,
              setTeacherList: this.setTeacherList,
              //  Management context side ie Management component
              managementList: this.state.managementList,
              setManagementList: this.setManagementList,
              // CALANDAR CONTEXT side ie CALAENDAR COMPONENT
              calendar: this.state.calendar,
              setCalendar: this.setCalendar
            }}
          >
            <MasterSheetContext.Provider
              value={{
                classDetails: this.state.classDetails,
                setClassDetails: this.setClassDetails,
                yearDetails: this.state.yearDetails,
                setYearDetails: this.setYearDetails,
                termDetails: this.state.termDetails,
                setTermDetails: this.setTermDetails
              }}
            >
              <ForHomeContext />
            </MasterSheetContext.Provider>
          </ClassesContext.Provider>
        </ApprovalContext.Provider>
      </Context.Provider>
    );
  }
}

export default App;
