import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  } catch {
    return dateString;
  }
}

export function getCanonicalShareUrl(slug: string): string {
  if (typeof window === "undefined") {
    return `/invite/${slug}`;
  }

  let origin = window.location.origin;

  // Automatically clean long Vercel git preview deployment URLs into short production domain
  // e.g. https://wedding-invitation-ac2b-git-main-saraths-projects-0e8d1c60.vercel.app -> https://wedding-invitation-ac2b.vercel.app
  if (origin.includes("-git-") && origin.includes(".vercel.app")) {
    origin = origin.replace(/-git-[^.]+\.vercel\.app$/, ".vercel.app");
  }

  return `${origin}/invite/${slug}`;
}
