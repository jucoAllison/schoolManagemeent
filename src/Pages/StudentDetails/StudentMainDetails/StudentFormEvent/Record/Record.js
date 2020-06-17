import React from "react";
import Classes from "../Delete/Delete.module.css";
import Modal from "../../../../../Component/UI/Modal/Modal";
import Loading from "../../../../../Component/UI/Loading/Loading";
import { Link } from "react-router-dom";
import { ReactComponent as Retry } from "../../../../../Assert/retry.svg";
import RecordContext from "../../../../../Component/Context/record";

const Record = props => {
  const RecordCTX = React.useContext(RecordContext);
  let Capital = (
    <div
      style={{
        textTransform: "capitalize",
        color: "#e72626",
        backgroundColor: "inherit"
      }}
    >
      {props.full_name}
    </div>
  );


  // MAPPING THE FETCHED RECORDS
  const MAPPING = props.records
    .filter(a => {
      return a.term !== "";
    })
    .map(v => {
      return (
        <div
          style={{
            margin: "0px 0px 15px 0px",
            backgroundColor: "inherit",
            display: "flex",
            justifyContent: "space-betweeResultn"
          }}
          key={v._id}
        >
          <Link
            style={{ color: "#198dfb", cursor: "pointer" }}
            to={`/Record_for_=>_/${props.full_name}`}
          >
            <li
              onClick={() => RecordCTX.setAccountRecordID({ ID: v._id })}
              style={{
                backgroundColor: "#fff",
                listStyle: "none",
                fontSize: "13px",
                fontWeight: "bold"
              }}
            >
              {v.term} Term Payment Record
            </li>
          </Link>
        </div>
      );
    });

  let CHECKING;
  if (props.loading) {
    CHECKING = (
      <div
        style={{
          width: "300px",
          maxWidth: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Loading />
      </div>
    );
  } else if (props.message.length > 2) {
    CHECKING = (
      <div
        style={{
          backgroundColor: "inherit"
        }}
      >
        <div
          style={{
            backgroundColor: "inherit",
            fontSize: "11px",
            fontWeight: "bold",
            width: "300px",
            margin: "auto",
            maxWidth: "80%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {props.message}
        </div>
        {props.message === "Account Record is Complete" ? null : (
          <div
            onClick={props.CreateNewRecordAccount}
            className={Classes.CreateBTN}
          >
            {props.loading ? "..." : "Create New Record"}
          </div>
        )}
      </div>
    );
  } else if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.GetStudentAccount}>
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
    CHECKING = null;
  }

  return (
    <div>
      <Modal top="190px" show={props.showModal} close={props.closeShowModal}>
        <div style={{ backgroundColor: "inherit" }}>
          <div className={Classes.Delete}>
            <h4 style={{ marginBottom: "20px" }}>{Capital} Payment Records</h4>
          </div>
          {MAPPING}
          {CHECKING}
        </div>
      </Modal>
    </div>
  );
};

export default Record;
