import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import DossierPatient from "./page/DossierPatient";
import NewPatient from "./page/forms/NewPatient";
import SearchPatient from "./page/SearchPatient";
import TemplateManager from "./page/TemplateManager";
import GenericForm from "./page/forms/GenericForm";

function App() {
  return (
    <Router>
      <div className="bg-base-100 prose max-w-full w-full min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPatient />} />
          <Route path="/templates" element={<TemplateManager />} />

          <Route path="/patient/new" element={<NewPatient />} />
          {/* Dossier del paciente */}

          <Route path="/patient/:id" element={<DossierPatient />} />
          <Route path="/patient/:id/form/:slug" element={<GenericForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
