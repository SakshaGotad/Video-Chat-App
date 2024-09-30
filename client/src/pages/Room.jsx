import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../provider/Socket'
import {usePeer} from '../provider/Peer'
import ReactPlayer from 'react-player';

const Room = () => {
 const {socket} = useSocket();
const {peer ,createOffer,createAnswer,setRemoteAns,sendStream,remotestream}= usePeer();

const [myStream, setMystream]= useState(null);
const [remoteEmailId, setRemoteEmailid]= useState()
 

const handleNewUserJoined=useCallback(async (data)=>{
  const {emailId}= data;
  console.log("new user  joined room",emailId);
  const offer = await createOffer();
  socket.emit("call-user",{emailId,offer});
  setRemoteEmailid(emailId);
},[createOffer,socket]); 



/**user b  */
const handleIncomingCall=useCallback(async(data)=>{
  const {from, offer}= data;
  console.log("incoming call from ",from,offer);
  const ans = await createAnswer(offer);
  socket.emit('call-accepted',{emailId:from, ans});

},[createAnswer,socket]);
 
/**user a */
const handleCallAccepted= useCallback(async(data)=>{
  const {ans}= data;  
  console.log('call got accepted', ans);
  await setRemoteAns(ans);
},[setRemoteAns]);

const getUserMediaStream = useCallback(async()=>{
  const stream = await navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true  
  });
 
  setMystream(stream);
  await sendStream(stream);
});

const handleNegotiation=useCallback(()=>{
  console.log("nego please");
  const localOffer =peer.localDescription;
  socket.emit('call-user',{emailId:remoteEmailId,offer:localOffer});
},[peer.localDescription,remoteEmailId,socket]);


useEffect(()=>{
    socket.on('user-joined',handleNewUserJoined);
    socket.on("incoming-call",handleIncomingCall);
    socket.on('call-accepted',handleCallAccepted);
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off('call-accepted',handleCallAccepted);
  }; 
 },[handleNewUserJoined,handleIncomingCall,socket]);
 

 useEffect(()=>{
  peer.addEventListener('negotiationneeded',handleNegotiation)
   return ()=>{
    peer.removeEventListener('track',handleNegotiation);
  }

 },[handleNegotiation,peer])
 useEffect(()=>{
  getUserMediaStream();
 },[])

 return (
    <div className="room-page-container">
      <h3> you are connected to {remoteEmailId}</h3>
      hey there, you are in room page 
      <button onClick={(e)=>sendStream(myStream)}>send my video</button>
      <ReactPlayer url={myStream} playing />
      <ReactPlayer url={remotestream}/>
    </div>
  )
}

export default Room
