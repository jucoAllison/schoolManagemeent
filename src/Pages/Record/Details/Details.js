import React from "react";
import Classes from "./Details.module.css";
import { ReactComponent as Retry } from "../../../Assert/retry.svg";
import Loading from "../../../Component/UI/Loading/Loading";
import AddDetails from "./AddDetaiils/AddDetails";

import { ReactComponent as CHECK } from "../../../Assert/checked.svg";
import { ReactComponent as Edit } from "../../../Assert/edit.svg";

const Details = props => {
  const dateRef = React.useRef();
  const transactionRef = React.useRef();
  const detialsRef = React.useRef();
  const amountRef = React.useRef();
  const balanceRef = React.useRef();

  const [readOnly, setReadOnly] = React.useState(false);

  const Mapped = (
    // props.accountDetails.map((v, i) => {
    // require(
    <div className={Classes.Conttain}>
      <div className={Classes.FlexTerm}>
        <div>{props.accountDetails.term} Term</div>
        <div>{props.accountDetails.year}</div>
        <div>{props.accountDetails.class_name}</div>
      </div>
      <div className={Classes.GridStatementOfAccount}>
        <div className={Classes.header}>Date: mm-dd-yy</div>
        <div className={Classes.header}>Transaction</div>
        <div className={Classes.header}>Details</div>
        <div className={Classes.header}>Amount</div>
        <div className={Classes.header}>Balance</div>
      </div>
      <div style={{ backgroundColor: "inherit" }}>
        {props.accountDetails.account.map((b, i) => (
          <div style={{ backgroundColor: "inherit" }} key={b._id}>
            <div
              style={{
                border: readOnly ? null : ".7px solid #454f51",
                backgroundColor: "inherit"
              }}
              className={Classes.GridStatementOfAccount}
            >
              <input
                className={readOnly ? Classes.NOReadONly : Classes.ReadONly}
                type="date"
                name="date"
                onChange={props.onChangeInput.bind(this, i)}
                value={b.date}
                readOnly={readOnly ? false : true}
                ref={dateRef}
              />
              <input
                className={readOnly ? Classes.NOReadONly : Classes.ReadONly}
                type="text"
                name="transaction"
                onChange={props.onChangeInput.bind(this, i)}
                value={b.transaction}
                readOnly={readOnly ? false : true}
                ref={transactionRef}
              />
              <input
                className={readOnly ? Classes.NOReadONly : Classes.ReadONly}
                type="text"
                name="detials"
                onChange={props.onChangeInput.bind(this, i)}
                value={b.detials}
                readOnly={readOnly ? false : true}
                ref={detialsRef}
              />
              <input
                className={readOnly ? Classes.NOReadONly : Classes.ReadONly}
                type="number"
                name="amount"
                onChange={props.onChangeInput.bind(this, i)}
                value={b.amount}
                readOnly={readOnly ? false : true}
                ref={amountRef}
              />
              <input
                className={readOnly ? Classes.NOReadONly : Classes.ReadONly}
                type="number"
                name="balance"
                onChange={props.onChangeInput.bind(this, i)}
                value={b.balance}
                readOnly={readOnly ? false : true}
                ref={balanceRef}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // );
  // });

  // CHECKING WHEN GETTING IT WILL SHOW LOADING
  let CHECKING = null;
  if (props.loading) {
    CHECKING = (
      <div className={Classes.loading}>
        <Loading />
      </div>
    );
  } else if (props.err) {
    CHECKING = (
      <div className={Classes.message} onClick={props.getRecordByID}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else if (props.accountDetails.account.length < 1) {
    CHECKING = (
      <div className={Classes.message}>
        Empty Record. Post new account record to continue
      </div>
    );
  } else {
    CHECKING = Mapped;
  }

  return (
    <div className={Classes.background}>
      <div className={Classes.Scroll}>
        <div className={Classes.HAndleScroll}>
          {props.accountDetails.account.length < 1 ? null : (
            <div
              style={{
                backgroundColor: "inherit",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div style={{ backgroundColor: "inherit" }}>
                {readOnly ? (
                  <div
                    onClick={props.saveEditedTransaction}
                    style={{ backgroundColor: "inherit" }}
                  >
                    <CHECK
                      style={{ backgroundColor: "#fff", marginLeft: "5px" }}
                      width="20"
                      height="20"
                      fill="#76848d"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              {readOnly ? (
                <div
                  onClick={() => setReadOnly(!readOnly)}
                  style={{
                    backgroundColor: "inherit",
                    color: "#76848d",
                    cursor: "pointer"
                  }}
                >
                  X
                </div>
              ) : (
                <div
                  onClick={() => setReadOnly(!readOnly)}
                  style={{ backgroundColor: "inherit", cursor: "pointer" }}
                >
                  <Edit
                    style={{ backgroundColor: "#fff", marginLeft: "5px" }}
                    width="20"
                    height="20"
                    fill="#76848d"
                  />
                </div>
              )}
            </div>
          )}
          {CHECKING}
          <div style={{ backgroundColor: "inherit" }}>
            <AddDetails setAccountDetails={props.setAccountDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
