const API_URL = "http://localhost:3000";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export async function getPosts(token: string): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized");
      } else if (res.status === 500) {
        throw new Error("server_error");
      } else {
        throw new Error(data.message || "Failed to fetch posts");
      }
    }

    return data;
  } catch (err) {
    if (err instanceof TypeError) throw new Error("server_error");
    throw err;
  }
}
