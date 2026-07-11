export default function ReviewList({ reviews }) {
  if (!reviews.length) {
    return <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-sm">{review.user?.name || "Anonymous"}</span>
            <span className="text-yellow-500 text-sm">{"★".repeat(review.rating)}</span>
          </div>
          {review.comment && <p className="text-gray-600 text-sm">{review.comment}</p>}
          <p className="text-gray-400 text-xs mt-1">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
