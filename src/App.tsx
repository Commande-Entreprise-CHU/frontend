import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import DossierPatient from "./page/DossierPatient";
import PremConsult from "./page/forms/PremConsult";
import Préop from "./page/forms/PreOp";
import Postop6mois from "./page/forms/Post-op6mois";
import Postop3mois from "./page/forms/PostOp";
import Find from "./page/Find";

function App() {
  return (
    <Router>
      <div className="bg-base-100 prose max-w-full w-full min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Find" element={<Find />} />

          <Route path="/patient/new/prem-consult" element={<PremConsult />} />
          {/* Dossier del paciente */}
          
          <Route path="/patient/:id" element={<DossierPatient />} />
          <Route path="/patient/:id/prem-consult" element={<PremConsult />} />
          <Route path="/patient/:id/pre-op" element={<Préop />} />
          <Route path="/patient/:id/post-op-3" element={<Postop3mois />} />
          <Route path="/patient/:id/post-op-6" element={<Postop6mois />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
