import React from "react";
import Classes from "./Index.module.css";
import SelectingClass from "../../../../../../../../Component/UI/SelectingClass/SelectingClass";
import Modal from "../../../../../../../../Component/UI/Modal/Modal";
import Context from "../../../../../../../../Component/Context/Context";

const Index = props => {
  const CTX = React.useContext(Context);
  const [graduatingClassID, setGraduatingClassID] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const setGetClassHandler = (id, name, e) => {
    setGraduatingClassID([{ _id: id, class_name: name }]);
  };

  React.useEffect(
    _ => {
      if (graduatingClassID.length < 1) {
        return;
      } else {
        setShowModal(true);
      }
    },
    [graduatingClassID]
  );

  if (!props.show) {
    return null;
  }

  const graduateStudent = () => {
    setLoading(true);
    fetch(`http://localhost:2222/teacher/graduate/${props.eachId}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        graduatingClass: graduatingClassID[0]._id
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setShowModal(false);
        if (res.Message.split("")[0] === props.full_name.split("")[0]) {
          props.setMessage(res.Message);
        } else {
          props.ChangedClassToTrue();
          props.update();
        }
      })
      .catch(err => {
        setShowModal(false);
        setLoading(false);
        props.setMessage("Check Your Intenet Connection And Continue");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "inherit",
        marginBottom: "50px",
        fontSize: "14px"
      }}
    >
      <SelectingClass onClick={setGetClassHandler} />

      <div style={{ backgroundColor: "inherit" }}>
        <Modal top="190px" show={showModal} close={() => setShowModal(false)}>
          <div style={{ backgroundColor: "inherit" }}>
            <div className={Classes.Delete}>
              <h4>Are you sure you want to Graduate</h4>
              <h4>
                {props.full_name} to{" "}
                {graduatingClassID.length < 1
                  ? "..."
                  : graduatingClassID[0].class_name}
              </h4>
            </div>
            <div className={Classes.BUTTON}>
              <h5 onClick={() => setShowModal(false)}>No</h5>
              <h5 onClick={graduateStudent}>{loading ? "..." : "Yes"}</h5>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
