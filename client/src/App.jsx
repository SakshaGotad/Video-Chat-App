import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { SocketProvider } from './provider/Socket';
import {PeerProvider}from './provider/Peer'
import Room from './pages/Room';
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <SocketProvider>
      <PeerProvider>  
      <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/room/:roomId" element={<Room/>}></Route>
      </Routes>
      </PeerProvider>
      </SocketProvider>

    </BrowserRouter>
  )
}

export default App
