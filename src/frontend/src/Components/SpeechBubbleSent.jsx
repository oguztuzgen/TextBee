import React from 'react'
import "./SpeechBubble.css"

function SpeechBubbleSent(props) {
  return (
    <div style={{ position:'absolute', right:'10px'}}>
      <div style={{marginLeft:'10px'}}> <h1 style={{fontSize:'medium', fontWeight:'800'}}>{props.name}li</h1></div>

      <div style={{display:'flex', alignItems:'center', gap:'20px'}}>

      <p>{props.message}li</p>
      <h2 style={{fontSize:'medium', fontWeight:'500'}}>20:03</h2>
      </div>
    
    </div>
  )
}

export default SpeechBubbleSent