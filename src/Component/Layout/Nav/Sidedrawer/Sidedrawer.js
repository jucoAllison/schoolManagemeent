import React from "react";
import Classes from "./Sidedrawer.module.css";
import { Link } from "react-router-dom";
import Backdrop from "../../../UI/Backdrop/Backdrop";

export const Sidedrawer = ({ show, children, close }) => {
  return (
    <div>
      <Backdrop show={show} close={close} />
      <div
        style={{
          transform: show ? "translateX(0)" : "translateX(200%)",
          opacity: show ? "1" : "0"
        }}
        className={Classes.Sidedrawer}
      >
        {children}
      </div>
    </div>
  );
};

export const LinkValue = ({ show, children, to }) => {
  return (
    <div className={Classes.Link}>
      <Link style={{ color: "#fff", textDecoration: "none" }} to={`/${to}`}>
        {children}
      </Link>
    </div>
  );
};
