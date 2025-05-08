import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import '../heatmap.css'
import { Tooltip } from 'react-tooltip'


function Heatmap() {
    const boxes = Array.from(Array(365));

  return (
      <>
      <Tooltip id='myid' />
    <div id='heatmap-container' className='container'>
    <CalendarHeatmap
        startDate={new Date('2025-01-01')}
        endDate={new Date('2026-01-01')}
        showMonthLabels
        showWeekdayLabels
        gutterSize={3}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return null;
          }
          return {'data-tooltip-content': value.date, 'data-tooltip-id': 'myid'}
          ;
        }}
        values={[
            { date: '2025-01-01', count: 12 },
            { date: '2025-01-22', count: 122 },
            { date: '2025-01-30', count: 38 },
            // ...and so on
        ]}
        />
      {/* <div id='heatmap'>
        {boxes.map((item,index)=>{
          return <div key={index} className='box'></div>
        })}
      </div> */}
    </div>
    </>
  )
}

export default Heatmap