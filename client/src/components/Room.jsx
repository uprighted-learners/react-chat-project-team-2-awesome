import React, {useState, useEffect} from 'react'

const Room = ({room}) => {
const [messages, setMessages] = useState([]);
const [newMessage, setMessage] = useState('');
 
useEffect(() =>{
    const sendMessage = async () ={
        const response = await fetch(`http://localhost:9000/.com`, {
            method:'POST',
            headers: {'Authorization': `Bearer`${localStorage.getItem('token')}
            }
            const  data = await response.json();
            setMessage(data.messages)
        )
    }
    fetchMessages();
    [room])
})
 const  sendMessage =   async () =>{
    const response = await fetch(`http://localhost:9000/.com`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({content:newMessage})
    })
    const data = await response.json();
    setMessage([...message, data.message]);
    setMessage('');
 };
 
    return (
    <div>
<div className ="message-view">
    {messages.map((message) =>(
        <div key ={message.id}>{message.content}</div>
    ))}
</div>
<div className="message-input">
    <input
    type="text"
    value={mewMessage}
    onChange={(e) =>setNewMessage(e.target.value)}/>
    <button onClick={sendMessage}>Send</button>
</div>

    </div>
  );
} 

export default Room