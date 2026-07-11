import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

export default function ApiCard({ api }) {
  const authColors = {
    none: "green",
    "api-key": "yellow",
    oauth2: "blue",
    basic: "red",
    bearer: "blue",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <Link to={`/api/${api._id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
          {api.name}
        </Link>
        {api.avgRating > 0 && (
          <span className="text-yellow-500 text-sm">&#9733; {api.avgRating}</span>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{api.description}</p>
      <div className="flex flex-wrap gap-2">
        {api.category && <Badge color="blue">{api.category.name}</Badge>}
        <Badge color={authColors[api.authType] || "gray"}>{api.authType}</Badge>
        {api.cors && <Badge color="green">CORS</Badge>}
        {api.https && <Badge color="green">HTTPS</Badge>}
      </div>
    </div>
  );
}
