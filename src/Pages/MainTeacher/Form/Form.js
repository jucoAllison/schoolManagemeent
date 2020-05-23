import React from "react";
import TeachersForm from "../../Teachers/AddTeacher/TeachersForm/TeachersForm";
import Context from "../../../Component/Context/Context";
import Modal from "../../../Component/UI/Modal/Modal";
import HandleResult from "../HandleResult/HandleResult";

const Form = props => {
  const id = props.teachersID;
  const CTX = React.useContext(Context);
  const [showModal, setShowModal] = React.useState(false);
  const [inputValue, setInputValue] = React.useState({
    login_id: "",
    assignClassName: "",
    full_name: "",
    handle_result: [],
    state: "",
    lga: "",
    address: "",
    phone: "",
    nok: "",
    nok_phone: "",
    sex: "Male"
  });
  const [loading, setLoading] = React.useState(false);
  const fetchDetails = () => {
    if (loading) {
      return;
    } else {
      setLoading(true);
      fetch(`http://localhost:2222/admin/each_teacherID/${id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      })
        .then(res => res.json())
        .then(res => {
          setLoading(false);
          setInputValue(res.result);
        })
        .catch(err => {
          setLoading(false);
          alert("Check Internet Connection and Continue");
        });
    }
  };

  React.useEffect(_ => {
    fetchDetails();
  }, []);

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

  // When submitting Form
  const submitFormHandler = e => {
    e.preventDefault();
    let phone_country_code = [
      inputValue.phone.split("")[0],
      inputValue.phone.split("")[1],
      inputValue.phone.split("")[2]
    ];
    let nok_phone_country_code = [
      inputValue.nok_phone.split("")[0],
      inputValue.nok_phone.split("")[1],
      inputValue.nok_phone.split("")[2]
    ];
    if (
      phone_country_code.join("") == 234 &&
      nok_phone_country_code.join("") == 234 &&
      inputValue.phone !== inputValue.nok_phone
    ) {
      setLoading(true);
      fetch(`http://localhost:2222/admin/edit_teacher/${id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        }),
        body: JSON.stringify({
          full_name: inputValue.full_name,
          state: inputValue.state,
          lga: inputValue.lga,
          sex: inputValue.sex,
          address: inputValue.address,
          phone: +inputValue.phone,
          nok: inputValue.nok,
          nok_phone: +inputValue.nok_phone
        })
      })
        .then(res => res.json())
        .then(res => {
          setShowModal(false);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          alert("Check Internet Connection and Continue");
        });
    } else {
      alert("Form is invalid. Check the numbers");
      return;
    }
  };

  // seting up the modal (ie closing the modal)
  const closeShowModal = () => {
    setShowModal(false);
  };
  return (
    <div style={{ backgroundColor: "inherit" }}>
      <div
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={() => setShowModal(!showModal)}
      >
        <div
          style={{ backgroundColor: "inherit", textTransform: "capitalize" }}
        >
          {" "}
          {loading ? "..." : `${inputValue.full_name}   Details`}
        </div>
      </div>
      <Modal top="10%" close={closeShowModal} show={showModal}>
        <div style={{ height: "500px", overflow: "scroll" }}>
          <TeachersForm
            // onChange
            onChangeInput={onChangeInput.bind(this)}
            // input Values
            login_id={inputValue.login_id}
            password={inputValue.password}
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
            // still Remailing submitHandler
            submitFormHandler={submitFormHandler.bind(this)}
            label="Change"
            loading={loading}
          />
        </div>
      </Modal>

      {/* HANDLE RESULT SIDE */}
      <HandleResult
        className={inputValue.assignClassName}
        handleResult={inputValue.handle_result}
        fullName={inputValue.full_name}
      />
    </div>
  );
};

export default Form;
