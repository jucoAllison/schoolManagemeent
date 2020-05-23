import React from "react";
import Classes from "./YearTerm.module.css";
import { Link } from "react-router-dom";
import Context from '../../../Context/Context';

const YearTerm = props => {
  const CTX = React.useContext(Context)
  return (
    <div className={Classes.YearAndTerm}>
      <Link style={{textDecoration: "none", color: "inherit"}} to="/set_my_Account">
        <div className={Classes.flex}>
          {/* EVERYTHING IN THIS DIV WILL BE FETCHED FROM THE BACKEND THIS AND THIS IS THE YEAR THAT WILL BE ATTARCHED TO ALL TEACHERS DIARY AND ALSO TO ALL RESULT THIS IS THE MAIN YEAR */}
          <label>Year</label>
          <input readOnly placeholder="20.." value={CTX.yearValue === undefined ? "" : CTX.yearValue.year} />
        </div>
      </Link>

      <Link style={{textDecoration: "none", color: "inherit"}} to="/set_my_Account">
        <div className={Classes.flex}>
          {/* EVERYTHING IN THIS DIV WILL BE FETCHED FROM THE BACKEND THIS AND THIS IS THE TERM THAT WILL BE ATTARCHED TO ALL TEACHERS DIARY AND ALSO TO ALL RESULT THIS IS THE MAIN TERM */}
          <label>Term</label>
          <input readOnly placeholder="1-2-3" value={CTX.termValue === undefined ? "" : CTX.termValue.term} />
        </div>
      </Link>
    </div>
  );
};

export default YearTerm;
