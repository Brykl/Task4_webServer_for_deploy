import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './signup.jsx';
import { BrowserRouter, Route, Routes }
    from "react-router-dom";
import SignIn from './signIn.jsx';
import DenseAppBar from './login.jsx';


function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path="/main/:userName" element={<DenseAppBar/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

