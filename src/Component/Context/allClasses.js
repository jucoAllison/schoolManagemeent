import React from "react";

export default React.createContext({
  allClasses: [{ className: "", _id: "" }],
  setAllClasses: classes => {},

  // this context is for teacher_list
  teacherList: null,
  setTeacherList: results => {},

  // this context is for management Component
  managementList: null,
  setManagementList: result => {},

  // this context is for CALANDAR Component
  calendar: null,
  setCalendar: result => {}
});
