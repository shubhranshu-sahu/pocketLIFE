import React,{useState} from 'react'
import AuthButton from './components/AuthButton'
import Write from './components/Write';
import Heatmap from './components/Heatmap';
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

export const Context = React.createContext();

function App() {
  const date = new Date();
  // console.log(date.toDateString());
  function toTwoDigits(number) {
    return String(number).padStart(2, '0');
  }

  const formattedDate = date.getFullYear()+'-'+ toTwoDigits(date.getMonth()+1)+'-'+toTwoDigits(date.getDate());
  // console.log(formattedDate)
  const [today, setToday] = useState(formattedDate); 
  const [changesMade, setChanges] = useState(false);

  return <>
    <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to={formattedDate}/>}/>
      <Route path='/:date' element={
      <>
      {/* <AuthButton/> */}
      <Context.Provider value={[changesMade, setChanges, today, setToday]}>
      <Write/>
      <br />
      <Heatmap today={today}/>
      </Context.Provider>
      </>
      }/>
    </Routes>
    </Router>
  </>
}

export default App