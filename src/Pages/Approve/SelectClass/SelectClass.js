import React from "react";
import Classes from "./SelectClass.module.css";
import { Select, Value } from "../../../Component/UI/Select/Select";
import GetStudent from "./GetStudent/GetStudent";
import SelectingClass from "../../../Component/UI/SelectingClass/SelectingClass";
import Loading from "../../../Component/UI/Loading/Loading";
import Context from "../../../Component/Context/Context";
import AprovalContext from "../../../Component/Context/Approval";
import App from "../../../Container/App";

const SelectClass = () => {
  const CTX = React.useContext(Context);
  const AppCTX = React.useContext(AprovalContext);
  const [classID, setClassID] = React.useState([]);

  const setGetClassHandler = (id, name, ok) => {
    setClassID([{ _id: id, ClassName: name }]);
    AppCTX.setClassID({ _id: id, namee: name });
  };

  const [terms, setTerms] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getAvailbleTerms = () => {
    if (terms.length > 0) {
      return;
    } else {
      setLoading(true);
      fetch("http://localhost:2222/admin/avialble_term", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      })
        .then(res => res.json())
        .then(res => {
          setTerms(res.result);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          alert("Check Your Internet Connection and Continue");
        });
      }
    };
    
    const [selectedTerm, setSelectedTerm] = React.useState([]);
    
    const setTermID = (id, name, e) => {
      AppCTX.setTermID({ _id: id , termName: name});
    setSelectedTerm([{ _id: id, termName: name }]);
  };

  const mappedTerms = terms.map(v => {
    return (
      <div key={v._id}>
        <Value onClick={setTermID.bind(this, v._id, v.term)}>
          {loading ? <Loading /> : v.term}
        </Value>
        {/* <Value */}
      </div>
    );
  });


  return (
    <>
      <div onClick={getAvailbleTerms} className={Classes.Select}>
        <div style={{ backgroundColor: "#fff" }}>
          <SelectingClass
            // event={props.getEachClassStudent}
            // name={props.name}
            onClick={setGetClassHandler.bind(this)}
            lable={AppCTX.namee === null ? "Click Here" : AppCTX.namee}
          />
          {AppCTX.classID === null ? null : (
            <div className={Classes.SelectTerm}>
              <h4>Select Term</h4>
              {/* ALL this Classes will please Fetch from BackEnd */}
              <div className={Classes.select}>
                <Select
                  // catch={catchErr}
                  lable={AppCTX.termName === null ? "Click Here" : AppCTX.termName}
                  className={Classes.select}
                  height="auto"
                >
                  {mappedTerms}
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
      <GetStudent classID={classID} selectedTerm={selectedTerm} />
    </>
  );
};

export default SelectClass;
