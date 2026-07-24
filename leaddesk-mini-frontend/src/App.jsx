import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './components/LandingPage'
import AdminPanel from './pages/AdminPanel'
function App() {

  return (
    <>
     <LandingPage></LandingPage>
     <AdminPanel></AdminPanel>
    </>
  )
}

export default App
