import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const PeerContext = createContext();

export const PeerProvider =(props)=>{

    const [remotestream ,setRemotestream]= useState();
const peer = useMemo(()=> new RTCPeerConnection({
    iceServers:[{
        urls:[
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478"
        ],
    },]
}),[])


const createOffer =async()=>{
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
}


const createAnswer =async(offer)=>{
  peer.setRemoteDescription(offer);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  return answer;
}

const sendStream = async(stream)=>{
const tracks = stream.getTracks();  
for (const track of  tracks){
    peer.addTrack(track,stream);
}
}

const setRemoteAns= async(ans)=>{
    await peer.setRemoteDescription(ans)
}

const handleTrackevent =useCallback((ev)=> {
    const streams= ev.stream;
    setRemotestream(streams[0])
},[])


useEffect(()=>{
peer.addEventListener('track',handleTrackevent)

return ()=>{
    peer.removeEventListener('track',handleTrackevent);
  
}
},[handleTrackevent,peer])
    return(
        <PeerContext.Provider value={{peer,createOffer,createAnswer,setRemoteAns,sendStream,remotestream}}>
            {props.children}
        </PeerContext.Provider>
    )
};

export const usePeer=()=> useContext(PeerContext);