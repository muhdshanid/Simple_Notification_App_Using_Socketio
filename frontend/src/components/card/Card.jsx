import React from "react";
import { useState } from "react";
import "./Card.css";
const Card = ({ post ,socket,username}) => {
  const [liked, setliked] = useState(false);
  const heart =
    "data:image/png;base64,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";
  const heartFilled =
    "data:image/png;base64,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";
  const comment =
    "data:image/png;base64,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";
  const share =
    "data:image/png;base64,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";
  const info =
    "data:image/png;base64,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";
    const handleNotification = (type) => {
      setliked(true)
      socket.emit("sendNotification",{
        senderName:username,
        receiverName:post.username,
        type
      })
      console.log("emited");
    }
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked === false ? (
          <img onClick={()=>handleNotification(1)} src={heart} className="icon" alt="" />
        ) : (
          <img 
            src={heartFilled} className="icon" alt="" />
        )}
        <img onClick={()=>handleNotification(2)}  src={comment} className="icon" alt="" />
        <img onClick={()=>handleNotification(3)}  src={share} className="icon" alt="" />
        <img src={info} className="icon" alt="" />
      </div>
    </div>
  );
};

export default Card;