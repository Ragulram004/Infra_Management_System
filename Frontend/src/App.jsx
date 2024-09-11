import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthContext } from './hooks/useAuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AssignAudit from './pages/Admin/AssignAudit/AssignAudit';
import AssignedAudit from './pages/Admin/AssignedAudit/AssignedAudit';
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
    return <div>Loading...</div>; // You can replace this with a custom loader
  }

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
      {user ? (
      <Routes>
        {user?.role === 'admin' && (
          // Admin routes
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/assign_audit" element={<AssignAudit />} />
              <Route path="/assigned_audits" element={<AssignedAudit />} />
              <Route path="/auditor_report" element={<AuditorReport />} />
              <Route path="/handyman_report" element={<HandymanReport />} />
              <Route path="/edit_personnels" element={<EditPersonnel />} />
            </Route>
          </>
        )}

        {user?.role === 'auditor' && (
          // Auditor routes
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<AuditorDashboard />} />
              <Route path="/audit_area" element={<AuditorTask />} />
            </Route>
          </>
        )}

        {user?.role === 'handyman' && (
          // Handyman routes
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<HandymanDashboard />} />
              <Route path="/fix_area" element={<HandymanTask />} />
            </Route>
          </>
        )}

        {/* Redirect to login if no specific role route is matched */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      ) : (
        // If no user is logged in, redirect to login page
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
