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
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
        
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
export async function deletePost(postId: string, token: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized");
      else if (res.status === 404) throw new Error("Post not found");
      else throw new Error("Failed to delete post");
    }
  } catch (err) {
    if (err instanceof TypeError) throw new Error("server_error");
    throw err;
  }
}

export async function createPost(
  title: string,
  text: string,
  token: string
): Promise<Post> {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, text })
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized");
      else if (res.status === 400) throw new Error(data.message || "Invalid data");
      else throw new Error("Failed to create post");
    }

    return data;
  } catch (err) {
    if (err instanceof TypeError) throw new Error("server_error");
    throw err;
  }
}