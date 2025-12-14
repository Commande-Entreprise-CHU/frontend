import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import DossierPatient from "./page/DossierPatient";
import NewPatient from "./page/forms/NewPatient";
import SearchPatient from "./page/SearchPatient";
import TemplateManager from "./page/TemplateManager";
import GenericForm from "./page/forms/GenericForm";
import Login from "./page/Login";
import Register from "./page/Register";
import AdminDashboard from "./page/AdminDashboard";
import NotFound from "./page/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="bg-base-100 prose max-w-full w-full min-h-screen">
            <Toast />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Standard authenticated routes - all roles */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <Home />
                    </>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <>
                      <Navbar />
                      <SearchPatient />
                    </>
                  }
                />
                <Route
                  path="/patient/new"
                  element={
                    <>
                      <Navbar />
                      <NewPatient />
                    </>
                  }
                />
                <Route
                  path="/patient/:id"
                  element={
                    <>
                      <Navbar />
                      <DossierPatient />
                    </>
                  }
                />
                <Route
                  path="/patient/:id/form/:slug"
                  element={
                    <>
                      <Navbar />
                      <GenericForm />
                    </>
                  }
                />
              </Route>

              {/* Master Admin only routes */}
              <Route element={<ProtectedRoute allowedRoles={["master_admin"]} />}>
                <Route
                  path="/templates"
                  element={
                    <>
                      <Navbar />
                      <TemplateManager />
                    </>
                  }
                />
              </Route>

              {/* Admin routes - Master Admin and CHU Admin */}
              <Route element={<ProtectedRoute requireAdmin />}>
                <Route
                  path="/admin"
                  element={
                    <>
                      <Navbar />
                      <AdminDashboard />
                    </>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
