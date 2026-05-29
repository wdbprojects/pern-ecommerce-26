const base = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (
  path: string,
  opts: {
    method?: string;
    body?: FormData;
    headers?: Record<string, string>;
  } = {},
) => {
  const { method = "GET", body, headers = {} } = opts;
  const response = await fetch(`${base}${path}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }
  return data;
};
