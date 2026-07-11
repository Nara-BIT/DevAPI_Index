import { Link } from "react-router-dom";
import { useApis } from "../hooks/useApis";

export default function Home() {
  const { apis, loading } = useApis({ limit: 6, sort: "-avgRating" });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Discover Public APIs</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Browse, test, and bookmark APIs organized by category. Find the perfect API for your next project.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/browse" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
            Browse APIs
          </Link>
          <Link to="/submit" className="border border-gray-300 px-8 py-3 rounded-lg text-lg hover:bg-gray-50">
            Submit an API
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Top Rated APIs</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apis.map((api) => (
              <Link
                key={api._id}
                to={`/api/${api._id}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{api.name}</h3>
                  {api.avgRating > 0 && (
                    <span className="text-yellow-500 text-sm">&#9733; {api.avgRating}</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{api.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
