import React from "react";
import Classes from "./SelectCategory.module.css";
import { Select, Value } from "../../../Component/UI/Select/Select";
import Event from './Category/Event';
import Custom from './Custom/Custom';

const SelectCategory = props => {
  const allCategory = ["Custom","Teachers", "Parents", "Both"];

  const [name, setName] = React.useState("");
  const allCat = allCategory.map(v => {
    const onClick = (v, e) => {
      setName(v);
    };

    return (
      <div key={v}>
        <Value onClick={onClick.bind(this, v)}>
          {/* {loading ? <Loading /> :v} */}
          {v}
        </Value>
      </div>
    );
  });

  return (
    <div className={Classes.Selectcat}>
      <div
        // onClick={getAllClasses}
        className={Classes.Selecttt}
      >
        <h6 style={{textAlign: "right", backgroundColor: "inherit"}}>Balance: {props.loading ? "..." : props.balance}</h6>
        <div style={{ backgroundColor: "#fff" }}>
          <h4 style={{ backgroundColor: "#fff" }}>Select Category</h4>
          {/* ALL this Classes will please Fetch from BackEnd */}
          <div className={Classes.select}>
            <Select
              height="auto"
              lable="Click Here"
              //   catch={catchErr}
              className={Classes.select}
            >
              {allCat}
            </Select>
          </div>
        </div>
        <div onClick={props.event} className={Classes.GET}>
          {props.name}
        </div>
      </div>
      {name === "Custom" ? <Custom /> : <Event name={name} />}
    </div>
  );
};

export default SelectCategory;
