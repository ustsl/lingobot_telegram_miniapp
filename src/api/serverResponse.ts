"use server";

// Server-side helper to fetch word analytics directly from upstream API.
// This file runs on the server only and reads the secret key from process.env.
import { API_URL } from "./settings";

export type WordAnalytics = {
  total: number;
  finished: number;
  learning: number;
  passive: number;
};

function buildServerHeaders(token?: string) {
  const raw = token || process.env.API_SECRET_KEY || "";
  const auth = raw.startsWith("Token ") ? raw : `Token ${raw}`;
  return {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: auth,
  };
}

export async function getWordAnalytics(
  telegramId: string,
  pair: string
): Promise<WordAnalytics> {
  if (!telegramId) throw new Error("telegramId is required");

  const url = `${API_URL}/user_analytics/words?telegram_id=${encodeURIComponent(telegramId)}&pair=${encodeURIComponent(pair)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: buildServerHeaders(),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
