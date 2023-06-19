/* eslint-disable no-unused-vars */
import React from 'react'
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import MyGigs from './pages/myGigs/MyGigs';
import Gig from './pages/gig/Gig';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Add from './pages/add/Add';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Add />} />
        <Route path='/gig/:id' element={<Gig />} />
        <Route path='/gigs' element={<Gigs />} />
        <Route path='/mygigs' element={<MyGigs />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/message/:id' element={<Message />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
