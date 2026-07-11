import { useBookmarks } from "../context/BookmarkContext";
import { useAuth } from "../context/AuthContext";
import ApiCard from "../components/api/ApiCard";
import Spinner from "../components/ui/Spinner";

export default function Bookmarks() {
  const { bookmarks } = useBookmarks();
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <p className="text-gray-600 mb-4">Please login to see your bookmarks.</p>
        <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">You haven't bookmarked any APIs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((api) => (
            <ApiCard key={api._id} api={api} />
          ))}
        </div>
      )}
    </div>
  );
}
