import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './Navbar.css';
const Navbar = ({socket}) => { 
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const noti = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJCF5BgdhlABRHM4rXBfhaKRB5oZjjy_prqYNaw3c&s"
  const settings = "data:image/png;base64,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"
  const message = "data:image/png;base64,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"
  useEffect(()=>{
    socket.on("getNotification",(data) => {
      setNotifications((prev) => [...prev,data]) 
    })
  },[socket])
  const displayNotifications = ({senderName,type}) => {
    let action; 
    if(type === 1){
      action = "liked"
    }else if(type === 2){
      action = "commented"
    }else{
      action = "shared"
    }
    return (
      <span className='notification'>{`${senderName} ${action} your post`}</span>
    )
  }
  const handleRead = () => {
    setNotifications([])
    setOpen(false)
  }
  return (
    <div className='navbar'>
      <span className='logo'>Noti App</span>
      <div className="icons">
        <div className="icon">
          <img onClick={()=>setOpen((prev)=>!prev)} src={noti} className='iconImg' alt="noti" />
            {
          <div className="counter">
              {notifications.length > 0 ? 
              notifications.length : ""}
          </div>
            }
        </div>
        <div className="icon">
          <img src={settings} className='iconImg' alt="noti" />
          <div className="counter">2</div>
        </div>
        <div className="icon">
          <img src={message} className='iconImg' alt="noti" />
          <div className="counter">2</div>
        </div>
      </div>
      {
        open && <div className='noti'>
        {notifications?.map(noti => (
          displayNotifications(noti)
        ))}
        <button onClick={handleRead} className='nbtn'>Mark as read</button>
      </div>
      }
     
    </div>
  )
}

export default Navbar