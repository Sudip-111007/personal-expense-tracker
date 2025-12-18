const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function analyzeExpenses(expenses) {
  const res = await fetch(`${API_BASE_URL}/analysis/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("user") ? `Bearer ${JSON.parse(localStorage.getItem("user")).token}` : "",
    },
    body: JSON.stringify({ expenses }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Analysis failed");
  }

  return await res.json();
}
