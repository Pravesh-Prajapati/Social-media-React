import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddPost from './components/pages/AddPost'
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'

function App() {
 
  return (
    <>
    <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/addpost' element={<AddPost/>}/>
     </Routes>
    </BrowserRouter>
    {/* <Home/> */}
    </>
  )
}

export default App
