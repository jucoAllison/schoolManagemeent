import React from "react";
import Classes from "./AddDetails.module.css";
import Context from "../../../../Component/Context/Context";
import RecordContext from "../../../../Component/Context/record";
import UUID from "uuid";

const AddDetails = props => {
  const [showForm, setShowForm] = React.useState(false);
  const Dateref = React.useRef();
  const Transactionref = React.useRef();
  const Detailsref = React.useRef();
  const Amountref = React.useRef();
  const Balanceref = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const RecordCTX = React.useContext(RecordContext);
  const CTX = React.useContext(Context);
  // UUID for the ID that will go with the payload
  let v = UUID.v4(3);
  let j = v.split("").splice(0, 5);
  let _id = j.join("");

  //

  const sendTheForm = e => {
    e.preventDefault();
    setErr(false);
    setLoading(true);
    fetch(
      `http://localhost:2222/admin/get_record_details/${RecordCTX.accountRecordID}`,
      {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        }),
        body: JSON.stringify({
          payload: {
            date: Dateref.current.value,
            transaction: Transactionref.current.value,
            detials: Detailsref.current.value,
            amount: Amountref.current.value,
            balance: Balanceref.current.value,
            _id: _id
          }
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        props.setAccountDetails(res.result);
        Dateref.current.value = "";
        Transactionref.current.value = "";
        Detailsref.current.value = "";
        Amountref.current.value = "";
        Balanceref.current.value = "";
        setShowForm(false)
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  return (
    <div style={{ backgroundColor: "inherit" }}>
      {showForm ? (
        <form style={{ backgroundColor: "inherit" }} onSubmit={sendTheForm}>
          <div className={Classes.GridStatementOfAccount}>
            <input type="date" placeholder="Date" ref={Dateref} />
            <input type="text" placeholder="Transaction" ref={Transactionref} />
            <input type="text" placeholder="Details" ref={Detailsref} />
            <input type="number" placeholder="Amount" ref={Amountref} />
            <input type="number" placeholder="Balance" ref={Balanceref} />
            <button disabled={loading ? true : false}>submit</button>
          </div>
        </form>
      ) : null}
      <div
        onClick={() => setShowForm(!showForm)}
        className={Classes.AddDetails}
        style={{
          marginTop: showForm ? "10px" : "30px"
        }}
      >
        New Record
      </div>
    </div>
  );
};

export default AddDetails;
