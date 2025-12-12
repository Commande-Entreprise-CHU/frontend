import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import DossierPatient from "./page/DossierPatient";
import NewPatient from "./page/forms/NewPatient";
import SearchPatient from "./page/SearchPatient";
import TemplateManager from "./page/TemplateManager";
import GenericForm from "./page/forms/GenericForm";
import Login from "./page/Login";
import Register from "./page/Register";
import AdminUsers from "./page/AdminUsers";
import AdminChus from "./page/AdminChus";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-base-100 prose max-w-full w-full min-h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

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
                path="/templates"
                element={
                  <>
                    <Navbar />
                    <TemplateManager />
                  </>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <>
                    <Navbar />
                    <AdminUsers />
                  </>
                }
              />
              <Route
                path="/admin/chus"
                element={
                  <>
                    <Navbar />
                    <AdminChus />
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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
