import React from "react";
import Add from "./Add/Add";
import Context from "../../../../../Component/Context/Context";

const AddEvent = props => {
  const CTX = React.useContext(Context);
  // ondooubleClick to show the password
  const [changePasswordType, setchangePasswordType] = React.useState(false);
  // the loading
  const [loading, setLoading] = React.useState(false);

  // message
  const [message, setMessage] = React.useState("");

  // all the value in the input
  const [inputValue, setInputValue] = React.useState({
    userName: "",
    password: "",
    phone: 234,
    allowAccess: "false"
  });

  const SubmittingForm = e => {
    e.preventDefault();
    let stringifyPhone = inputValue.phone.toString();

    let validatePhone = [
      stringifyPhone.split("")[0],
      stringifyPhone.split("")[1],
      stringifyPhone.split("")[2]
    ];

    if (validatePhone.join("") == 234 && inputValue.phone.length === 13) {
    setLoading(true);
    fetch("http://localhost:2222/admin/creatNewAdmin", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        }),
        body: JSON.stringify({
          allowAccess: inputValue.allowAccess,
          username: inputValue.userName,
          password: inputValue.password,
          phone: inputValue.phone
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.result) {
            props.pushNewAdmin(res.result);
          }
          setMessage(res.Message);
          setLoading(false);
        })
        .catch(err => {
          setMessage("Oops an Error Occured Check Your Internet");
          setLoading(false);
        });
    } else {
      alert("Check Phone Number");
    }
  };

  const inputOnchangeHandler = e => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const selectOnchangeHandler = e => {
    setInputValue({ ...inputValue, allowAccess: e.target.value });
  };

  const changePasswordTypeHandler = () =>
    setchangePasswordType(!changePasswordType);

  // checking the Response message
  let writting = null;
  if (message.length > 2) {
    writting = message;
  }

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Add
        loading={loading}
        writting={writting}
        // ONchange for both input and select
        selectOnchange={selectOnchangeHandler.bind(this)}
        inputOnchange={inputOnchangeHandler.bind(this)}
        // value for Only inputs
        password={inputValue.password}
        phone={inputValue.phone}
        userName={inputValue.userName}
        // Submitting the form
        SubmittingForm={SubmittingForm}
        // showing the props
        show={props.show}
        changePasswordType={changePasswordTypeHandler}
        passwordType={changePasswordType}
      />
    </div>
  );
};

export default AddEvent;
