import React from "react";
import InputAdd from "../../../../../../../../Component/UI/inputAdd/inputAdd";

const AddPerformance = props => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <InputAdd
        onSubmit={props.onSubmit}
        value={props.value}
        onChange={props.onChange.bind(this)}
        loading={props.loading}
        placeholder="Performance ..."
        label="New Performance"
      />
    </div>
  );
};

export default AddPerformance;
