import React from "react";
import Context from "../../../../../../Component/Context/Context";

const RemoveAssign = props => {
  const CTX = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

  const RemoveAssignHandler = () => {
    setLoading(true);
    fetch(`http://localhost:2222/admin/remove_assign/${props.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        assignClass: null
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        props.changeassign();
        props.closeModal();
      })
      .catch(err => {
        setLoading(false);
        alert("Check Internet Connection and Continue");
      });
  };
  return (
    <div style={{ backgroundColor: "inherit", marginTop: "4px" }}>
      <button onClick={RemoveAssignHandler} style={{ color: "#e72626",lineHeight: "3", border: "none", outline: "none" }}>
        {loading ? "..." : "Remove"}
      </button>
    </div>
  );
};

export default RemoveAssign;
