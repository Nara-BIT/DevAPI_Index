import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apisAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SubmitApi() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    url: "",
    category: "",
    authType: "none",
    cors: false,
    https: true,
    docUrl: "",
  });
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <p className="text-gray-600 mb-4">You need to be logged in to submit an API.</p>
        <a href="/login" className="text-blue-600 hover:underline">Login here</a>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apisAPI.submit(form);
      navigate("/browse");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Submit an API</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="API Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="url"
          placeholder="API Base URL"
          value={form.url}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="category"
          placeholder="Category ID"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select name="authType" value={form.authType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
          <option value="none">No Auth</option>
          <option value="api-key">API Key</option>
          <option value="oauth2">OAuth2</option>
          <option value="basic">Basic Auth</option>
          <option value="bearer">Bearer Token</option>
        </select>
        <input
          name="docUrl"
          placeholder="Documentation URL (optional)"
          value={form.docUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="cors" checked={form.cors} onChange={handleChange} />
            <span className="text-sm">Supports CORS</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="https" checked={form.https} onChange={handleChange} />
            <span className="text-sm">HTTPS</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Submit for Review
        </button>
      </form>
    </div>
  );
}
