// Analyze expenses by sending them to the backend (Python or Node API)
export async function analyzeExpenses(expenses) {
  // You may want to change this endpoint to match your backend route
  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() ? `Bearer ${getToken()}` : '',
    },
    body: JSON.stringify({ expenses }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'API error');
  return json;
}
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
}

export async function apiGet(path) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "API error");
  return json;
}

export async function apiPost(path, data) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "API error");
  return json;
}

export async function apiDelete(path) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Delete failed");
  return json;
}
