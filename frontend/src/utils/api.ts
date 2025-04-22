export const authorizedFetch = (url: string, options: RequestInit = {}) => {
  const stored = localStorage.getItem('cosmoUser');
  const token = stored ? JSON.parse(stored).token : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
