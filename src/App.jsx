import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuraTemplate from "./templates/AuraTemplate";
import VertexTemplate from "./templates/VertexTemplate";
import NexusTemplate from "./templates/NexusTemplate";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { sampleClient } from "./data/sampleData";
import ClientCard from "./pages/ClientCard";
import OrderForm from "./pages/OrderForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Customer Order Form */}
        <Route path="/order" element={<OrderForm />} />

        {/* Client Card Routes */}
        <Route path="/card/:clientId" element={<ClientCard />} />
        <Route path="/c/:clientId" element={<ClientCard />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Template Previews (keep for demo) */}
        <Route
          path="/preview/aura"
          element={<AuraTemplate clientData={sampleClient} />}
        />
        <Route
          path="/preview/vertex"
          element={<VertexTemplate clientData={sampleClient} />}
        />
        <Route
          path="/preview/nexus"
          element={<NexusTemplate clientData={sampleClient} />}
        />

        {/* Redirects */}
        <Route
          path="/hakunamatata"
          element={<Navigate to="/admin-login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
