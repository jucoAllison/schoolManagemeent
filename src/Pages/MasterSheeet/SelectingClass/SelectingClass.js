import React from "react";
import SelectingClass from "../../../Component/UI/SelectingClass/SelectingClass";
import Classes from "./SelectingClass.module.css";
import { Value, Select } from "../../../Component/UI/Select/Select";
import Context from "../../../Component/Context/Context";
import MasterSheetContext from "../../../Component/Context/MasterSheet";
// import MasterModal from "./MasterSheetCover/MasterSheetCover"
import {Link} from "react-router-dom"

const SelectingClasss = () => {
  const MasterCTX = React.useContext(MasterSheetContext);
  const CTX = React.useContext(Context);

  const setGetClassHandler = (id, name, ok) => {
    MasterCTX.setClassDetails({
      classIDDetails: [{ _id: id, ClassName: name }]
    });
  };

  const setYearIDDetails = (id, name, ok) => {
    MasterCTX.setYearDetails({ yearDetails: [{ _id: id, yearName: name }] });
  };

  const setTermIDDetails = (id, name, ok) => {
    MasterCTX.setTermDetails({termDetails: [{ _id: id, termName: name }]});
  };

  // Everything about GETTING AND SHOWING  AVIABLE SCHOOL YEAR
  // Everything about GETTING AND SHOWING  AVIABLE SCHOOL YEAR
  // Everything about GETTING AND SHOWING  AVIABLE SCHOOL YEAR
  const [allYears, setAllYears] = React.useState([{ _id: "", year: "" }]);
  const [yearErr, setYearErr] = React.useState(false);
  const [loadingYear, setLoadingYear] = React.useState(false);
  const getAvialbleYear = () => {
    if (allYears[0]._id === "") {
      setLoadingYear(true);
      setYearErr(false);
      fetch("http://localhost:2222/admin/avialble_year", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      })
        .then(res => res.json())
        .then(res => {
          setAllYears(res.result);
          setLoadingYear(false);
        })
        .catch(err => {
          alert("Check Internet Connection and Continue");
          setLoadingYear(false);
          setYearErr(true);
        });
    } else {
      return;
    }
  };
  // END OF Everything about GETTING AND SHOWING  AVIABLE SCHOOL YEAR
  // END OF Everything about GETTING AND SHOWING  AVIABLE SCHOOL YEAR

  // Everything about GETTING AND SHOWING  AVIABLE TERM int the SElected YEAR
  // Everything about GETTING AND SHOWING  AVIABLE TERM int the SElected YEAR
  // Everything about GETTING AND SHOWING  AVIABLE TERM int the SElected YEAR
  const [loadingTerm, setLoadingTerm] = React.useState(false);
  const [allTerms, setAllTerms] = React.useState([
    { _id: "", term: "", year_id: "" }
  ]);
  const [termErr, setTermErr] = React.useState(false);
  const getAvaibleTerm = () => {
    if (MasterCTX.yearDetails == null) {
      return;
    } else {
      setLoadingTerm(true);
      setTermErr(false);
      fetch(
        `http://localhost:2222/admin/aviable_term_in_year/${MasterCTX.yearDetails[0]._id}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${CTX.token.token}`
          })
        }
      )
        .then(res => res.json())
        .then(res => {
          setAllTerms(res.result);
          setTermErr(false);
          setLoadingTerm(false);
        })
        .catch(err => {
          alert("Check Internet Connection and Continue");
          setLoadingTerm(false);
          setTermErr(true);
          // getAvaibleTerm()
        });
    }
  };

  React.useEffect(
    _ => {
      getAvaibleTerm();
    },
    [MasterCTX.yearDetails]
  );

  // MAppinG YEaRs and Term

  const mappedYears = allYears
    .filter(v => v._id !== "")
    .map(v => {
      return (
        <div key={v._id}>
          <Value onClick={setYearIDDetails.bind(this, v._id, v.year)}>
            {v.year}
          </Value>
        </div>
      );
    });

  const mappedTerms = allTerms
    .filter(v => v._id !== "")
    .map(v => {
      return (
        <div key={v._id}>
          <Value onClick={setTermIDDetails.bind(this, v._id, v.term)}>
            {v.term}
          </Value>
        </div>
      );
    });

  console.log(MasterCTX);

  return (
    <div onClick={getAvialbleYear} style={{ backgroundColor: "#fff" }}>
      <SelectingClass onClick={setGetClassHandler.bind(this)} lable={MasterCTX.classDetails === null ? "Click Here" : MasterCTX.classDetails[0].ClassName} />

      {/* getting the aviable years and selecting one on other to bring up the availble year */}
      {MasterCTX.classDetails == null ? null : (
        <div className={Classes.SelectTerm}>
          <h4>Select Year</h4>
          {/* ALL this Years will please Fetch from BackEnd */}
          <div className={Classes.select}>
            <Select
              catchh={yearErr}
              loading={loadingYear}
              lable={MasterCTX.yearDetails === null ? "Click Here" : MasterCTX.yearDetails[0].yearName}
              className={Classes.select}
              height={allYears.length < 6 ? "auto" : "200px"}
            >
              {mappedYears}
            </Select>
          </div>
        </div>
      )}

      {/* getting the aviable Terms in the selected year in other to bring up the master Sheet */}
      {MasterCTX.yearDetails == null ? null : (
        <div className={Classes.SelectTerm}>
          <h4>Select Term</h4>
          {/* ALL this Terms will please Fetch from BackEnd */}
          <div onClick={getAvaibleTerm} className={Classes.select}>
            <Select
              catch={termErr}
              loading={loadingTerm}
              lable={MasterCTX.termDetails === null ? "Click Here" : MasterCTX.termDetails[0].termName}
              className={Classes.select}
              height="auto"
            >
              {mappedTerms}
            </Select>
          </div>
        </div>
      )}
      {MasterCTX.termDetails == null ? null : (
        <Link to="/download=>_masterSheet" style={{marginTop: "10px", backgroundColor: "inherit", textDecoration: 'none'}}><div style={{backgroundColor: "inherit", textAlign: "center", color: "#e72626", fontSize: "12px"}}>Get Master Sheet </div></Link>
        // <MasterModal />
      )}
    </div>
  );
};

export default SelectingClasss;
