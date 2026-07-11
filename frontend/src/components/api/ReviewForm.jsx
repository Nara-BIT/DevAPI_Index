import { useState } from "react";
import { reviewsAPI } from "../../services/api";

export default function ReviewForm({ apiId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await reviewsAPI.create(apiId, { rating: Number(rating), comment });
      setComment("");
      setRating(5);
      onReviewAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 space-y-3">
      <h4 className="font-semibold">Write a Review</h4>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex items-center gap-2">
        <label className="text-sm">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Submit Review
      </button>
    </form>
  );
}
