import React from "react";
import Each from "./Each";
import Context from "../../../../Component/Context/Context";

const Event = props => {
  const CTX = React.useContext(Context);
  const [loading, setloading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [headers, setHeaders] = React.useState([]);
  const [request, setRequest] = React.useState(
    Array(50).fill({
      header_name: "",
      value: "",
      _id: Math.random() * Date().length
    })
  );

  // getting the selected class fee_schedule
  const getEachClassFeeSchedule = () => {
    if (props.getclass.length < 1) {
      return;
    }
    setloading(true);
    setErr(false);
    fetch(
      `http://localhost:2222/admin/main_fee_schedule/${props.getclass[0]._id}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token.token}`
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        setErr(false);
        setloading(false);
        setHeaders(res.headers);
        const ss = res.headers.map(v => {
          return {
            header_name: v.header,
            value: "",
            _id: Math.random() * Date().length
          };
        });

        let allIn = [...ss];
        let suppose = res.result.filter((v, i) =>
          allIn.some(b => b.header_name === v.header_name)
        );
        let split = allIn.filter(
          a => !suppose.some(b => a.header_name === b.header_name)
        );
        let main = [...split, ...suppose];
        setRequest(main);
      })
      .catch(err => {
        setloading(false);
        setErr(true);
      });
  };

  React.useEffect(
    _ => {
      getEachClassFeeSchedule();
    },
    [props.getclass]
  );

  //  PUTTING new fee_schedule
  const submitNewFeeSchedule = e => {
    // the request body is the ReactHook request
    e.preventDefault();
    if (request.length < 1) {
      alert("There are no fee schedule headers. Add headers to continue");
    } else {
      setloading(true);
      setErr(false);
      fetch(
        `http://localhost:2222/admin/main_fee_schedule/${props.getclass[0]._id}`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${CTX.token.token}`
          }),
          body: JSON.stringify({
            fee_schedule: request
          })
        }
      )
        .then(res => res.json())
        .then(res => {
          setErr(false);
          setloading(false);
          // console.log(res);
        })
        .catch(err => {
          // console.log(err);
          setloading(false);
          setErr(true);
        });
    }
  };
  const onChangeHandler = (i, e) => {
    let updatedReq = [...request];
    updatedReq[i].value = e.target.value;
    setRequest(updatedReq);
  };

  return (
    <div>
      <Each
        getEachClassFeeSchedule={getEachClassFeeSchedule}
        getclass={props.getclass}
        headers={headers}
        loading={loading}
        err={err}
        request={request}
        // onChage inputs data
        onChangeHandler={onChangeHandler}
        //  submitting the fee_schedule
        submitNewFeeSchedule={submitNewFeeSchedule}
      />
    </div>
  );
};

export default Event;
