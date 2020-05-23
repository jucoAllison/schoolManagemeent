import React from "react";
import Classes from "./AddTeacher.module.css";
import Modal from "../../../Component/UI/Modal/Modal";
import TeachersForm from "./TeachersForm/TeachersForm";
import Context from "../../../Component/Context/Context";
import UUID from "uuid";

const AddTeacher = props => {
  // this is responsible for generating random numbers that will be useed in login ID
  let v = UUID.v4(3);
  let j = v.split("").splice(0, 7);
  const loginID = j.join("");

  const CTX = React.useContext(Context);
  const [show, setShow] = React.useState(false);
  //  EVERTHING IN THIS COMPONENT WILL ONLY DO POSTING REQUEST

  const setShowHandler = () => {
    setShow(true);
  };
  const closeShowHandler = () => {
    setShow(false);
  };

  const [inputValue, setInputValue] = React.useState({
    full_name: "",
    state: "",
    lga: "",
    address: "",
    phone: "",
    nok: "",
    nok_phone: "",
    sex: "Male"
  });

  const onChangeInput = e => {
    setInputValue({
      ...inputValue,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };
  // select onchange
  const onChangeSelect = e => {
    setInputValue({ ...inputValue, sex: e.target.value });
  };

  const checkAndSend = (validateNOKPhone, validatePhone) => {
    if (validatePhone.join("") == 234 && inputValue.phone.length === 13) {
      if (validateNOKPhone.join("") == 234 && inputValue.nok_phone.length === 13) {
        setLoading(true);
        fetch("http://localhost:2222/admin/teacher", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${CTX.token.token}`
          }),
          body: JSON.stringify({
            login_id: loginID,
            sex: inputValue.sex,
            full_name: inputValue.full_name,
            state: inputValue.state,
            lga: inputValue.lga,
            address: inputValue.address,
            phone: +inputValue.phone,
            nok: inputValue.nok,
            nok_phone: +inputValue.nok_phone
          })
        })
          .then(res => res.json())
          .then(res => {
            setLoading(false);
            if (res.Message === "Login_Id is already in use") {
              alert("Login ID is already in use please change");
            } else {
              props.fillTeachersList(res);
              setInputValue({
                login_id: "",
                password: "",
                full_name: "",
                state: "",
                lga: "",
                address: "",
                phone: "",
                nok: "",
                nok_phone: "",
                sex: "Male"
              });
              closeShowHandler();
            }
          })
          .catch(err => {
            alert("Check your internet connection and continue");
            setLoading(false);
          });
      } else if (validateNOKPhone.join("") !== 234) {
        alert("Check Emergency Phone Number");
      } else {
        alert("Check Emergency Phone Number");
      }
    } else if (validatePhone.join("") !== 234) {
      alert("Check Phone Number");
    } else {
      alert("Check Phone Number '234'");
    }
  };

  const [loading, setLoading] = React.useState(false);
  const submitFormHandler = e => {
    e.preventDefault();

    let stringifyPhone = inputValue.phone.toString();

    let validatePhone = [
      stringifyPhone.split("")[0],
      stringifyPhone.split("")[1],
      stringifyPhone.split("")[2]
    ];

    let stringifyNOKPhone = inputValue.nok_phone.toString();
    let validateNOKPhone = [
      stringifyNOKPhone.split("")[0],
      stringifyNOKPhone.split("")[1],
      stringifyNOKPhone.split("")[2]
    ];
    if (inputValue.phone == inputValue.nok_phone) {
      alert("Phone numbers must not be the same");
    } else {
      checkAndSend(validateNOKPhone, validatePhone);
    }
  };

  return (
    <>
      <div onClick={setShowHandler} className={Classes.AddTeacher}>
        Add Teacher
      </div>
      <Modal top="10%" close={closeShowHandler} show={show}>
        <div className={Classes.Scrool}>
          <TeachersForm
            // onChange
            onChangeInput={onChangeInput.bind(this)}
            // input Values
            login_id={loginID}
            full_name={inputValue.full_name}
            state={inputValue.state}
            lga={inputValue.lga}
            address={inputValue.address}
            phone={inputValue.phone}
            nok={inputValue.nok}
            nok_phone={inputValue.nok_phone}
            // select Section
            onChangeSelect={onChangeSelect.bind(this)}
            // submitting form
            submitFormHandler={submitFormHandler.bind(this)}
            label="Add"
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddTeacher;
