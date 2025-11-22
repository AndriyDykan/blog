const API_URL = "http://localhost:3000";

interface AuthResponse {
  access_token?: string;
  message?: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
  
    if (!res.ok) {

      if (res.status === 401) {
        throw new Error("wrong password or email");
      } else if (res.status === 500) {
        throw new Error("server_error");
      } else {
        throw new Error(data.message || "Login failed");
      }
    }

    return data;
  } catch (err) {

    if (err instanceof TypeError) {
      throw new Error("server_error");
    }
    throw err;
  }
}

export async function register(username: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 400) {
        throw new Error(data.message || "Invalid data");
      } else if (res.status === 500) {
        throw new Error("server_error");
      } else {
        throw new Error(data.message || "Register failed");
      }
    }

    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("server_error");
    }
    throw err;
  }
}
