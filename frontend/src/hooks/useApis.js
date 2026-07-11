import { useState, useEffect } from "react";
import { apisAPI } from "../services/api";

export const useApis = (initialParams = {}) => {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [params, setParams] = useState(initialParams);

  const fetchApis = async (queryParams = params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apisAPI.getAll(queryParams);
      setApis(res.data.apis);
      setPagination({
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch APIs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis();
  }, [params]);

  return { apis, loading, error, pagination, params, setParams, refetch: fetchApis };
};
