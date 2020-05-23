import React from "react";
import InputAdd from "../../../../../../../../Component/UI/inputAdd/inputAdd";

const AddSubject = props => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <InputAdd
        onSubmit={props.onSubmit}
        value={props.value}
        onChange={props.onChange.bind(this)}
        loading={props.loading}
        placeholder="Subject ..."
        label="New Subject"
      />
    </div>
  );
};

export default AddSubject;
