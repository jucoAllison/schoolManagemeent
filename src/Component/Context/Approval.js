import React from "react";

export default React.createContext({
  classID: null,
  namee: null,
  setClassID: (_id, name) => {},
  termID: null,
  termName: "Click Here",
  setTermID: (_id) => {}
});
