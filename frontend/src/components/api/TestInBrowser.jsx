import { useState } from "react";

export default function TestInBrowser({ endpoints = [] }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [params, setParams] = useState({});
  const [apiKey, setApiKey] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTest = async () => {
    if (!selectedEndpoint) return;
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const url = new URL(selectedEndpoint.path, window.location.origin);
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });

      const headers = {};
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

      const res = await fetch(url.toString(), { headers });
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  if (!endpoints.length) {
    return (
      <div className="text-gray-500 text-sm text-center py-4">
        No endpoints available to test.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 space-y-4">
      <h4 className="font-semibold">Test in Browser</h4>

      <select
        onChange={(e) => {
          setSelectedEndpoint(endpoints[e.target.value]);
          setParams({});
          setResponse(null);
        }}
        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2"
      >
        <option value="">Select endpoint...</option>
        {endpoints.map((ep, i) => (
          <option key={i} value={i}>
            {ep.method} {ep.path}
          </option>
        ))}
      </select>

      {selectedEndpoint && (
        <>
          <div>
            <label className="text-sm text-gray-400">API Key (if needed)</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Bearer token or API key"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 mt-1"
            />
          </div>

          {selectedEndpoint.parameters?.map((param) => (
            <div key={param.name}>
              <label className="text-sm text-gray-400">
                {param.name} {param.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type="text"
                value={params[param.name] || ""}
                onChange={(e) => setParams({ ...params, [param.name]: e.target.value })}
                placeholder={param.description}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 mt-1"
              />
            </div>
          ))}

          <button
            onClick={handleTest}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </>
      )}

      {error && <div className="text-red-400 text-sm">{error}</div>}

      {response && (
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-sm text-gray-400 mb-1">Status: {response.status}</p>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
