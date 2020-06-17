import React from "react";
import Context from "../../../Component/Context/Context";
import Details from "./Details";
import RecordContext from "../../../Component/Context/record";

const EventDetails = () => {
  const RecordCTX = React.useContext(RecordContext);
  const CTX = React.useContext(Context);
  const [accountDetails, setAccountDetails] = React.useState({
    account: [],
    _id: "",
    class_name: "",
    class_name_id: "",
    term_id: "",
    term: ""
  });

  // GEtTing Each Record by the schema ID
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const getRecordByID = () => {
    setErr(false);
    setLoading(true);
    fetch(
      `http://localhost:2222/admin/get_record_details/${RecordCTX.accountRecordID}`,
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
        setErr(false);
        setLoading(false);
        setAccountDetails(res.result);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  React.useEffect(
    _ => {
      if (RecordCTX.accountRecordID === null) {
        return;
      } else {
        getRecordByID();
      }
    },
    [RecordCTX.accountRecordID]
  );

  const onChangeInput = (i, e) => {
    let spread = { ...accountDetails };
    spread.account[i][e.target.name] = e.target.value;
    setAccountDetails(spread);
  };

  const saveEditedTransaction = e => {
    e.preventDefault();
    setErr(false);
    setLoading(true);
    fetch(
      `http://localhost:2222/admin/put_each_account_after_editing/${RecordCTX.accountRecordID}`,
      {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        }),
        body: JSON.stringify({
          payload: accountDetails.account
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        setAccountDetails(res.result);
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  return (
    <div>
      <Details
        accountDetails={accountDetails}
        loading={loading}
        err={err}
        getRecordByID={getRecordByID}
        onChangeInput={onChangeInput}
        setAccountDetails={res => setAccountDetails(res)}
        saveEditedTransaction={saveEditedTransaction}
      />
    </div>
  );
};

export default EventDetails;
