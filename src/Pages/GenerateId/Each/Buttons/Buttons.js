import React from "react";
import Classes from "./Buttons.module.css";

const Buttons = props => {
  //     s
  return (
    <form style={{ backgroundColor: "#fff" }} className={Classes.form}>
      Click
      <button
        style={{ color: props.toggle ? "#e72626" : "#198dfb" }}
        onClick={props.buttonClicked}
      >
        here
      </button>{" "}
      to {props.toggle ? "remove generated" : "generate"} random ID
    </form>
  );
};
export default Buttons;
