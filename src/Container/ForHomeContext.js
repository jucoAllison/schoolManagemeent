import React from "react";
import Route from "../Component/Route/Route";
import HomeContext from "../Component/Context/HomeContext";
import RecordContext from "../Component/Context/record";

class ForHomeContext extends React.Component {
  state = {
    clickedHandler: { student: false, message: false, class: false },
    selectingClassClasses: null,
    selectingClassStudents: null,
    clickedDetails: null,
    deletingStudent: null,
    accountRecordID: null,
  };

  setClickedHandler = payload => this.setState({ clickedHandler: payload });

  setSelectingClass = payload => {
      if(this.state.clickedHandler.student){
          this.setState({selectingClassStudents: {_id: payload._id, selected: payload.selected}, selectingClassClasses: null}) 
        //   this.setState({ classID: namee._id, namee: namee.namee });
      }else if (this.state.clickedHandler.class){
          this.setState({selectingClassStudents: null, selectingClassClasses: {_id: payload._id, selected: payload.selected}})
      }else{
          this.setState({selectingClassClasses: null, selectingClassStudents: null})
      }
  }

  setClickedDetails = payload => this.setState({clickedDetails: { _id: payload._id, full_name: payload.full_name, sex: payload.sex }});

  setDeletingStudent= payload =>  this.setState({deletingStudent: {_id: payload._id, name: payload.name}});

  setAccountRecordID = payload => this.setState({accountRecordID: payload.ID})

  render() {
    return (
      <HomeContext.Provider
        value={{
          setClickedHandler: this.setClickedHandler,
          clickedHandler: this.state.clickedHandler,
          selectingClassClasses: this.state.selectingClassClasses,
          selectingClassStudents: this.state.selectingClassStudents,
          setSelectingClass: this.setSelectingClass,
          clickedDetails: this.state.clickedDetails,
          setClickedDetails: this.setClickedDetails,
          deletingStudent: this.state.deletingStudent,
          setDeletingStudent: this.setDeletingStudent,
        }}
      >
        {/* for record account */}
        <RecordContext.Provider value={{
          accountRecordID: this.state.accountRecordID,
          setAccountRecordID: this.setAccountRecordID
        }}>
        <Route />
        </RecordContext.Provider>
      </HomeContext.Provider>
    );
  }
}

export default ForHomeContext;
