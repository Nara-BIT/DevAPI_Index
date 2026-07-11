import { useState, useEffect } from "react";
import { useApis } from "../hooks/useApis";
import ApiCard from "../components/api/ApiCard";
import SearchBar from "../components/api/SearchBar";
import FilterPanel from "../components/api/FilterPanel";
import Pagination from "../components/ui/Pagination";
import Spinner from "../components/ui/Spinner";

export default function Browse() {
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { apis, loading, error, pagination, setParams } = useApis();

  useEffect(() => {
    setParams({ ...filters, search, page, limit: 12 });
  }, [filters, search, page]);

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse APIs</h1>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        <main className="flex-1">
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-4">{pagination.total} APIs found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apis.map((api) => (
                  <ApiCard key={api._id} api={api} />
                ))}
              </div>
              {apis.length === 0 && (
                <p className="text-center text-gray-500 py-12">No APIs found matching your criteria.</p>
              )}
              <Pagination
                page={pagination.page}
                pages={pagination.pages}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
