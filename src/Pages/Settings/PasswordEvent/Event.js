import React from "react";
import Password from "./Password/Password";
import Context from "../../../Component/Context/Context";

const Event = props => {
  // CONTEXT
  const CTX = React.useContext(Context);
  // this hook is handling the password and confirm password
  const [CHECK, setCHECK] = React.useState(false);
  //   handling the password input value and the Onchange
  const [passwords, setPasswords] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // this Hook is Handling the messages brought from fected items
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const inputOnchangeHandler = e => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  // SUBMITTTING THE FORM
  const formSubmitHandler = e => {
    e.preventDefault();
    setLoading(true);
    if (passwords.newPassword === passwords.confirmPassword) {
      fetch("http://localhost:2222/admin/putpassword", {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        }),
        body: JSON.stringify({
          oldPassword: passwords.oldPassword,
          password: passwords.newPassword
        })
      })
        .then(res => res.json())
        .then(res => {
          setLoading(false);
          setMessage(res.Messagtruee);
        })
        .catch(err => {
          setLoading(false);
          setMessage("Oops an Error Occured Check Your Internet");
        });
    } else {
      setCHECK(true);
    }
  };

  // CHECK THE DOUBLE CLICK AND CHANGE IT type FROM TEXT TO PASSWORD
  const [passwordType, setPasswordType] = React.useState(false);
  const changePasswordType = () => setPasswordType(!passwordType);

  // CHecking the messages not to show when empty
  let writting = null;
  if (message.length > 2) {
    writting = message;
  }

  return (
    <div>
      <Password
      loading={loading}
        // Changing the password type
        passwordType={passwordType}
        changePasswordType={changePasswordType}
        // checking the form
        formSubmitHandler={formSubmitHandler}
        //Setting when to show
        show={props.showPassword}
        // inputValue fro either oldpassword newPassword or confirmPassword
        oldPassword={passwords.oldPassword}
        newPassword={passwords.newPassword}
        confirmPassword={passwords.confirmPassword}
        // inputOnchange
        inputOnchange={inputOnchangeHandler.bind(this)}
        checkConfirm={CHECK}
        // writting contains the messsage
        writting={writting}
      />
    </div>
  );
};

export default Event;
