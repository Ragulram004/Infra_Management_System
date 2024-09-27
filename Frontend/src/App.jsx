import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthContext } from './hooks/useAuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AssignAudit from './pages/Admin/AssignAudit/AssignAudit';
import AssignedAudit from './pages/Admin/AssignedAudit/AssignedAudit';
import AssignedFixers from './pages/Admin/AssignedFixers/AssignedFixers';
import AuditorReport from './pages/Admin/AuditorReport/AuditorReport';
import HandymanReport from './pages/Admin/HandymanReport/HandymanReport';
import EditPersonnel from './pages/Admin/EditPersonnel/EditPersonnel';

import AuditorDashboard from './pages/Auditor/Dashboard/Dashboard';
import AuditorTask from './pages/Auditor/AuditorTask/AuditTask';

import HandymanDashboard from './pages/Handyman/Dashboard/Dashboard';
import HandymanTask from './pages/Handyman/HandymanTask/HandymanTask';

import Login from './pages/Login/Login';

function App() {
  const clientId = import.meta.env.VITE_INFRA_CLIENT_ID;
  const { user, loading } = useAuthContext(); // Access loading state

  // Show a loading indicator while the user data is being fetched
  if (loading) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>; // You can replace this with a custom loader
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        {!user ? (
          // If no user is logged in, show the login route
          <>
            <Route path="/login" element={<Login />} />
            {/* Redirect all other routes to the login page */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          // If the user is logged in, handle routing based on their role
          <>
            {user.role === 'admin' && (
              // Admin routes
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/assign_audit" element={<AssignAudit />} />
                <Route path="/assigned_audits" element={<AssignedAudit />} />
                <Route path="/assigned_fixers" element={<AssignedFixers />}/>
                <Route path="/auditor_report" element={<AuditorReport />} />
                <Route path="/handyman_report" element={<HandymanReport />} />
                <Route path="/edit_personnels" element={<EditPersonnel />} />
              </Route>
            )}

            {user.role === 'auditor' && (
              // Auditor routes
              <Route path="/" element={<Layout />}>
                <Route index element={<AuditorDashboard />} />
                <Route path="/audit_area" element={<AuditorTask />} />
              </Route>
            )}

            {user.role === 'handyman' && (
              // Handyman routes
              <Route path="/" element={<Layout />}>
                <Route index element={<HandymanDashboard />} />
                <Route path="/fix_area" element={<HandymanTask />} />
              </Route>
            )}

            {/* If user tries to access /login while logged in, redirect to the home page */}
            <Route path="/login" element={<Navigate to="/" />} />

            {/* Redirect any undefined routes for logged-in users to the home page */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
