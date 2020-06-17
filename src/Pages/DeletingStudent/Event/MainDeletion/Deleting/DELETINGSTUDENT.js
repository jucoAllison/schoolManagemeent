import React from "react";
import HomeContext from "../../../../../Component/Context/HomeContext";
import Context from "../../../../../Component/Context/Context";
import { Redirect } from "react-router-dom";

const DELETINGSTUDENT = props => {
  const [message, setMessage] = React.useState("");
  const [toggle, setToggle] = React.useState(false);
  const CTX = React.useContext(Context);
  const HomeCTX = React.useContext(HomeContext);
  let FULL_NAME = (
    <div
      style={{
        textTransform: "capitalize",
        color: "#76848d",
        fontSize: "11px"
      }}
    >
      {HomeCTX.deletingStudent.name}
    </div>
  );

  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const MainlyDeleteThisStudent = () => {
    if (loading) {
      return;
    } else {
      setLoading(true);
      fetch(
        `http://localhost:2222/admin/deleting_this_student/${HomeCTX.deletingStudent._id}`,
        {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${CTX.token.token}`
          })
        }
      )
        .then(res => res.json())
        .then(res => {
          setLoading(false);
          if (res.result !== undefined) {
            setSent(true);
          } else {
            setSent(false);
            setMessage(res.Message);
            setTimeout(() => {
              setToggle(false);
            }, 2500);
            setToggle(true);
          }
        })
        .catch(err => {
          setSent(false);
          setLoading(false);
          setMessage("Error Occured Check Your Internet Connection");
          setTimeout(() => {
            setToggle(false);
          }, 2500);
          setToggle(true);
        });
    }
  };

  React.useEffect(_ => {
    setSent(false);
  }, []);

  let CHECKING;
  if (loading) {
    CHECKING = "...";
  } else {
    CHECKING = (
      <div
        onClick={MainlyDeleteThisStudent}
        style={{ backgroundColor: "inherit", cursor: "pointer" }}
      >
        Delete{FULL_NAME}
      </div>
    );
  }

  return (
    <>
      {props.deleteStudent ? (
        <div
          style={{
            backgroundColor: "inherit",
            fontSize: "11.6px",
            width: "200px",
            textAlign: "center",
            margin: "20px auto 10px auto",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {sent ? <Redirect to="/" /> : null}
          {toggle ? (
            <div style={{ backgroundColor: "inherit" }}>{message}</div>
          ) : (
            CHECKING
          )}
        </div>
      ) : null}
    </>
  );
};

export default DELETINGSTUDENT;
