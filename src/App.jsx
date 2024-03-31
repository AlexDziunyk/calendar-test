import { useEffect, useState } from 'react'
import './App.css'
import { getMonth } from './utils/util'
import Month from './components/Month/Month';
import { createBrowserRouter, createRoutesFromElements, useNavigate, RouterProvider, Route, Navigate } from 'react-router-dom';

import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { app } from "./firebase/app";
import Calendar from './pages/Calendar/Calendar';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Root from './pages/Root/Root';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/Login';
import CalendarChoose from './pages/CalendarChoose/CalendarChoose';
import { CalendarContext, CalendarProvider } from './context/CalendarContext';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import Invite from './pages/Invite/Invite';



function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<CalendarChoose />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/calendar/:id' element={<Calendar />}></Route>
      <Route path='/invite/:userId/:id' element={<Invite />}></Route>
    </>
  ))

  return (
    <AuthProvider>
      <CalendarProvider>
        <RouterProvider router={router} />
      </CalendarProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </AuthProvider>
  )
}

export default App
