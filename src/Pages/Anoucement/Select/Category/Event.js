import React from "react";
import Context from "../../../../Component/Context/Context";
import Message from "./Message";

const Event = props => {
  const CTX = React.useContext(Context);
  const [loading, setloading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const [contacts, setContacts] = React.useState([{ _id: "", phone: "" }]);

  console.log(contacts)

  const getNumbersBaseOnCategory = () => {
    if (props.name.length < 2) {
      return;
    }
    setloading(true);
    setErr(false);
    setShow(false);
    fetch(`http://localhost:2222/admin/anoucement/${props.name}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${CTX.token.token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setloading(false);
        if (props.name === "Teachers") {
          const notify = res.result.map(v => {
            return v.phone;
          });
          console.log(notify)
          setContacts(notify);
          setShow(true);
        } else  {
          const notify_phone = res.result.map(v => {
            if(v.freeze){
              return
            }else{
              return v.phone;
            }
          });
          const notify_emergency_phone = res.result.map(v => {
            if(v.freeze){
              return
            }else{
              return v.emergency_phone;
            }
          });
          const Add = [...notify_phone, ...notify_emergency_phone];
          console.log(Add)
          let removeUndefined = Add.filter(v => {
            return v !== undefined
          })

          setShow(true);
          setContacts(removeUndefined)
        }
      })
      .catch(err => {
        setloading(false);
        setShow(false);
        setErr(true);
      });
  };


  React.useEffect(
    _ => {
      getNumbersBaseOnCategory();
    },
    [props.name]
  );

  const [inputValue, setInputValue] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const formOnsubmitHandler = e => {
    setSending(true);
    e.preventDefault();
    fetch(
      `https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=9OIw8xFoYvUFOKwS3c4xsT4XVFuKLXB0h3HoQw42fPmJBjMBLcVCbHdHJNjo&from=JohnsonObioma&to=${contacts}&body=${inputValue}&dnd=2`,
      {
        method: "POST",
        mode: "no-cors"
        // headers: new Headers({
        //   "Content-Type": "application/json"
        // })
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setSending(false)
      })
      .catch(err => {
        console.log(err)
        setSending(false)
      });
  };

  const textareaonchange = e => {
    setInputValue(e.target.value);
  };

  return (
    <Message
      err={err}
      loading={loading}
      contacts={contacts}
      show={show}
      formOnsubmitHandler={formOnsubmitHandler}
      // textarea
      textareaonchange={textareaonchange}
      textareavalue={inputValue}
      sending={sending}
    />
  );
};

export default Event;
