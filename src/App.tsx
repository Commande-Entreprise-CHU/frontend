import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PremConsult from "./page/PremConsult";

function App() {
  return (
    <Router>
      <div className="bg-base-100 ">
        <Navbar />
        <Routes>
          <Route path="/PremConsult" element={<PremConsult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
