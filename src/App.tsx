import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PremConsult from "./page/PremConsult";
import Home from "./page/home";
import Préop from "./page/Pré-op";

function App() {
  return (
    <Router>
      <div className="bg-base-100 prose max-w-full w-full min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PremConsult" element={<PremConsult />} />
          <Route path="/Pré-op" element={<Préop />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
