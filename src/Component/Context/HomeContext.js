import React from "react"

export default React.createContext({
    // this two context is for the main page show the one that was clicked
    clickedHandler: null,
    setClickedHandler: () => {},
    // this ones is for selcting class whether it is for classess or for students
    selectingClassClasses: null,
    selectingClassStudents: null,
    setSelectingClass: () => {},
    // clicked student in the selecting class
    clickedDetails: null,
    setClickedDetails: () => {},
    // fro deleting students
    deletingStudent: null,
    setDeletingStudent : () => {}
})