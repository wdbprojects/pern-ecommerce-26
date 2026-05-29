/* const base = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (
  path: string,
  opts: { method?: string; body?: FormData } = {},
) => {
  const { method = "GET", body } = opts;
  const headers = { "Content-Type": "application/json" };

  let res;

  try {
    res = await fetch(`${base}${path}`, {
      method: method,
      credentials: "include",
      headers: headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw err;
  }
  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data?.error === "string" ? data.error : res.statusText;
    const error = new Error(
      typeof message === "string" ? message : "Request failed",
    );
    throw error;
  }
  return data;
};
 */
