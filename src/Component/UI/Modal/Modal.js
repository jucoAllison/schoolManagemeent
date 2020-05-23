import React from "react";
import Classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  return (
    <>
      <Backdrop show={props.show} close={props.close} />
      {props.show ? (
        <div
          className={Classes.Modal}
          style={{
            top: props.top,
            transform: props.show ? "translateX(0)" : "translateX(200%)"
            // opacity: props.show ? "1" : "0"
          }}
        >
          <div className={Classes.flex}>
            <div></div>
            <div onClick={props.close}>X</div>
          </div>
          {props.children}
        </div>
      ) : null}
    </>
  );
};

export default Modal;
