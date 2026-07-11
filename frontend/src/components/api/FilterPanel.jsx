import { useState } from "react";

const defaultFilters = {
  authType: "",
  cors: "",
  https: "",
  category: "",
};

export default function FilterPanel({ filters, onFilterChange, categories = [] }) {
  const [local, setLocal] = useState({ ...defaultFilters, ...filters });

  const handleChange = (key, value) => {
    const updated = { ...local, [key]: value };
    setLocal(updated);
    const cleaned = {};
    Object.entries(updated).forEach(([k, v]) => {
      if (v !== "") cleaned[k] = v;
    });
    onFilterChange(cleaned);
  };

  const clearFilters = () => {
    setLocal(defaultFilters);
    onFilterChange({});
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">
          Clear
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={local.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Auth Type</label>
        <select
          value={local.authType}
          onChange={(e) => handleChange("authType", e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          <option value="none">None</option>
          <option value="api-key">API Key</option>
          <option value="oauth2">OAuth2</option>
          <option value="basic">Basic</option>
          <option value="bearer">Bearer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CORS</label>
        <select
          value={local.cors}
          onChange={(e) => handleChange("cors", e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">HTTPS</label>
        <select
          value={local.https}
          onChange={(e) => handleChange("https", e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  );
}
