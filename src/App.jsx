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
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Success from './pages/success/Success';
import Pay from './pages/pay/Pay';

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add' element={<Add />} />
          <Route path='/gig/:id' element={<Gig />} />
          <Route path='/gigs' element={<Gigs />} />
          <Route path='/mygigs' element={<MyGigs />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/message/:id' element={<Message />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/pay/:id' element={<Pay />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
