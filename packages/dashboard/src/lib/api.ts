/**
 * Centralized API client logic to ensure Explicit Base URL injection.
 * Prevents 404/401 errors caused by missing environment context during re-instantiation.
 */

const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  
  console.log(`[API Client] Explicitly calling: ${url}`);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API_ERROR: ${response.status} - ${errorText || response.statusText}`);
  }

  return response.json() as Promise<T>;
}
