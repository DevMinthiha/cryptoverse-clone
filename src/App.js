import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CryptoCurrencies from './pages/CryptoCurrencies'
import CryptoDetail from './pages/CryptoDetail'
import HomePage from './pages/HomePage'
import News from './pages/News'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/' element={<HomePage />} />
        <Route path='/currencies' element={<CryptoCurrencies />} />
        <Route path='/news' element={<News />} />
        <Route path='/detail/:coinId' element={<CryptoDetail />} />
      </Routes>
    </div>
  )
}

export default App
