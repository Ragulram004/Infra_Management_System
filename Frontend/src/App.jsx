import Login from './pages/Login/Login'
import { Routes,Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './components/shared/Layout';
import Dashboard from './pages/Dashboard/Dashboasd';
import AssignAudit from './pages/AssignAudit/AssignAudit';
import AuditorReport from './pages/AuditorReport/AuditorReport';
import HandymanReport from './pages/HandymanReport/HandymanReport';
import EditPersonnel from './pages/EditPersonnel/EditPersonnel';



function App() {

  const clientId = import.meta.env.VITE_INFRA_CLIENT_ID


  return (
    <>
      <GoogleOAuthProvider clientId={clientId} >
        <Routes>
          <Route path = '/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='/assign_audit' element={<AssignAudit/>}/>
            <Route path='/auditor_report' element={<AuditorReport/>}/>
            <Route path='/handyman_Report' element={<HandymanReport/>}/>
            <Route path='/edit_personnels' element={<EditPersonnel/>}></Route>
          </Route>

          <Route path='login' element={<Login/>}/>
        </Routes>
      </GoogleOAuthProvider>  
    </>
  )
}

export default App
