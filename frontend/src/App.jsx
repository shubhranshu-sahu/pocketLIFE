import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import AuthButton from './components/AuthButton'

function App() {

  const [titleVal, setTitleVal] = useState('The End of An Era');
  const [descVal, setDescVal] = useState('The End of An Era');

  const boxes = Array.from(Array(365).keys());

  return <>
    <AuthButton/>
    <div className="container" style={{flexDirection:'column'}}>
      <h1>Date: 20-01-2025</h1>
      <InputText style={{width:'100%'}} value={titleVal} onChange={(e) => setTitleVal(e.target.value)} />
    </div>
    <br />
    <div className="container">
      <div style={{ height:'30rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', border:'1px dashed'}}>
          <img src="https://images.stockcake.com/public/f/6/2/f6200ac6-9e40-4081-a36d-51b45ead18c4_large/antique-journal-collection-stockcake.jpg" style={{objectFit:'cover', height:'100%'}} width={300} alt=""/>
      </div>
      <div style={{maxWidth:'700px',flex:1, marginLeft:'2rem'}}>
        <InputTextarea value={descVal} onChange={(e) => setDescVal(e.target.value)} style={{width:'100%' , height:'30rem', resize:'none'}} rows={20}/>
      </div>
    </div>

    <br />

    <div id='heatmap-container' className='container'>
      <div id='heatmap'>
        {boxes.map((item, index)=>{
          return <div className='box'>{index}</div>
        })}
      </div>
    </div>
  </>
}

export default App