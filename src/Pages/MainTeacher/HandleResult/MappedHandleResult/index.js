import React from "react";
import Classes from './index.module.css';

const Index = props => {
  const woo = props.handleResult.map(v => {
    return (
      <div className={Classes.ClassBorder} key={v.class_ID}>
        <div className={Classes.Class}>{v.class_name}</div>
        {v.subjects.length > 0 ? (
          <div className={Classes.subject_name}>
            {v.subjects.map(sub => {
              return <div className={Classes.MainSubs} key={sub._id}>{sub.subject_name}</div>;
            })}
          </div>
        ) : (
          <div>No Subjects</div>
        )}
      </div>
    );
  });

  return<div>{woo}</div>
  
};

export default Index;
