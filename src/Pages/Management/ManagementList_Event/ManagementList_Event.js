import React from "react";
import ManagementList from "./ManagementList/ManagementList";
import Context from "../../../Component/Context/Context";
import ManagementContext from "../../../Component/Context/allClasses";

const TeachersList_Event = props => {
  const ManagementCTX = React.useContext(ManagementContext);
  // GET REQUEST TO TEACHER LIST WITH ALL THE LOADING AND EROOR FOR REFREASHING this GET REQUEST is called at React.useEffect()
  const CTX = React.useContext(Context);
  const [err, setErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const getAllManagement = () => {
    setMessage(false);
    setErr(false);
    setLoading(true);
    fetch("http://localhost:2222/admin/management_controller", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setErr(false);
        if (res.result.length > 0) {
          ManagementCTX.setManagementList({ managementList: res.result });
          props.total(res.total);
        } else {
          setMessage(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setMessage(false);
        setErr(true);
      });
  };
  React.useEffect(_ => {
    if(ManagementCTX.managementList[0].username === ""){
      getAllManagement();
    }else{
      return
    }
  }, []);
  // End of GET REQUEST now for Assiging teacher class

  const pushNewAdmin = res => {
    let spread = [...ManagementCTX.managementList];
    spread.push(res);
    ManagementCTX.setManagementList({ managementList: spread });
  };

  const filterManagementList = res =>
    ManagementCTX.setManagementList({ managementList: res });

  return (
    <div>
      <ManagementList
        message={message}
        loading={loading}
        err={err}
        getAllManagement={getAllManagement}
        // now pushing new admin in the list
        pushNewAdmin={pushNewAdmin}
        // now setting new updated
        filterManagementList={filterManagementList}
        // now setting new after delete
        fillAfterDelete={res =>
          ManagementCTX.setManagementList({ managementList: res })
        }
      />

      {/* <AddTeacher fillTeachersList={fillTeachersList} /> */}
    </div>
  );
};

export default TeachersList_Event;
