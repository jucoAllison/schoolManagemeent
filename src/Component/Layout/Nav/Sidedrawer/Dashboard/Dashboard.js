import React from "react";
import { Sidedrawer, LinkValue } from '../Sidedrawer' ;
import Classes from "./Dashboard.module.css";
import Context from '../../../../Context/Context';

// SVG for DasshBoard
import { ReactComponent as Anoun} from "../../../../../Assert/sideBarIcon/anouncement.svg";
import { ReactComponent as Meeting} from "../../../../../Assert/sideBarIcon/meeting.svg";
import { ReactComponent as Messages} from "../../../../../Assert/sideBarIcon/messages.svg";
import { ReactComponent as Calender} from "../../../../../Assert/sideBarIcon/calendar-6.svg";
import { ReactComponent as Feeschedule} from "../../../../../Assert/sideBarIcon/feeSchedule.svg";
import { ReactComponent as Stu} from "../../../../../Assert/sideBarIcon/Stu.svg";
import { ReactComponent as Log } from "../../../../../Assert/log.svg";
import { ReactComponent as Tea} from "../../../../../Assert/sideBarIcon/Tea.svg";
import { ReactComponent as Scrach} from "../../../../../Assert/sideBarIcon/scratchCard.svg";
import { ReactComponent as Control} from "../../../../../Assert/controls.svg";
import { ReactComponent as Set} from "../../../../../Assert/Setting.svg";


export const Dash = props => {
  const CTX = React.useContext(Context);

  return (
    <Sidedrawer close={props.close} show={props.show}>
      {CTX.token.allowAccess ? <LinkValue to="Handle=>_management"><div className={Classes.Dashboard}><span><Tea className={Classes.BG} width="17" height="17" fill="#fff" /></span>Management</div></LinkValue> : null}
      <LinkValue to="Handle=>_teachers"><div className={Classes.Dashboard}><span><Control className={Classes.BG} width="17" height="17" fill="#fff" /></span>Teachers</div></LinkValue>
      <LinkValue to="post=>_calender"><div className={Classes.Dashboard}><span><Calender className={Classes.BG} width="17" height="17" fill="#fff" /></span>School_Calendar</div></LinkValue>
      <LinkValue to="post=>_policy"><div className={Classes.Dashboard}><span><Meeting className={Classes.BG} width="17" height="17" fill="#fff" /></span>School_Policy</div></LinkValue>
      <LinkValue to="post=>_schedule"><div className={Classes.Dashboard}><span><Feeschedule className={Classes.BG} width="17" height="17" fill="#fff" /></span>Fee_Schedule</div></LinkValue>
      <LinkValue to="post=>_anouncement"><div className={Classes.Dashboard}><span><Anoun className={Classes.BG} width="17" height="17" fill="#fff" /></span>Announcement</div></LinkValue>
      <LinkValue to="post=>_prospectus"><div className={Classes.Dashboard}><span><Feeschedule className={Classes.BG} width="17" height="17" fill="#fff" /></span>Propectus</div></LinkValue>
      {CTX.token.main_admin ? <LinkValue to="generate=>_ID"><div className={Classes.Dashboard}><span><Scrach className={Classes.BG} width="17" height="17" fill="#fff" /></span>Genrate Scrach Card</div></LinkValue>: null }
      <LinkValue to="Approved_Result"><div className={Classes.Dashboard}><span><Stu className={Classes.BG} width="17" height="17" fill="#fff" /></span>Approval</div></LinkValue>
      <LinkValue to="get=>_masterSheet"><div className={Classes.Dashboard}><span><Messages className={Classes.BG} width="17" height="17" fill="#fff" /></span>Master_Sheets</div></LinkValue>
      <LinkValue to="set_my_Account"><div className={Classes.Dashboard}><span><Set className={Classes.BG} width="17" height="17" fill="#fff" /></span>Settings</div></LinkValue>
      <LinkValue><div onClick={() => window.location.reload()} className={Classes.Dashboard}><span><Log className={Classes.BG} width="17" height="17" fill="#fff" /></span>Log_Out</div></LinkValue>
    </Sidedrawer>
  );
};

