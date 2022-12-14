import ChatCard from '../Components/ChatCard'
import React from 'react'

function ChatPreviews({ conversations }) {
    return (
        <div style={{width:'100rem'}}>
    
        <div style={{marginTop:'10px', gap:'5px', listStyle:'none', display:'flex', flexDirection:'column'}}>
          {
            conversations.map((conversation) => <ChatCard name={conversation.users.join(', ')} />)
          }
          {/* <ChatCard name='Alper' message='Ceyda seri'></ChatCard>
          <ChatCard name='Ece' message='Ceyda acil gel'></ChatCard>
          <ChatCard name='Oğuz' message='gec kalma sakin'></ChatCard> */}
          </div>
          
    
        </div>
      )
}

export default ChatPreviews