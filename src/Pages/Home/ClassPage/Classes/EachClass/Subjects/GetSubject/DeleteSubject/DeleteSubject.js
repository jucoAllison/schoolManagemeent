import React from "react";
import Context from "../../../../../../../../Component/Context/Context";

const DeleteSubject = props => {
  const CTX = React.useContext(Context);
  const [Message, setMessage] = React.useState("");
  const [MessageTime, setMessageTime] = React.useState(false);
  const [loadingDel, setLoadingDel] = React.useState(false);

  const DeleteSubjectHandler = () => {
    if (loadingDel) {
      return;
    } else {
      setLoadingDel(true);
      fetch(
        `http://localhost:2222/admin/delete_subject/${props.Delete[0]._id}`,
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
          setLoadingDel(false);
          props.clearDelete();
          setMessage(res.Message);
          setTimeout(() => {
            setMessageTime(true);
          }, 1000);
          setMessageTime(false);
          if (res.result._id.length > 3) {
            props.GetAllSubjects(res.result);
          }
        })
        .catch(err => {
          props.clearDelete();
          setLoadingDel(false);
          alert("Check Internet Connection and Continue");
        });
    }
  };
  React.useEffect(
    _ => {
      if (props.Delete.length < 1) {
        return;
      } else {
        DeleteSubjectHandler();
      }
    },
    [props.Delete]
  );
  return (
    <div
      style={{
        backgroundColor: "inherit",
        textAlign: "center",
        color: "#e72626",
        fontSize: "13px",
        marginBottom: "10px"
      }}
    >
      {!MessageTime ? Message : null}
    </div>
  );
};

export default DeleteSubject;
