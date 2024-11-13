export function fetchCompanies(path: string, initRequest?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_TRACTIAN_API;
  const url = new URL(path, baseUrl);
  return fetch(url, initRequest);
}
