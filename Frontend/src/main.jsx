import 'regenerator-runtime/runtime';
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PersonnelsContextProvider } from './context/PersonnelContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
      <PersonnelsContextProvider>
        <App />
        <ToastContainer position="bottom-right" />
      </PersonnelsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
