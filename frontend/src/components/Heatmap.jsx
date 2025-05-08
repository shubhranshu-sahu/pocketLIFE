import React from 'react'

function Heatmap() {
    const boxes = Array.from(Array(365));


  return (
    <>
    <div id='heatmap-container' className='container'>
      <div id='heatmap'>
        {boxes.map((item,index)=>{
          return <div key={index} className='box'></div>
        })}
      </div>
    </div>
    </>
  )
}

export default Heatmap