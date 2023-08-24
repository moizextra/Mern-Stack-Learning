import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Header from './Componets/Header'
import Footer from './Componets/Footer'
import Home from './Componets/Home'
function App() {

  return (
<Router>
<Header/>
<Routes>
<Route exact path="/" element={<Home />} />
</Routes>
<Footer/>
</Router>

  )
}

export default App
