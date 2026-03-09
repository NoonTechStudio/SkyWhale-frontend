import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, AlertCircle, ExternalLink, Home } from "lucide-react";
import AuraTemplate from "../templates/AuraTemplate";
import VertexTemplate from "../templates/VertexTemplate";
import NexusTemplate from "../templates/NexusTemplate";
import { clientAPI } from "../services/api";

const ClientCard = ({ subdomainOverride }) => {
  const params = useParams();
  const clientId = subdomainOverride || params.clientId;

  // useNavigate may not work outside Router, so guard it
  let navigate;
  try {
    navigate = useNavigate();
  } catch {
    navigate = () => (window.location.href = "/");
  }

  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [template, setTemplate] = useState("aura");

  useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      setError("");

      try {
        let data;

        if (subdomainOverride) {
          // Always fetch by subdomain when coming from subdomain URL
          data = await clientAPI.getBySubdomain(subdomainOverride);
        } else if (clientId && !clientId.match(/^[a-f\d]{24}$/i)) {
          // Not a MongoDB ID — treat as subdomain
          data = await clientAPI.getBySubdomain(clientId);
        } else {
          // Fetch by MongoDB ID
          data = await clientAPI.getById(clientId);
        }

        setClientData(data);
        setTemplate(data.template || "aura");
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError("Client card not found or expired.");

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClientData();
    } else {
      setError("No client ID provided");
      setLoading(false);
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Loading Business Card
          </h2>
          <p className="text-slate-600">
            Please wait while we load the content...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Card Not Available
          </h2>
          <p className="text-slate-700 mb-6">{error}</p>
          <div className="space-y-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Go to Homepage
            </button>
            <p className="text-sm text-slate-500">
              Redirecting to homepage in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    const templateProps = { clientData };
    switch (template) {
      case "vertex":
        return <VertexTemplate {...templateProps} />;
      case "nexus":
        return <NexusTemplate {...templateProps} />;
      case "aura":
      default:
        return <AuraTemplate {...templateProps} />;
    }
  };

  return (
    <div className="client-card-page">
      {renderTemplate()}
      {import.meta.env.DEV && clientData && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-xl text-sm backdrop-blur-sm z-50">
          <div className="flex items-center gap-2">
            <ExternalLink size={14} />
            <span>Preview Mode</span>
          </div>
          <div className="text-xs mt-1 opacity-75">
            Client: {clientData.businessName}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientCard;