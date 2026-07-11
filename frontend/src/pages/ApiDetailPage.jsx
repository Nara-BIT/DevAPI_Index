import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apisAPI, reviewsAPI } from "../services/api";
import BookmarkButton from "../components/bookmarks/BookmarkButton";
import ReviewForm from "../components/api/ReviewForm";
import ReviewList from "../components/api/ReviewList";
import TestInBrowser from "../components/api/TestInBrowser";
import Badge from "../components/ui/Badge";
import Spinner from "../components/ui/Spinner";

export default function ApiDetailPage() {
  const { id } = useParams();
  const [api, setApi] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [apiRes, reviewsRes] = await Promise.all([
        apisAPI.getById(id),
        reviewsAPI.getByApi(id),
      ]);
      setApi(apiRes.data);
      setReviews(reviewsRes.data);
    } catch {
      setApi(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <Spinner />;
  if (!api) return <div className="text-center py-12 text-gray-500">API not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/browse" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        &larr; Back to Browse
      </Link>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold">{api.name}</h1>
          {api.url && (
            <a href={api.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">
              {api.url}
            </a>
          )}
        </div>
        <BookmarkButton apiId={api._id} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {api.category && <Badge color="blue">{api.category.name}</Badge>}
        <Badge>{api.authType}</Badge>
        {api.cors && <Badge color="green">CORS</Badge>}
        {api.https && <Badge color="green">HTTPS</Badge>}
        {api.avgRating > 0 && (
          <Badge color="yellow">{"★".repeat(Math.round(api.avgRating))} ({api.reviewCount})</Badge>
        )}
      </div>

      <p className="text-gray-700 mb-8 leading-relaxed">{api.description}</p>

      {api.docUrl && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Documentation</h2>
          <a
            href={api.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Official Documentation &rarr;
          </a>
        </div>
      )}

      {api.endpoints?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Endpoints</h2>
          <div className="space-y-3">
            {api.endpoints.map((ep, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <span className={`font-mono text-sm font-bold ${
                  ep.method === "GET" ? "text-green-600" :
                  ep.method === "POST" ? "text-blue-600" :
                  ep.method === "DELETE" ? "text-red-600" : "text-yellow-600"
                }`}>
                  {ep.method}
                </span>
                <span className="ml-2 font-mono text-sm">{ep.path}</span>
                {ep.description && <p className="text-gray-500 text-sm mt-1">{ep.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Try It Out</h2>
        <TestInBrowser endpoints={api.endpoints || []} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <ReviewForm apiId={api._id} onReviewAdded={fetchData} />
        <div className="mt-4">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
