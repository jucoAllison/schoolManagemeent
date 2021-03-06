import React from "react";
import Classes from "./StudentsClass.module.css";
import StudentList from "./StudentList/StudentList";
import SelectingClass from "../../../../Component/UI/SelectingClass/SelectingClass";
import HomeContext from "../../../../Component/Context/HomeContext";

const StudentsClass = props => {
  const HomeCTX = React.useContext(HomeContext);
  const setGetClassHandler = (id, name, ok) => {
    HomeCTX.setSelectingClass({ _id: id, selected: name });
  };
  return (
    <div className={Classes.BG}>
      <div>
        <SelectingClass
          // event={props.getEachClassStudent}
          // name={props.name}
          onClick={setGetClassHandler.bind(this)}
          lable={
            HomeCTX.selectingClassStudents === null
              ? "Click Here"
              : HomeCTX.selectingClassStudents.selected
          }
        />
      </div>

      {HomeCTX.selectingClassStudents === null ? null : (
        <StudentList
          // show={props.show}
          err={props.err}
          loading={props.loading}
          message={props.message}
          className={props.className}
          total={props.total}
          StudentNames={props.StudentNames}
          getEachClassStudent={props.getEachClassStudent}
        />
      )}
    </div>
  );
};
export default StudentsClass;
