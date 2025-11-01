"use server";

import { HEADERS } from "./settings";

export type WordAnalytics = {
  total: number;
  finished: number;
  learning: number;
  passive: number;
};

export async function getWordAnalytics(
  telegramId: string
): Promise<WordAnalytics> {
  if (!telegramId) throw new Error("telegramId is required");

  const url = `https://api.lingobot.ru/v1/user_analytics/words?telegram_id=${encodeURIComponent(
    telegramId
  )}`;

  const res = await fetch(url, {
    method: "GET",
    headers: HEADERS,
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
