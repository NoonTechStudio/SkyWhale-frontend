import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuraTemplate from "./templates/AuraTemplate";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { sampleClient } from "./data/sampleData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/card/:clientId"
          element={<AuraTemplate clientData={sampleClient} />}
        />
        <Route
          path="/preview"
          element={<AuraTemplate clientData={sampleClient} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
