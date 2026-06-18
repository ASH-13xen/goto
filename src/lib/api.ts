export function getControlPanelApi(): string {
  let baseApi = process.env.NEXT_PUBLIC_SEO_API_URL || 'http://localhost:3000/api';
  
  // Remove any trailing slashes
  baseApi = baseApi.trim().replace(/\/+$/, '');
  
  // If it does not end with /api, append it
  if (!baseApi.endsWith('/api')) {
    baseApi = `${baseApi}/api`;
  }
  
  return baseApi;
}
