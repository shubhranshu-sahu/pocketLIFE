import React from 'react'

function MyInput({textVal, setTextVal}) {
    return (
        <input type="text" name="title" value={textVal} onChange={(e)=>setTextVal(e.target.value)}/>
    )
}

export default MyInput