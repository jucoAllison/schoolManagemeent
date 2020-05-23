import React from "react";
import Password from "./Phone/Phone";
import Context from "../../../Component/Context/Context";

const Event = props => {
  // CONTEXT
  const CTX = React.useContext(Context);
  //   handling the password input value and the Onchange
  const [passwords, setPasswords] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = React.useState(false);

  // this Hook is Handling the messages brought from fected items
  const [message, setMessage] = React.useState("");

  const inputOnchangeHandler = e => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  // SUBMITTTING THE FORM
  const formSubmitHandler = e => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:2222/admin/update_phone", {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      }),
      body: JSON.stringify({
        old_phone: +passwords.oldPassword,
        new_phone: passwords.newPassword
      })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setMessage(res.Message);
      })
      .catch(err => {
        setLoading(false);
        setMessage("Oops an Error Occured Check Your Internet");
      });
  };

  // CHecking the messages not to show when empty
  let writting = null;
  if (message.length > 2) {
    writting = message;
  } else {
    writting = null;
  }

  return (
    <div>
      <Password
      loading={loading}
        // checking the form
        formSubmitHandler={formSubmitHandler}
        //Setting when to show
        show={props.showPhone}
        // inputValue fro either oldpassword newPassword or confirmPassword
        oldPassword={passwords.oldPassword}
        newPassword={passwords.newPassword}
        confirmPassword={passwords.confirmPassword}
        // inputOnchange
        inputOnchange={inputOnchangeHandler.bind(this)}
        // writting contains the messsage
        writting={writting}
      />
    </div>
  );
};

export default Event;
