const BASE_URL = "http://localhost:3005/comments";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "API error");
  }

  return res.json();
}

// get all comments
export async function getComments(sort) {
    if (sort) {
        return request(`${BASE_URL}?sort=${sort}`);
    }

    return request(BASE_URL);
}

// create
export async function createComment(text) {
    return request(BASE_URL, {
        method: "POST",
        body: JSON.stringify({text})
    });
}

// update
export async function updateComment(id, text) {
    return request(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ text })
    });
}

// delete
export async function deleteComment(id) {
    return request(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
}
