import React from "react";
import Classes from "./Card.module.css";

const Card = ({ BgColor = "#198dfb", onClick, number = 0, SVG, name }) => {
    const style = {
        backgroundColor: BgColor
    }
  return (
    <div style={style} onClick={onClick} className={Classes.Card}>
      <h4 style={{backgroundColor: "inherit"}}>{name}</h4>
      <div className={Classes.lowerCard}>
        {SVG} 
        <span>{number}</span>
      </div>
    </div>
  );
};
export default Card;
