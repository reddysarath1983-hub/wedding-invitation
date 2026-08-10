import { InvitationData, DashboardStats } from "@/types/invitation";

const API_BASE = typeof window !== "undefined" ? "/api" : (process.env.NEXT_PUBLIC_API_URL || "/api");


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
  const created: InvitationData = await res.json();
  if (typeof window !== "undefined" && created.slug) {
    try {
      localStorage.setItem(`pellipatrika_inv_${created.slug}`, JSON.stringify(created));
    } catch {}
  }
  return created;
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
  const updated: InvitationData = await res.json();
  if (typeof window !== "undefined" && updated.slug) {
    try {
      localStorage.setItem(`pellipatrika_inv_${updated.slug}`, JSON.stringify(updated));
    } catch {}
  }
  return updated;
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

export async function compressImage(file: File, maxDimension = 1200, quality = 0.82): Promise<File> {
  if (typeof window === "undefined" || !file.type.startsWith("image/") || file.size < 200 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => resolve(file);
    img.src = url;
  });
}

export async function uploadImage(file: File): Promise<string> {
  const compressed = await compressImage(file);
  const formData = new FormData();
  formData.append("file", compressed);

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
  return data.url;
}
