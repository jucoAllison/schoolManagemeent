import React from "react";
import Classes from "./Nav.module.css";
import { Link } from "react-router-dom";
import LOGO from "../../../Assert/logo.png"
// UI
import { Dash } from "./Sidedrawer/Dashboard/Dashboard";

// SVG
import { ReactComponent as Dashboard } from "../../../Assert/Dashboard.svg";
import { ReactComponent as Settings } from "../../../Assert/Setting.svg";
import { ReactComponent as Log } from "../../../Assert/log.svg";
import { ReactComponent as Menu } from "../../../Assert/menu.svg";
import YearTerm from "./Year_Term/YearTerm";

const Nav = props => {


  const [show, setShow] = React.useState(false);
  const [showSet, setShowSet] = React.useState(false);

  const showHandler = () => {
    setShowSet(false);
    setShow(!show);
  };
  const setShowSetHandler = () => {
    setShow(false);
    setShowSet(!showSet);
  };
  const closeHandler = () => {
    setShowSet(false);
    setShow(false);
  };

  return (
    <>
      <div className={Classes.Nav}>
        <Link
          style={{ color: "#fff", textDecoration: "none" }}
          to="/"
          onClick={setShowSetHandler}
          className={Classes.Link}
        >
          <div></div>
          <img src={LOGO} alt="PASSION LOGO" style={{width: "40px", marginTop: "-5px", height: "24px", backgroundColor:"inherit"}} />
          <main style={{marginLeft: "50px"}} className={Classes.Dashboard}>Passion Schools Aba</main>
        </Link>
        <div className={Classes.List}>
          <Menu
            onClick={showHandler}
            className={Classes.Menu}
            width="17"
            height="17"
            fill="#fff"
          />
          <ul>
            <div onClick={showHandler} className={Classes.Link}>
              <Dashboard width="17" className={Classes.Dashboard} height="17" fill="#fff" />
              <li>Dashboard</li>
            </div>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="set_my_Account"
              onClick={setShowSetHandler}
              className={Classes.Link}
            >
              <Settings width="17" className={Classes.Dashboard} height="17" fill="#fff" />
              <li>Settings</li>
            </Link>
            <div className={Classes.Link} onClick={()=>window.location.reload()}>
              <Log width="17" className={Classes.Dashboard} height="17" fill="#fff" />
              <li>Logout</li>
            </div>
          </ul>
        </div>
          <Dash close={closeHandler} show={show} />
      </div>
      <div className={Classes.down}>
        <YearTerm />
      </div>
      </>
  );
};

export default Nav;
