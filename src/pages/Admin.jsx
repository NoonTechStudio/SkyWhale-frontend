// src/pages/Admin.jsx
import React, { useState } from "react";
import { Save, Users, Eye, Copy, CheckCircle, Package } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    tagline: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    template: "aura", // aura, vertex, nexus
    businessType: "service", // service, retail, food, medical, etc.
    services: [""],
    gallery: [],
    payment: {
      upiId: "",
      qrCode: "",
      showPayment: true,
    },
    social: {
      facebook: "",
      instagram: "",
      googleMaps: "",
    },
  });

  const [clients, setClients] = useState([]);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const businessTypes = [
    { id: "service", name: "Service Business", icon: "🔧" },
    { id: "medical", name: "Medical/Clinic", icon: "🏥" },
    { id: "retail", name: "Retail Shop", icon: "🛍️" },
    { id: "food", name: "Restaurant/Cafe", icon: "🍽️" },
    { id: "beauty", name: "Beauty/Salon", icon: "💇" },
    { id: "auto", name: "Automotive", icon: "🚗" },
    { id: "other", name: "Other", icon: "📄" },
  ];

  const templates = [
    {
      id: "aura",
      name: "Aura Template",
      price: "₹999/year",
      color: "bg-blue-500",
    },
    {
      id: "vertex",
      name: "Vertex Template",
      price: "₹1499/year",
      color: "bg-purple-500",
    },
    {
      id: "nexus",
      name: "Nexus Template",
      price: "₹1999/year",
      color: "bg-green-500",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate client ID from business name
    const clientId = form.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 20);

    // Create client object
    const newClient = {
      id: clientId,
      ...form,
      createdAt: new Date().toISOString(),
      status: "active",
      url: `https://${clientId}.onepagerplus.in`,
    };

    // Add to clients list
    setClients([...clients, newClient]);

    // Set generated URL
    setGeneratedUrl(newClient.url);

    // Reset form
    setForm({
      businessName: "",
      ownerName: "",
      tagline: "",
      phone: "",
      whatsapp: "",
      email: "",
      address: "",
      template: "aura",
      businessType: "service",
      services: [""],
      gallery: [],
      payment: { upiId: "", qrCode: "", showPayment: true },
      social: { facebook: "", instagram: "", googleMaps: "" },
    });

    // In real app, you would save to database here
    console.log("New client created:", newClient);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const addService = () => {
    setForm({ ...form, services: [...form.services, ""] });
  };

  const removeService = (index) => {
    const newServices = form.services.filter((_, i) => i !== index);
    setForm({ ...form, services: newServices });
  };

  const updateService = (index, value) => {
    const newServices = [...form.services];
    newServices[index] = value;
    setForm({ ...form, services: newServices });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100">Manage client business cards</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">Total Clients</p>
                <p className="text-xl font-bold">{clients.length}</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab("add")}
              className={`px-6 py-3 font-medium ${activeTab === "add" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
            >
              <Save size={18} className="inline mr-2" />
              Add New Client
            </button>
            <button
              onClick={() => setActiveTab("view")}
              className={`px-6 py-3 font-medium ${activeTab === "view" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
            >
              <Eye size={18} className="inline mr-2" />
              View All Clients ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`px-6 py-3 font-medium ${activeTab === "templates" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
            >
              <Package size={18} className="inline mr-2" />
              Templates
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Add New Client Tab */}
        {activeTab === "add" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {generatedUrl ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Client Added Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Share this URL with your client
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <code className="text-blue-600 break-all">
                    {generatedUrl}
                  </code>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => copyToClipboard(generatedUrl)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
                  >
                    <Copy size={18} className="mr-2" />
                    Copy URL
                  </button>
                  <button
                    onClick={() => {
                      setGeneratedUrl("");
                      setActiveTab("view");
                    }}
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg"
                  >
                    View All Clients
                  </button>
                  <button
                    onClick={() => setGeneratedUrl("")}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg"
                  >
                    Add Another Client
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-6">
                  Add New Business Card
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border rounded-lg"
                        placeholder="Sharma Medical Store"
                        value={form.businessName}
                        onChange={(e) =>
                          setForm({ ...form, businessName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Owner Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border rounded-lg"
                        placeholder="Dr. Rajesh Sharma"
                        value={form.ownerName}
                        onChange={(e) =>
                          setForm({ ...form, ownerName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg"
                      placeholder="Your Health, Our Priority"
                      value={form.tagline}
                      onChange={(e) =>
                        setForm({ ...form, tagline: e.target.value })
                      }
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full p-3 border rounded-lg"
                        placeholder="+91 9876543210"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 border rounded-lg"
                        placeholder="+91 9876543210"
                        value={form.whatsapp}
                        onChange={(e) =>
                          setForm({ ...form, whatsapp: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full p-3 border rounded-lg"
                        placeholder="contact@business.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Business Type
                      </label>
                      <select
                        className="w-full p-3 border rounded-lg"
                        value={form.businessType}
                        onChange={(e) =>
                          setForm({ ...form, businessType: e.target.value })
                        }
                      >
                        {businessTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.icon} {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <textarea
                      className="w-full p-3 border rounded-lg"
                      rows="3"
                      placeholder="123 Main Street, City, State"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>

                  {/* Template Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Choose Template
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`border rounded-lg p-4 cursor-pointer ${form.template === template.id ? "border-blue-500 border-2 bg-blue-50" : "border-gray-200"}`}
                          onClick={() =>
                            setForm({ ...form, template: template.id })
                          }
                        >
                          <div className="flex items-center mb-2">
                            <div
                              className={`w-4 h-4 rounded-full ${template.color} mr-2`}
                            ></div>
                            <span className="font-semibold">
                              {template.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {template.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium">
                        Services/Products
                      </label>
                      <button
                        type="button"
                        onClick={addService}
                        className="text-blue-600 text-sm"
                      >
                        + Add Service
                      </button>
                    </div>

                    {form.services.map((service, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          className="flex-1 p-3 border rounded-lg"
                          placeholder="Service name"
                          value={service}
                          onChange={(e) => updateService(index, e.target.value)}
                        />
                        {form.services.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Payment Info */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      UPI ID (for payments)
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg"
                      placeholder="businessname@upi"
                      value={form.payment.upiId}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          payment: { ...form.payment, upiId: e.target.value },
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
                  >
                    <Save className="inline mr-2" size={20} />
                    Create Business Card
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* View All Clients Tab */}
        {activeTab === "view" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">
              All Clients ({clients.length})
            </h2>

            {clients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No clients added yet. Add your first client!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left">Business</th>
                      <th className="p-3 text-left">Template</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">URL</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-semibold">
                            {client.businessName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {client.ownerName}
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              client.template === "aura"
                                ? "bg-blue-100 text-blue-800"
                                : client.template === "vertex"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {client.template}
                          </span>
                        </td>
                        <td className="p-3">
                          {
                            businessTypes.find(
                              (t) => t.id === client.businessType,
                            )?.icon
                          }
                          <span className="ml-2">{client.businessType}</span>
                        </td>
                        <td className="p-3">
                          <a
                            href={client.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {client.url}
                          </a>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => copyToClipboard(client.url)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            Copy
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Available Templates</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-xl overflow-hidden"
                >
                  <div className={`h-3 ${template.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center mr-3`}
                      >
                        <Package className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{template.name}</h3>
                        <p className="text-gray-600">{template.price}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <CheckCircle
                          size={16}
                          className="text-green-500 mr-2"
                        />
                        Professional design
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          size={16}
                          className="text-green-500 mr-2"
                        />
                        Mobile responsive
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          size={16}
                          className="text-green-500 mr-2"
                        />
                        WhatsApp integration
                      </li>
                      <li className="flex items-center">
                        <CheckCircle
                          size={16}
                          className="text-green-500 mr-2"
                        />
                        QR code generator
                      </li>
                      {template.id === "vertex" && (
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="text-green-500 mr-2"
                          />
                          Photo gallery
                        </li>
                      )}
                      {template.id === "nexus" && (
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="text-green-500 mr-2"
                          />
                          White-label option
                        </li>
                      )}
                    </ul>

                    <div className="text-center">
                      <a
                        href={`/preview/${template.id}`}
                        target="_blank"
                        className="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                      >
                        View Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Panel */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-3">📋 Your Process:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Client contacts you</strong> via WhatsApp/phone
            </li>
            <li>
              <strong>Collect ₹999/1499/1999</strong> payment via UPI
            </li>
            <li>
              <strong>Fill this form</strong> with client details
            </li>
            <li>
              <strong>Copy generated URL</strong> and send to client
            </li>
            <li>
              <strong>Client shares link</strong> on WhatsApp/Social Media
            </li>
            <li>
              <strong>Yearly renewal:</strong> Contact client before expiry
            </li>
          </ol>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="font-bold mb-2">WhatsApp Message Template:</p>
            <textarea
              readOnly
              value="नमस्ते! \n\nआपका डिजिटल बिजनेस कार्ड तैयार है!\n\nलिंक: [PASTE_URL_HERE]\n\nइसे शेयर करें:\n✓ WhatsApp पर\n✓ सोशल मीडिया\n✓ ईमेल सिग्नेचर\n✓ प्रिंटेड कार्ड्स पर QR कोड\n\nग्राहक आपको सीधे कॉल/WhatsApp कर सकते हैं।\n\nधन्यवाद!"
              className="w-full p-3 border rounded bg-white text-sm"
              rows="6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
