import axios from "axios";
import { API_DOMAIN, API_VERSION, HEADERS, REVALIDATE_PARAM } from "./settings";
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
  const url = API_DOMAIN + API_VERSION + method;

  const res = await fetch(url, {
    headers: HEADERS,
    next: { revalidate: REVALIDATE_PARAM },
  });

  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

export async function getResponse(method: string) {
  const url = API_DOMAIN + API_VERSION + method;
  try {
    const response = await axios.get(url, { headers: { ...HEADERS } });
    return response;
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
  const url = API_DOMAIN + API_VERSION + method;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...HEADERS,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json();
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
  const url = API_DOMAIN + API_VERSION + method;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      ...HEADERS,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log(data);
    console.log(res);
    console.log(res.statusText);
    const errorBody = await res.json();
    console.error("API error response:", errorBody);
    return false;
  }

  return res.json();
}

export async function patchResponse({ token, body, method }: IAPIPost) {
  const url = API_DOMAIN + API_VERSION + method;
  const headers = createHeaders(token);
  try {
    const response = await axios.patch(url, body, { headers });

    return response;
  } catch (error) {
    console.log(error);
    return raiseAxiosError(error);
  }
}

export async function deleteResponse({ token, method }: IAPI) {
  const url = API_DOMAIN + API_VERSION + method;
  const headers = createHeaders(token);
  try {
    const response = await axios.delete(url, { headers });
    return response;
  } catch (error) {
    return raiseAxiosError(error);
  }
}

export function raiseAxiosError(error: string | unknown) {
  if (axios.isAxiosError(error)) {
    console.log(error);
    return error.response;
  }
  console.error(error);
  throw error;
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
