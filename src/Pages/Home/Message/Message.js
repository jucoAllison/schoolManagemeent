import React from "react";
import Classes from "./Message.module.css";
import Messages from "./Messages/Messages";
import Context from "../../../Component/Context/Context";

const Message = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [deletingLoading, setDeletingLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const [fetchedMessages, setFetchedMessages] = React.useState([
    { _id: "", message: "", isRead: Boolean }
  ]);

  const getAllMessages = () => {
    setMessage(false);
    setErr(false);
    setLoading(true);
    fetch("http://localhost:2222/admin/messages", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setLoading(false);
        if (res.result.length > 0) {
          setFetchedMessages(res.result);
        } else {
          setMessage(true);
        }
      })
      .catch(err => {
        setErr(true);
        setMessage(false);
        setLoading(false);
      });
  };

  React.useEffect(_ => {
    getAllMessages()
  },[])

  // DELETE REQUEST
  // deleting any clicked Messages
  const deleteMessage = id => {
    setDeletingLoading(true);
    fetch(`http://localhost:2222/admin/messages/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setDeletingLoading(false);
        let remove = fetchedMessages.filter(v => {
          return v._id !== id;
        });
        setFetchedMessages([...remove]);
      })
      .catch(err => {
        setDeletingLoading(false);
        alert("Check Your Internet Connection And Continue");
      });
  };

  // PUT REQUEST
  // changing clicked messages from unread to read
  const updateIsRead = (id) => {
    fetch(`http://localhost:2222/admin/messages/${id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.Message)
      })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <div className={Classes.BgColor}>
      <div>
        <div className={Classes.Select}>
          <div>
            <h4 style={{ backgroundColor: "#fff" }}>Messages</h4>
          </div>
        </div>
      </div>
      <Messages
        getAllMessages={getAllMessages}
        loading={loading}
        err={err}
        message={message}
        propsMessages={fetchedMessages}
        // deleting events
        deleteMessage={deleteMessage.bind(this)}
        deletingLoading={deletingLoading}
        // updateing Read Messages
        updateIsRead={updateIsRead.bind(this)}
      />
    </div>
  );
};
export default Message;
