import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Users from './Users.jsx'
import NewUser from './NewUser.jsx'
import EditUser from './EditUser.jsx'
import ViewUser from './ViewUser.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WorkStation from './WorkStation.jsx'
import NewWorkStation from './NewWorkStation.jsx'
import NewGroup from './NewGroup.jsx'
import EditGroup from './EditGroup.jsx'
import Header from './components/Header.jsx'
import DashBoardLayout from './layout/DashBoardLayout.jsx'
import ProtectedRoute from "./routes/ProtectedRoute";
import EditWorkStation from './EditWorkStation.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

   
  <BrowserRouter>
      <Routes>
        <Route path='/login' element={<App />} />

        <Route element={<ProtectedRoute>
                   <DashBoardLayout />
          </ProtectedRoute>}>
        <Route path='/users' element={<Users />} />
        <Route path = '/new-user' element={<NewUser />} />
        <Route path = '/edit-user/:userId' element={<EditUser /> } />
        <Route path='/view-user/:userId' element={<ViewUser />} />
        <Route path='/new-group' element={<NewGroup />} />
        <Route path='/edit-group/:id' element={<EditGroup />} />
        <Route path='/workstation' element={<WorkStation />} />
        <Route path='/new-workstation' element={<NewWorkStation />} />
        <Route path='/edit-workstation/:id' element={<EditWorkStation/>} />
        </Route>
      </Routes>
      <ToastContainer />
  </BrowserRouter>

);
