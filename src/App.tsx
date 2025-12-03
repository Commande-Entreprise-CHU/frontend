import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import DossierPatient from "./page/DossierPatient";
import PremConsult from "./page/forms/PremConsult";
import NewPatient from "./page/forms/NewPatient";
import PreOp from "./page/forms/PreOp";
import PostOp6 from "./page/forms/PostOp6";
import PostOp3 from "./page/forms/PostOp3";
import SearchPatient from "./page/SearchPatient";

function App() {
  return (
    <Router>
      <div className="bg-base-100 prose max-w-full w-full min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPatient />} />

          <Route path="/patient/new" element={<NewPatient />} />
          {/* Dossier del paciente */}

          <Route path="/patient/:id" element={<DossierPatient />} />
          <Route path="/patient/:id/prem-consult" element={<PremConsult />} />
          <Route path="/patient/:id/pre-op" element={<PreOp />} />
          <Route path="/patient/:id/post-op-3" element={<PostOp3 />} />
          <Route path="/patient/:id/post-op-6" element={<PostOp6 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
