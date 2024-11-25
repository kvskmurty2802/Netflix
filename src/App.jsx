import React, { useState, useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  // const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        {/* <Route
          path="/search"
          element={<SearchPage searchQuery={searchQuery} />}
        /> */}
      </Routes>
      
    </div>
  )
}

export default App;
