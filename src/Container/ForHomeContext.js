import React from "react";
import Route from "../Component/Route/Route";
import HomeContext from "../Component/Context/HomeContext";

class ForHomeContext extends React.Component {
  state = {
    clickedHandler: { student: false, message: false, class: false },
    selectingClassClasses: null,
    selectingClassStudents: null
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

  render() {
    return (
      <HomeContext.Provider
        value={{
          setClickedHandler: this.setClickedHandler,
          clickedHandler: this.state.clickedHandler,
          selectingClassClasses: this.state.selectingClassClasses,
          selectingClassStudents: this.state.selectingClassStudents,
          setSelectingClass: this.setSelectingClass
        }}
      >
        <Route />
      </HomeContext.Provider>
    );
  }
}

export default ForHomeContext;