import { REVALIDATE_PARAM } from "./settings";
import { notFound } from "next/navigation";

export interface IAPI {
  token: string;
  method: string;
}

export interface IAPIPost extends IAPI {
  body: {};
  type?: "file";
  clean?: boolean;
}

export async function getBaseQuery(method: string) {
  // Proxy GET via internal server route so the secret key is not exposed client-side.
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, verb: "GET" }),
    next: { revalidate: REVALIDATE_PARAM },
  });

  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

export async function getResponse(method: string) {
  // Use internal proxy route and return an axios-like shape: { data, status }
  try {
    const res = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, verb: "GET" }),
    });
    const data = await res.json().catch(() => null);
    return { data, status: res.status } as any;
  } catch (error) {
    return raiseAxiosError(error);
  }
}

export async function postResponse({
  method,
  data,
}: {
  method: string;
  data: any;
}) {
  // Proxy POST through server route
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, data, verb: "POST" }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    console.error("API error response:", errorBody);
    return false;
  }

  return res.json();
}

export async function putResponse({
  method,
  data,
}: {
  method: string;
  data: any;
}) {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, data, verb: "PUT" }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    console.error("API error response:", errorBody);
    return false;
  }

  return res.json();
}

export async function patchResponse({ token, body, method }: IAPIPost) {
  // For endpoints that require a per-user token we still forward token
  // to the server proxy which will include it in the upstream request.
  try {
    const res = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, data: body, verb: "PATCH", token }),
    });
    const data = await res.json().catch(() => null);
    return { data, status: res.status } as any;
  } catch (error) {
    console.log(error);
    return raiseAxiosError(error);
  }
}

export async function deleteResponse({ token, method }: IAPI) {
  try {
    const res = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, verb: "DELETE", token }),
    });
    const data = await res.json().catch(() => null);
    return { data, status: res.status } as any;
  } catch (error) {
    return raiseAxiosError(error);
  }
}

export function raiseAxiosError(error: string | unknown) {
  // Keep a compatible interface for existing callers.
  console.error(error);
  return null;
}

export function createHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Token ${token}`,
  };
}

export function createLiteHeaders(token: string) {
  return {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Token ${token}`,
  };
}
