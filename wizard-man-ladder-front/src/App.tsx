import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { IUser } from './IUser';
import LadderList from './LadderList';




function App() {

  const [arrUser, setArrUser] = useState(Array<IUser>);


  useEffect(() => {
    axios.get('https://wizard-man.space/ladder').then( (response:any) => {
      let dinamo: Array<IUser> = response.data
      dinamo.sort((a, b) => b.Score - a.Score) 
      setArrUser(dinamo)
    })
    .catch(function (error:any) {
      console.log(error);
    })

  }, []);

  return (
    <div className="App">
      <LadderList arrUser={arrUser}></LadderList>
    </div>
  );
}

export default App;
