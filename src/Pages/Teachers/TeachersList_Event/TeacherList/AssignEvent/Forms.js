import React from "react";
import Classes from "./Forms.module.css";
import Modal from "../../../../../Component/UI/Modal/Modal";
import SelectingClass from "../../../../../Component/UI/SelectingClass/SelectingClass";
import Context from "../../../../../Component/Context/Context";
import RemoveAssign from "./RemoveAssign/RemoveAssign";

const Assignform = props => {
  const CTX = React.useContext(Context);
  // this details is the teachername which is gotten from get request .
  // loading is to show "..." when going.
  const [loading, setLoading] = React.useState(false);
  // data is from SelectingClass. it is the id gotten.
  const [data, setData] = React.useState("");
  const setGetClassHadler = e => {
    setData(e);
  };

  const AssignFormHandler = e => {
    e.preventDefault();
    if (data.length < 1) {
      return;
    } else {
      setLoading(true);
      fetch(`http://localhost:2222/admin/teacher/${props.id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        }),
        body: JSON.stringify({
          assignClass: data
        })
      })
        .then(res => res.json())
        .then(res => {
          setLoading(false);
          props.changeassign();
          props.closeModal();
        })
        .catch(err => {
          alert("Check Internet Connection and Continue");
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {props.show ? (
        <Modal top="180px" show={props.show} close={props.close}>
          <div style={{ backgroundColor: "inherit" }}>
            <div style={{ backgroundColor: "inherit" }}>
              <div className={Classes.writting}>
                Assign class to {props.FullName}
              </div>
              <SelectingClass onClick={setGetClassHadler.bind(this)} />
              <div className={Classes.Flex}>
                <button  className={Classes.BTNN} onClick={AssignFormHandler}>
                  <div className={Classes.BTN}>
                    {loading ? "..." : "Assign"}{" "}
                  </div>
                </button>
                <div style={{ backgroundColor: "inherit" }}>
                  <RemoveAssign
                    id={props.id}
                    changeassign={props.changeassign}
                    closeModal={props.closeModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Assignform;
