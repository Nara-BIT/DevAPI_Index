import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            DevAPI Index
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/browse" className="text-gray-600 hover:text-gray-900">
              Browse
            </Link>
            {user ? (
              <>
                <Link to="/submit" className="text-gray-600 hover:text-gray-900">
                  Submit API
                </Link>
                <Link to="/bookmarks" className="text-gray-600 hover:text-gray-900">
                  Bookmarks
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{user.name}</span>
                  <button onClick={logout} className="text-sm text-red-600 hover:text-red-700">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
