import { useState, useEffect, useCallback, useRef } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState(null);
  
  // This ref prevents the fetch from running if the URL hasn't changed
  const lastFetchedUrl = useRef(null);

  const fetchData = useCallback(async () => {
    // If we already fetched this exact URL, don't do it again!
    if (!url || url === lastFetchedUrl.current) return;

    setLoading(true);
    setError(null);
    lastFetchedUrl.current = url; // Lock the URL

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const headers = { 'Content-Type': 'application/json' };
    if (userId) headers['user-id'] = userId;
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      lastFetchedUrl.current = null; // Unlock on error so we can retry
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setData, refetch: () => { 
    lastFetchedUrl.current = null; 
    fetchData(); 
  }};
};

export default useFetch;