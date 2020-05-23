import React from "react";
import Classes from "./Anoucement.module.css";
import Nav from "../../Component/Layout/Nav/Nav";
import Goback from "../../Component/UI/GoBack/GoBack";
import SelectCategory from './Select/SelectCategory';

const Anoucement = props => {
  const GobackHandler = () => {
    props.history.goBack()
  }
  
  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = React.useState("")
  const getBalance = () => {
    setLoading(true)
    fetch(`https://account.kudisms.net/api/?username=jucoallison@gmail.com&password=myheart4jucoallison.kudisms&action=balance`,{
      method: "POST"
    })
    .then(res => res.json())
    .then(res => {
      setLoading(false)
      setBalance(res.balance)
    })
    .catch(err =>{
      setLoading(false)
      // getBalance()      
    })
  }

  React.useEffect(_ => {
    getBalance()
  }, [])
  return (
    <div className={Classes.Anoucement}>
        <Nav />
        <Goback Goback={GobackHandler}/>
          <h4>Make Anoucement</h4>
          <SelectCategory loading={loading} balance={balance} />
    </div>
  );
};

export default Anoucement;
