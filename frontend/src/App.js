import {useState} from 'react'
import './App.css';
import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import { posts } from './data';
import {io} from 'socket.io-client'
import { useEffect } from 'react';
function App() {
  const [username, setUsername] = useState("")
  const [socket, setSocket] = useState(null)
  const [user, setUser] = useState("")
  const setLogin = username => {
    if(username !== ""){
      setUser(username)
    }
  }
  useEffect(()=>{
    setSocket(io("http://localhost:5000"))
  },[])
  useEffect(()=>{
    socket?.emit("newUser",user)
  },[socket,user])
  return (
    <div className="container">
      {user ? 
      <>
      <Navbar socket={socket}/>
      {
        posts.map(post => (
          <Card key={post.id} post={post}  socket={socket} username={user}/>
        ))
      }
      <span className='username'>{user}</span>
      </>
       :  
        <>
        <div className="login">
        <input 
        onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username"/>
        <button onClick={()=>setLogin(username)}>Login</button>
       </div>
        </>
    }
  
    </div> 
  );
}

export default App;
