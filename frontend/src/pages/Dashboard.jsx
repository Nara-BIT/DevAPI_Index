import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <p className="text-gray-600">Please login to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> {user.role}</p>
      </div>
      <div className="mt-6 flex gap-4">
        <Link to="/bookmarks" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          My Bookmarks
        </Link>
        <Link to="/submit" className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
          Submit API
        </Link>
      </div>
    </div>
  );
}
