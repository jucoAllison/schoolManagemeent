import React from "react";
import TeacherList from "./TeacherList/TeacherList";
import Context from "../../../Component/Context/Context";
import AddTeacher from "../AddTeacher/AddTeacher";
import TearcherContext from "../../../Component/Context/allClasses";

const TeachersList_Event = props => {
  const TeacherCTX = React.useContext(TearcherContext);
  // GET REQUEST TO TEACHER LIST WITH ALL THE LOADING AND EROOR FOR REFREASHING this GET REQUEST is called at React.useEffect()
  const CTX = React.useContext(Context);
  const [err, setErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const getAllTeachers = () => {
    setMessage(false);
    setErr(false);
    setLoading(true);
    fetch("http://localhost:2222/admin/teacher", {
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
          TeacherCTX.setTeacherList({ teacherList: res.result });
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
    if(TeacherCTX.teacherList[0].full_name == ""){
      getAllTeachers();
    }else{
      return
    }
  }, []);
  // End of GET REQUEST now for Assiging teacher class

  const [details, setDetails] = React.useState({
    full_name: "",
    login_id: "",
    _id: ""
  });
  const [showModal, setShowModal] = React.useState({
    Assign: false,
    Pass: false,
    Trash: false
  });

  const [id, setId] = React.useState("");

  const AssignOnClick = (id, e) => {
    setId(id);
    let name = e.currentTarget.id;

    fetch(`http://localhost:2222/admin/each_teacherID/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setDetails(res.result);
        setShowModal({ [name]: true });
      })
      .catch(err => {
        alert("Check Internet Connection");
      });
  };

  function fillterTeachersList() {
    let remove = TeacherCTX.teacherList.filter(v => {
      return v._id !== id;
    });
    if(remove.length < 1){
      TeacherCTX.setTeacherList({ teacherList: [{ full_name: "", _id: "", assignClass: "" }] });
    }
    TeacherCTX.setTeacherList({ teacherList: [...remove] });
  }

  const fillTeachersList = res => {
    const spread = [...TeacherCTX.teacherList];
    spread.push(res);
    let Check = spread.filter(v => {
      return v._id !== "";
    });
    TeacherCTX.setTeacherList({ teacherList: Check });
  };

  const changeassign = () => {
    getAllTeachers();
  };

  return (
    <div>
      <TeacherList
        onClick={AssignOnClick.bind(this)}
        closeOnClick={() => setShowModal(false)}
        AssignModal={showModal.Assign}
        PasswordModal={showModal.Pass}
        TrashModal={showModal.Trash}
        message={message}
        loading={loading}
        err={err}
        getAllTeachers={getAllTeachers}
        full_name={details.full_name}
        login_id={details.login_id}
        fillterTeachersList={fillterTeachersList}
        // updating Assign in other to change color to "#fff"
        changeassign={changeassign.bind(this)}
      />

      <AddTeacher fillTeachersList={fillTeachersList} />
    </div>
  );
};

export default TeachersList_Event;
