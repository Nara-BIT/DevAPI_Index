import { createContext, useContext, useState, useEffect } from "react";
import { bookmarksAPI } from "../services/api";
import { useAuth } from "./AuthContext";

const BookmarkContext = createContext(null);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      bookmarksAPI
        .getAll()
        .then((res) => setBookmarks(res.data))
        .catch(() => setBookmarks([]));
    } else {
      setBookmarks([]);
    }
  }, [user]);

  const toggleBookmark = async (apiId) => {
    const res = await bookmarksAPI.toggle(apiId);
    setBookmarks(res.data.bookmarks);
    return res.data.bookmarks;
  };

  const isBookmarked = (apiId) => {
    return bookmarks.some((b) => b === apiId || b._id === apiId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useBookmarks must be used within BookmarkProvider");
  return context;
};
