const BASE_URL = "http://localhost:3005/comments";

async function request(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "API error");
  }

  return res.json();
}

// get all comments
export async function getComments() {
    return request(BASE_URL);
}
