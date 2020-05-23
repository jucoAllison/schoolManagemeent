import React from "react";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import Classes from "./Settings.module.css";
import User from "./User/User";
// import Add from "./Add/Add";
import YearTermEvent from "./Year_Term/Year_TermEvent";
import PasswordEvent from './PasswordEvent/Event'; 
import PhoneEvent from './PhoneEvent/Event'

const Settings = props => {
    // HANDLING ALL THE SHOWINGS
    const [showYear, setShowYear] = React.useState(false)
    const [showUser, setShowUser] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPhone, setShowPhone] = React.useState(false)
    // SETTINGS ALL THE HANDLERs
    const showYearHandler = () => setShowYear(!showYear);
    const showUserHandler = () => setShowUser(!showUser);
    const showPasswordHandler = () => setShowPassword(!showPassword);
    const showPhoneHandler = () => setShowPhone(!showPhone);

    // FOR GOING BACK
    const GobackHandler = () => {
        props.history.goBack()
    }

    return(
        <div className={Classes.Settings}>
            <Nav />
            <Goback Goback={GobackHandler}/>
            <div style={{ textAlign: "center", margin: "40px 0px",color: "#000" }}>Settings</div>
            <h4 onClick={showYearHandler} className={Classes.Year}>Change Seasion</h4>
            <YearTermEvent show={showYear} />
            <h4 onClick={showUserHandler} className={Classes.User}>Change User_Name</h4>
            <User show={showUser}/>
            <h4 onClick={showPasswordHandler} className={Classes.Password}>Change Password</h4>
            <PasswordEvent showPassword={showPassword}/>
            <h4 onClick={showPhoneHandler} className={Classes.Password}>Phone Update</h4>
            <PhoneEvent showPhone={showPhone}/>
            
        </div>
    )
}

export default Settings;