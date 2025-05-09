import React,{useState} from 'react'
import AuthButton from './components/AuthButton'
import Write from './components/Write';
import Heatmap from './components/Heatmap';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

export const Context = React.createContext();

function App() {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  const [today, setToday] = useState(new Date().toISOString().split('T')[0]); 
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