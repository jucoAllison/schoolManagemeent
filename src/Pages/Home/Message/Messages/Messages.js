import React from "react";
import Classes from "./Messages.module.css";

// svG
import Loading from "../../../../Component/UI/Loading/Loading";
import { ReactComponent as Trash } from "../../../../Assert/trash.svg";
import { ReactComponent as Retry } from "../../../../Assert/retry.svg";

const Messages = props => {
  const setHeightHeadler = (id, e) => {
    e.target.classList.toggle("hide");
    props.updateIsRead(id)
    e.target.classList.add("Read")
  };

  const mappedMessages = props.propsMessages.map(v => {
    return (
      <div className={Classes.Flex} key={v._id}>
        <div
          onClick={setHeightHeadler.bind(this, v._id)}
          className={Classes.eachMessage}
  
          style={{border: v.isRead === "true" ? "1.5px solid #76848d" : "1.5px solid #e72626"}}
        >
          {v.message}
        </div>

        {/* ONCLICK on this Span, their will be an Fetch request on Delete */}
        <span onClick={props.deleteMessage.bind(this, v._id)}>
          {props.deletingLoading ? (
            "..."
          ) : (
            <Trash
              style={{ backgroundColor: "#fff" }}
              width="20"
              height="20"
              fill={v.isRead === "true" ? "#76848d" : "#e72626"}
            />
          )}
        </span>
      </div>
    );
  });

  let CHECKING = null;
  if (props.err) {
    CHECKING = (
      // dfghhgfdfgh
      <div className={Classes.message} onClick={props.getAllMessages}>
        <div className={Classes.message}>Error Occured Check Your Internet</div>
        <Retry
          style={{ backgroundColor: "#fff", marginTop: "5px" }}
          width="40"
          height="40"
          fill="#76848d"
        />
      </div>
    );
  } else if (props.message || props.propsMessages.length < 1) {
    CHECKING = <div className={Classes.message}>You have no new messages.</div>;
  } else if (props.propsMessages[0]._id === "") {
    CHECKING = (
      <div className={Classes.message}>
        Click on "Messages" to get all messages
      </div>
    );
  } else {
    CHECKING = mappedMessages;
  }

  return (
    <div>
      <div className={Classes.BgColor}>
        <div className={Classes.carrier}>
          {props.loading ? <Loading /> : CHECKING}
        </div>
      </div>
    </div>
  );
};

export default Messages;
