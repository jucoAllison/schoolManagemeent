import React from "react";
import Classes from "./MainMaster.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import MasterSheetContext from "../../Component/Context/MasterSheet";
import MasterSheet from "./MainMaster";
import Context from "../../Component/Context/Context";
import Loading from "../../Component/UI/Loading/Loading";
import { ReactComponent as Retry } from "../../Assert/retry.svg";

const EventMainMaster = props => {
  const GobackHandler = () => {
    props.history.goBack();
  };

  const MasterCTX = React.useContext(MasterSheetContext);
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [master, setMaster] = React.useState([]);
  const [classSubject, setClassSubject] = React.useState([]);

  const getMasterSheet = () => {
    setLoading(true);
    setErr(false);
    fetch(
      `http://localhost:2222/admin/get_master_sheet/${MasterCTX.classDetails[0]._id}/${MasterCTX.yearDetails[0]._id}/${MasterCTX.termDetails[0]._id}`,
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
        setMaster(res.result);
        setClassSubject(res.class_subject);
        setErr(false);
        setLoading(false);
      })
      .catch(err => {
        setErr(true);
        setLoading(false);
      });
  };

  React.useEffect(_ => {
    getMasterSheet();
  }, []);

  let CHECKING;
  if (loading) {
    CHECKING = <Loading />;
  } else if (err) {
    CHECKING = (
      <div
        className={Classes.message}
        style={{ marginTop: "30px" }}
        onClick={getMasterSheet}
      >
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else {
    CHECKING = (
      <div>
        <MasterSheet classSubject={classSubject} master={master} />
        <div
          onClick={master.length < 1 ? null :  window.print}
          style={{
            backgroundColor: "#fff",
            textAlign: "center",
            color: "#e72626",
            fontSize: "13.7px"
          }}
        >
          {master.length < 1 ? "No Master Sheet Found" : "Download"}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Nav />
      <Goback Goback={GobackHandler} />
      <div className={Classes.Modal2}>
        <h4 style={{ backgroundColor: "inherit", textAlign: "center" }}>
          {MasterCTX.yearDetails[0].yearName} Master Sheet For "
          {MasterCTX.classDetails[0].ClassName}"{" "}
          {MasterCTX.termDetails[0].termName} Term
        </h4>
        {CHECKING}
      </div>
    </div>
  );
};

export default EventMainMaster;
