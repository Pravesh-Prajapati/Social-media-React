import React, { createContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export let usercontext = createContext()
function AuthContextProvider({ children }) {
  const [signup, setsignup] = useState([])
  const [currentuser, setcurrentuser] = useState({})
  useEffect(() => {
    let getcurrentuser = JSON.parse(localStorage.getItem("instasignin")) || {}
    setcurrentuser(getcurrentuser)
  }, [])

  useEffect(() => {
    let getsignup= JSON.parse(localStorage.getItem("instaSignup"))||[]
    setsignup(getsignup)
  }, [])
  

  let signupdata = (val) => {
    // console.log(val);
    let signupuser = [...signup, val]
    setsignup(signupuser)
    localStorage.setItem("instaSignup", JSON.stringify(signupuser))
  }
  let signindata = (value) => {
    // console.log(value);
    setcurrentuser(value)
    localStorage.setItem("instasignin", JSON.stringify(value))
  }
  let logoutdata=()=>{
    setcurrentuser({})
    localStorage.removeItem("instasignin")
  }
  return (
    <usercontext.Provider value={{ signupdata, signindata, currentuser,logoutdata }}>
      {children}
    </usercontext.Provider>
  )
}

export default AuthContextProvider