import React from "react"
import Classes  from './GoBack.module.css'

const Goback = props => {
    return(
        <div>
            <div onClick={props.Goback} className={Classes.Goback}>&#x2190;</div>
        </div>
    )
}

export default Goback;