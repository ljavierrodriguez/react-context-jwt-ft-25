import React from 'react'
import injectContext from './store/AppContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Menu from './components/Menu'
import { ToastContainer } from 'react-toastify'

const App = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/profile' element={<Profile />} />
                <Route path='/sign-up' element={<Register />} />
                <Route path='/sign-in' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default injectContext(App)