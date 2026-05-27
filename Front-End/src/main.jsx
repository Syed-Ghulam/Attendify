import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Users from './Users.jsx'
import NewUser from './NewUser.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WorkStation from './WorkStation.jsx'
import NewWorkStation from './NewWorkStation.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path='/login' element={<App />} />
        <Route path='/users' element={<Users />} />
        <Route path = '/new-user' element={<NewUser />} />
        <Route path='/workstation' element={<WorkStation />} />
        <Route path='/new-workstation' element={<NewWorkStation />} />
      </Routes>
  </BrowserRouter>
)
