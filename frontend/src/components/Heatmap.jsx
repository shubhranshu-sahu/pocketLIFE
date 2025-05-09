import React, { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import '../heatmap.css'
import { Tooltip } from 'react-tooltip'
// import { ResponsiveCalendar } from '@nivo/calendar'

function Heatmap() {
    // const boxes = Array.from(Array(365));
    const [dates, setDates] = useState([]);
    

    useEffect(()=>{
      var boxes = [];
      var day = new Date('2025-01-00');
      for(let i=0; i<=366; i++){
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        boxes.push({"date": nextDay.toISOString().split('T')[0], "count": Math.round(Math.random()*4)})
        day = nextDay;
      }

      setDates(boxes);
      console.log(boxes)
    },[])

    const MyResponsiveCalendar = ({ data }) => (
        <ResponsiveCalendar
            data={data}
            from="2025-03-01"
            to="2025-07-12"
            emptyColor="#eeeeee"
            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
    )


  return (
      <>
      <Tooltip id='myid' />
    <div id='heatmap-container' className='container'>
      {/* {MyResponsiveCalendar(dates)} */}
    <CalendarHeatmap
        startDate={new Date('2024-12-30')}
        endDate={new Date('2025-12-00')}
        showMonthLabels
        // showWeekdayLabels
        values={dates}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-box-${value.count}`;
        }}
        gutterSize={3}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return null;
          }
          return {'data-tooltip-content': value.date, 'data-tooltip-id': 'myid'}
          ;
        }}
        />
      
    </div>
    </>
  )
}

export default Heatmap