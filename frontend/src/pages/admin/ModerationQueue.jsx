import { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/ui/Spinner";

export default function ModerationQueue() {
  const { user } = useAuth();
  const [pendingApis, setPendingApis] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [apisRes, statsRes] = await Promise.all([
        adminAPI.getPending(),
        adminAPI.getStats(),
      ]);
      setPendingApis(apisRes.data);
      setStats(statsRes.data);
    } catch {
      console.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <p className="text-gray-600">Admin access required.</p>
      </div>
    );
  }

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.totalApis}</p>
            <p className="text-gray-500 text-sm">Total APIs</p>
          </div>
          <div className="bg-white border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingApis}</p>
            <p className="text-gray-500 text-sm">Pending APIs</p>
          </div>
          <div className="bg-white border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
            <p className="text-gray-500 text-sm">Users</p>
          </div>
          <div className="bg-white border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.totalCategories}</p>
            <p className="text-gray-500 text-sm">Categories</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Pending Submissions</h2>
      {pendingApis.length === 0 ? (
        <p className="text-gray-500">No pending submissions.</p>
      ) : (
        <div className="space-y-4">
          {pendingApis.map((api) => (
            <div key={api._id} className="bg-white border rounded-xl p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{api.name}</h3>
                <p className="text-gray-600 text-sm">{api.description}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Submitted by: {api.submittedBy?.name || "Unknown"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={async () => { await adminAPI.approve(api._id); fetchData(); }}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={async () => { await adminAPI.reject(api._id); fetchData(); }}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
