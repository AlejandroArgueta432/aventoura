

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home/home'
import Footer from './components/Footer'
import Tour from './components/Tour/Tour'

function App() {


  return (
<BrowserRouter>
<Header/>
<Routes>

  <Route path="/" element={<Home />} />
  <Route path="/tour/:id" element={<Tour />} />
 




</Routes>
<Footer/>
</BrowserRouter>



  )
}

export default App
