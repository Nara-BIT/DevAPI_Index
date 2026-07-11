import { useBookmarks } from "../../context/BookmarkContext";
import { useAuth } from "../../context/AuthContext";

export default function BookmarkButton({ apiId }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();

  if (!user) return null;

  const bookmarked = isBookmarked(apiId);

  return (
    <button
      onClick={() => toggleBookmark(apiId)}
      className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
        bookmarked
          ? "bg-yellow-100 border-yellow-400 text-yellow-700"
          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
      }`}
    >
      {bookmarked ? "★ Saved" : "☆ Save"}
    </button>
  );
}
