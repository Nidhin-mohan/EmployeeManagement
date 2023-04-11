// import React from 'react'
import * as React from 'react';

import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import Profile from './components/Profile';
import AddImage from './components/AddImage';
import SharePointImage from './Image';
import Documents from './components/Documents';


const App: React.FC = () => {
  return (
   <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-emplyee" element={<AddEmployee />} />
      <Route path="/add-emplyee/image/:id" element={<AddImage />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profile/documents" element={<Documents />} />
      <Route path="/image" element={<SharePointImage />} />

    </Routes>
   </>
  )
}

export default App
