import React from "react";
import StudentForm from "./StudentForm/index";
import Context from "../../../../../../../Component/Context/Context";

const Index = props => {
  const CTX = React.useContext(Context);

  const [loadingCom, setLoadingCom] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [oldPhone, setOldPhone] = React.useState({
    emergency_phone: "",
    phone: ""
  });
  const [childDetails, setChildDetails] = React.useState({
    full_name: "",
    state_of_origin: "",
    lga: "",
    age: "",
    sex: "",
    phone: "",
    address: "",
    parents_name: "",
    parents_occupation: "",
    religion: "",
    church: "",
    emergency_name: "",
    emergency_phone: "",
    emergency_address: "",
    emergency_relationship: "",
    dob: ""
  });

  const SEND = () => {
    setLoadingCom(true);
    fetch(`http://localhost:2222/admin/get_student/${propsMatch[0]._id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        full_name: childDetails.full_name,
        age: +childDetails.age,
        sex: childDetails.sex,
        phone: +childDetails.phone,
        address: childDetails.address,
        parents_name: childDetails.parents_name,
        parents_occupation: childDetails.parents_occupation,
        religion: childDetails.religion,
        church: childDetails.church,
        emergency_name: childDetails.emergency_name,
        emergency_phone: +childDetails.emergency_phone,
        emergency_address: childDetails.emergency_address,
        emergency_relationship: childDetails.emergency_relationship,
        state_of_origin: childDetails.state_of_origin,
        lga: childDetails.lga,
        dob: childDetails.dob
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoadingCom(false);
        setChildDetails(res.result);
        if (
          propsMatch[0].full_name !== res.result.full_name ||
          propsMatch[0].sex !== res.result.sex
        ) {
          props.update();
        } else {
          return;
        }
      })
      .catch(err => {
        setLoadingCom(false);
        alert("Check Your Internet Connection And Contiune");
      });
  };

  // onChangeInput
  const onChangeInput = e => {
    setChildDetails({ ...childDetails, [e.target.name]: e.target.value });
  };

  if (
    childDetails.emergency_phone == null ||
    childDetails.emergency_phone == undefined
  ) {
    setChildDetails({ ...childDetails, emergency_phone: 234 });
  } else if (childDetails.phone == null || childDetails.phone == undefined) {
    setChildDetails({ ...childDetails, phone: 234 });
  }

  const propsMatch = props.eachId;
  // this will run when React.useEffect

  const getEachStudent = () => {
    setErr(false);
    setLoading(true);
    fetch(`http://localhost:2222/admin/get_student/${propsMatch[0]._id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        // if (res.error === undefined) {
        setChildDetails(res.result);
        setOldPhone({
          emergency_phone: res.result.emergency_phone,
          phone: res.result.phone
        });
        setErr(false);
        // } else {
        // setErr(true);
        // }
      })
      .catch(err => {
        setLoading(false);
        setErr(true);
      });
  };

  React.useEffect(
    _ => {
      getEachStudent();
    },
    [propsMatch]
  );

  const submittingDetailsHandler = e => {
    e.preventDefault();
    let stringifyPhone = childDetails.phone.toString();

    let validatePhone = [
      stringifyPhone.split("")[0],
      stringifyPhone.split("")[1],
      stringifyPhone.split("")[2]
    ];

    let stringifyEmergencyPhone = childDetails.emergency_phone.toString();
    let validateEmergencyPhone = [
      stringifyEmergencyPhone.split("")[0],
      stringifyEmergencyPhone.split("")[1],
      stringifyEmergencyPhone.split("")[2]
    ];

    if (
      childDetails.phone === oldPhone.phone &&
      childDetails.emergency_phone === oldPhone.emergency_phone
    ) {
      SEND();
    } else {
      if (validatePhone.join("") == 234 && childDetails.phone.length === 13) {
        if (
          validateEmergencyPhone.join("") == 234 &&
          childDetails.emergency_phone.length == 13
        ) {
          SEND();
        } else {
          alert("Check Emergency Phone Number");
        }
      } else {
        alert("Check Phone Number");
      }
    }
  };

  return (
    <div>
      <StudentForm
      ChangedClassToTrue={props.ChangedClassToTrue}
        childID={propsMatch[0]._id}
        update={props.update}
        err={err}
        loading={loading}
        getEachStudent={getEachStudent}
        childDetails={childDetails}
        // onChange for inputs
        onChange={onChangeInput.bind(this)}
        // value
        full_name={childDetails.full_name == null ? "" : childDetails.full_name}
        state_of_origin={
          childDetails.state_of_origin == null
            ? ""
            : childDetails.state_of_origin
        }
        lga={childDetails.lga == null ? "" : childDetails.lga}
        dob={childDetails.dob == null ? "" : childDetails.dob}
        age={childDetails.age == null ? "" : childDetails.age}
        sex={childDetails.sex == null ? "" : childDetails.sex}
        phone={childDetails.phone == null ? "" : childDetails.phone}
        address={childDetails.address == null ? "" : childDetails.address}
        parents_name={
          childDetails.parents_name == null ? "" : childDetails.parents_name
        }
        religionValue={
          childDetails.religion == null ? "" : childDetails.religion
        }
        parents_occupation={
          childDetails.parents_occupation == null
            ? ""
            : childDetails.parents_occupation
        }
        church={childDetails.church == null ? "" : childDetails.church}
        emergency_name={
          childDetails.emergency_name == null ? "" : childDetails.emergency_name
        }
        emergency_phone={
          childDetails.emergency_phone
          //  == null
          //   ? ""
          //   : childDetails.emergency_phone
        }
        emergency_address={
          childDetails.emergency_address == null
            ? ""
            : childDetails.emergency_address
        }
        emergency_relationship={
          childDetails.emergency_relationship == null
            ? ""
            : childDetails.emergency_relationship
        }
        submittingDetailsHandler={submittingDetailsHandler.bind(this)}
        loadingCom={loadingCom}
      />
    </div>
  );
};

export default Index;
