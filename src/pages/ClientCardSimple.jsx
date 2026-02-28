import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuraTemplate from "../templates/AuraTemplate";
import VertexTemplate from "../templates/VertexTemplate";
import NexusTemplate from "../templates/NexusTemplate";
import { clientAPI } from "../services/api";

const mapBackendToTemplate = (backendData) => {
  return {
    businessName: backendData.businessName || "Business Name",
    ownerName: backendData.ownerName || "Owner Name",
    tagline: backendData.tagline || "Tagline",
    phone: backendData.contact?.phone || "+919999999999",
    whatsapp: backendData.contact?.whatsapp || backendData.contact?.phone || "",
    email: backendData.contact?.email || "email@example.com",
    // Build contact array as expected by AuraTemplate
    contact: [
      { address: backendData.contact?.address || "Address not specified" },
      { email: backendData.contact?.email || "email@example.com" },
      { phone: backendData.contact?.phone || "+919999999999" },
      {}, // fourth item (maybe not used)
      {
        openingHours: backendData.contact?.openingHours || [
          "Mon-Sat: 9AM-6PM",
          "Sun: Closed",
        ],
      },
    ],
    social: backendData.social || {
      facebook: "#",
      instagram: "#",
      youtube: "#",
      linkedin: "#",
      googleMaps: "#",
    },
    payment: backendData.payment || {
      upiId: "",
      qrCode: "",
      acceptedMethods: [],
    },
    services: backendData.services || [],
    gallery: backendData.gallery || [],
    template: backendData.template || "aura",
  };
};

const ClientCardSimple = () => {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        console.log("Fetching client with ID:", clientId);

        // Use the new public endpoint for ID lookup
        const data = await clientAPI.getPublic(clientId);
        console.log("Client data received:", data);

        setClientData(data);
      } catch (err) {
        console.error("Error fetching client:", err);
        setError("Client not found");
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    } else {
      setError("No client ID provided");
      setLoading(false);
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading business card...</p>
        </div>
      </div>
    );
  }

  if (error || !clientData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Card Not Found
          </h2>
          <p className="text-gray-600">
            {error || "The requested business card does not exist."}
          </p>
        </div>
      </div>
    );
  }

  // Transform backend data to template format
  const templateData = mapBackendToTemplate(clientData);

  // Determine which template to render
  switch (clientData.template) {
    case "vertex":
      return <VertexTemplate clientData={templateData} />;
    case "nexus":
      return <NexusTemplate clientData={templateData} />;
    default:
      return <AuraTemplate clientData={templateData} />;
  }
};

export default ClientCardSimple;
