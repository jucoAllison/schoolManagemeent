import React from "react";
import Loading from "../../../../../Component/UI/Loading/Loading";
import Context from "../../../../../Component/Context/Context";

const Deleting = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const deleteThisResult = () => {
    setErr(false);
    setLoading(true);
    fetch(`http://localhost:2222/admin/deleting_this_sheet/${props.deleting[0]._id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        setTimeout(() => {
          setSent(false);
        }, 2500);
        setSent(true);

        if (res.result !== undefined) {
          setMessage(res.Message);
          props.filterDeleted({term: res.result.term, year: res.result.year, type: res.type});
        } else {
          setMessage(res.Message);
        }
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };
  React.useEffect(
    _ => {
      if (props.deleting[0]._id === "") {
        return;
      } else {
        deleteThisResult();
      }
    },
    [props.deleting]
  );

  let ComponentStyle = {
    textAlign: "center",
    backgroundColor: "inherit",
    width: "100px",
    margin: "10px auto",
    display: "flex",
    justifyContent: "center",
    fontSize: "12px"
  };

  let CHECKING;
  if (loading) {
    CHECKING = (
      <div style={ComponentStyle}>
        <Loading />{" "}
      </div>
    );
  } else if (err) {
    CHECKING = (
      <div style={ComponentStyle}>
        Error Occured Check Your Internet Connection
      </div>
    );
  } else {
    CHECKING = <div style={ComponentStyle}>{message}</div>;
  }
  return (
    <div style={{ backgroundColor: "inherit" }}>{sent ? CHECKING : null}</div>
  );
};

export default Deleting;
