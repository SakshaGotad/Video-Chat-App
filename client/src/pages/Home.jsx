import React, { useCallback, useEffect, useState } from 'react'
import '../App.css';
import {useNavigate} from 'react-router-dom';
import { useSocket } from '../provider/Socket';
const Home = () => {
  const {socket}  = useSocket();
  const navigate = useNavigate();
  const[email,setEmail]= useState();
  const[roomId,setRoomID]= useState();
 
  const handleRoomJoined = useCallback(({roomId})=>{
   navigate(`/room/${roomId}`);
  },[navigate]);

  useEffect(()=>{
    socket.on("joined-room",handleRoomJoined);
    return()=>{
      socket.off('joined-room',handleRoomJoined);
    }
  },[handleRoomJoined,socket]);

 /*********** for input handle onclick  **************/
  const handleJoinRoom=()=>{    
    socket.emit("join-room",{emailId:email , roomId});
  }
/********************************** */
  return (
   
    <div className='homepg-container'>
      <div className="input-container">
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter email here" />
        <input type="text" value={roomId} onChange={(e)=>setRoomID(e.target.value)} placeholder="enter room code" />
        <button onClick={handleJoinRoom}>Call Now</button>
      </div>
    </div>
  
  )
}

export default Home
