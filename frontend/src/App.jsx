import React from 'react'
import AuthButton from './components/AuthButton'
import Write from './components/Write';
import Heatmap from './components/Heatmap';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  const date = new Date();
  const formattedDate = (date.getFullYear()+'-'+(date.getMonth().toString().length == 1 ? '0' : '')+date.getMonth()+'-'+(date.getDate().toString().length == 1 ? '0' : '')+date.getDate())
  
  return <>
    <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to={formattedDate}/>}/>
      <Route path='/:date' element={
      <>
      {/* <AuthButton/> */}
      <Write/>
      <br />
      <Heatmap/>
      </>
      }/>
    </Routes>
    </Router>
  </>
}

export default App