import React from "react";
import Classes from "./inputAdd.module.css";
import {ReactComponent as Good } from "../../../Assert/good.svg"

const InputAdd = props => {
// const PropsDocuments = props => {
    // const [show, setShow] = React.useState(false)
    const [show,setShow] = React.useState(false)
    // const [show, setShow] = React.useState(true)

    const setShowHandler = () => {
        setShow(!show)
    }
  return (
    <div style={{backgroundColor: "#fff"}}>
      {show ? (
          <center>
          <form onSubmit={props.onSubmit} style={{backgroundColor: "#fff"}} className={Classes.form}>
            <input
              required
              autoFocus
              value={props.value}
              onChange={props.onChange.bind(this)}
              className={Classes.input}
              type="text"
              placeholder={props.placeholder}
            />
            <button className={Classes.button}>{props.loading ? <div style={{backgroundColor: "inherit", color: "#fff"}}>...</div> : <Good style={{backgroundColor: "inherit"}} width="24" height="24" fill="#fff" />}</button>
          </form>
        </center>
      ) : null}
      <h5 style={{backgroundColor: "#fff"}} className={Classes.Label} onClick={setShowHandler}>{props.label}</h5>
    </div>
  );
};

export default InputAdd;
