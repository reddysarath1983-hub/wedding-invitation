import { InvitationData, DashboardStats } from "@/types/invitation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

function getAuthHeader(): Record<string, string> {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("pellipatrika_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(err.detail || "Invalid email or password");
  }

  const data = await res.json();
  if (typeof window !== "undefined") {
    localStorage.setItem("pellipatrika_token", data.access_token);
  }
  return data.access_token;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("pellipatrika_token");
    window.location.href = "/login";
  }
}

export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("pellipatrika_token");
  }
  return false;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/invitations/stats`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return res.json();
}

export async function fetchInvitations(): Promise<InvitationData[]> {
  const res = await fetch(`${API_BASE}/invitations`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch invitations");
  return res.json();
}

export async function fetchInvitationById(id: string): Promise<InvitationData> {
  const res = await fetch(`${API_BASE}/invitations/${id}`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch invitation details");
  return res.json();
}

export async function fetchPublicInvitation(slug: string): Promise<InvitationData> {
  const res = await fetch(`${API_BASE}/invitations/public/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Invitation not found or not published");
  return res.json();
}

export async function createInvitation(data: Partial<InvitationData>): Promise<InvitationData> {
  const res = await fetch(`${API_BASE}/invitations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to create invitation" }));
    throw new Error(err.detail || "Failed to create invitation");
  }
  return res.json();
}

export async function updateInvitation(id: string, data: Partial<InvitationData>): Promise<InvitationData> {
  const res = await fetch(`${API_BASE}/invitations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to update invitation" }));
    throw new Error(err.detail || "Failed to update invitation");
  }
  return res.json();
}

export async function duplicateInvitation(id: string): Promise<InvitationData> {
  const res = await fetch(`${API_BASE}/invitations/${id}/duplicate`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to duplicate invitation");
  return res.json();
}

export async function publishInvitation(id: string): Promise<InvitationData> {
  const res = await fetch(`${API_BASE}/invitations/${id}/publish`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to publish invitation");
  return res.json();
}

export async function unpublishInvitation(id: string): Promise<InvitationData> {
  const res = await fetch(`${API_BASE}/invitations/${id}/unpublish`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to unpublish invitation");
  return res.json();
}

export async function deleteInvitation(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/invitations/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to delete invitation");
  return true;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/uploads`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(err.detail || "Upload failed");
  }

  const data = await res.json();
  let url = data.url;
  if (url.startsWith("/uploads/")) {
    const serverOrigin = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "")
      : "http://127.0.0.1:8000";
    url = `${serverOrigin}${url}`;
  }
  return url;
}
