import 'regenerator-runtime/runtime';
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
     <BrowserRouter>
          <App />
          <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
)
