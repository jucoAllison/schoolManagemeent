import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Context from "../Context/Context";
import Login from "../Layout/Login/Login";
import Home from "../../Pages/Home/HomeEvent";
import Anoucement from "../../Pages//Anoucement/Anoucement";
import Settings from '../../Pages/Settings/Settings';
import Prospectus from '../../Pages/Prospectus/Prospectus';
import Calendar from '../../Pages/Calendar/Event';
import FeeSchedule from '../../Pages/FeeSchedule/FeeSchedule';
import GenerateId from '../../Pages/GenerateId/GenerateId';
import Management from '../../Pages/Management/Management';
import Teacher from '../../Pages/Teachers/Teacher';
import Approve from '../../Pages/Approve/Approve';
import SelectedApproval from '../../Pages/SelectedApproval/SelectedApproval';
import MainTeacher from '../../Pages/MainTeacher/MainTeacher';
import SchoolPolicy from '../../Pages/Schoo_Policy/index';
import MasterSheet from '../../Pages/MasterSheeet/MasterSheeet';
import MainMasterSheet from  '../../Pages/MainMasterSheet/EventMainMaster'
import StudentDetails from  '../../Pages/StudentDetails/StudentDetails'

const Routing = props => {
    const CTX = React.useContext(Context);
    return(
        <Switch>
            {CTX.token && <Redirect from="/login" to="/" /> }
            {CTX.token && <Route path="/" exact component={Home} /> }
            {CTX.token && <Route path="/post=>_anouncement" exact component={Anoucement} /> }
            {CTX.token && <Route path="/set_my_Account" exact component={Settings} /> }
            {CTX.token && <Route path="/post=>_prospectus" exact component={Prospectus} /> }
            {CTX.token && <Route path="/post=>_calender" exact component={Calendar} /> }
            {CTX.token && <Route path="/post=>_schedule" exact component={FeeSchedule} /> }
            {CTX.token && <Route path="/generate=>_ID" exact component={GenerateId} /> }
            {CTX.token && <Route path="/Handle=>_management" exact component={Management} /> }
            {CTX.token && <Route path="/Handle=>_teachers" exact component={Teacher} /> }
            {CTX.token && <Route path="/Approved_Result" exact component={Approve} /> }
            {CTX.token && <Route path="/Approve_of_=>_/:StudentName/:id" exact  component={SelectedApproval} /> }
            {CTX.token && <Route path="/main=>_teacher/:id" exact  component={MainTeacher} /> }
            {CTX.token && <Route path="/post=>_policy" exact  component={SchoolPolicy} /> }
            {CTX.token && <Route path="/get=>_masterSheet" exact  component={MasterSheet} /> }
            {CTX.token && <Route path="/download=>_masterSheet" exact  component={MainMasterSheet} /> }
            {CTX.token && <Route path="/get=>_studentFullDetails" exact component={StudentDetails} /> }
            {CTX.token && <Route path="*" exact component={Login} /> }
            {!CTX.token && <Route path="/login" render={() => <Login />} />}
            {!CTX.token && <Redirect from="/" to="/login" /> }
        </Switch>
    )
    // Approved_Result
}
export default Routing;