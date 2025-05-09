import React from 'react'

function MyTextbox({textArea, setTextArea}) {
  return (
    <textarea name="content" id="" value={textArea} onChange={(e) => setTextArea(e.target.value)} rows={10} cols={10}></textarea>
  )
}

export default MyTextbox