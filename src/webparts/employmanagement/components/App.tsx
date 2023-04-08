// import React from 'react'
import * as React from 'react';

import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import Profile from './components/Profile';


const App: React.FC = () => {
  return (
   <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-emplyee" element={<AddEmployee />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
   </>
  )
}

export default App
