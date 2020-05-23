import React from "react";
import ForgotPassword from "./ForgotPassword";
import UUID from "uuid";

const EventForgotPassword = () => {
  let randomID = UUID.v4();
  let newPassword = randomID.split("").splice(0, 11);
  const inputValue = `Login with this password = ${newPassword}`;
  const [sending, setSending] = React.useState(false);

          console.log(newPassword)
          const [details, setDetails] = React.useState([]);

  const SendingNewPassword = (_id, phone, e) => {
    setDetails([{ _id: _id, phone: phone }]);

          console.log(newPassword)
          if (sending) {
      return;
    } else {
      setSending(true);
      let promise = new Promise((resolve, rejects) => {
        fetch(
          `https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=9OIw8xFoYvUFOKwS3c4xsT4XVFuKLXB0h3HoQw42fPmJBjMBLcVCbHdHJNjo&from=JohnsonObioma&to=${phone}&body=${inputValue}&dnd=2`,
          {
            method: "POST",
            mode: "no-cors"
          }
        )
          .then(res => res.json())
          .then(res => {
            alert("Message Sent Check Your Phone");
            resolve("OK");
          })
          .catch(err => {
            rejects("NOT_OK");
            alert("Check Internet Connection and Continue");
          });
      });

      promise
        .then(result => {
          fetch(
            `http://localhost:2222/admin/update_forgotten_password/${details[0]._id}`,
            {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json"
              }),
              body: JSON.stringify({ password: newPassword })
            }
            )
            .then(res => res.json())
            .then(res => {
              setSending(false);
              alert("Password Updated Successfully");
              window.location.reload()
            })
            .catch(err => {
              alert("Check Internet Connection and Continue");
            });
          console.log(result);
        })
        .catch(err => {
          setSending(false);  
          console.log(err);
          console.log(newPassword)
        });
    }
  };

  return (
    <ForgotPassword SendingNewPassword={SendingNewPassword} sending={sending} />
  );
};

export default EventForgotPassword;
