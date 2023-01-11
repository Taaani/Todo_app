import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register';
import ForgetPassword from './ForgetPassword';

const Index = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgetPassword' element={<ForgetPassword/>} />
      </Routes>
    </>
  )
}

export default Index