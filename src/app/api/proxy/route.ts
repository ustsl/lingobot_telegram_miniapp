import { NextResponse } from 'next/server';
import { API_DOMAIN, API_VERSION } from '@/api/settings';

type ProxyRequest = {
  method: string; // endpoint path, e.g. '/word_actions/get_user_list?page=1' or alias for external targets
  data?: any;
  verb?: string; // 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'
  token?: string; // optional per-user token
  formData?: boolean; // when true, forward data as multipart/form-data
};

const EXTERNAL_ENDPOINTS: Record<string, { url: string; headers: Record<string, string> }> = {
  imvoRules: {
    url: 'https://imvo.qspk.me/v1/queries/315854463',
    headers: {
      Authorization: process.env.RULES_QUERY_TOKEN || 'd0fbf7be-c968-4247-9909-501263e54f33',
    },
  },
};

function buildAuthHeader(token?: string) {
  const raw = token || process.env.API_SECRET_KEY || '';
  const auth = raw.startsWith('Token ') ? raw : `Token ${raw}`;
  return auth;
}

export async function POST(req: Request) {
  try {
    const body: ProxyRequest = await req.json();
    const { method, data, verb = 'POST', token, formData } = body;

    if (!method) {
      return NextResponse.json({ error: 'Missing method' }, { status: 400 });
    }

    const external = EXTERNAL_ENDPOINTS[method];
    const target = external ? external.url : `${API_DOMAIN}${API_VERSION}${method}`;

    const headers: Record<string, string> = {
      'X-Requested-With': 'XMLHttpRequest',
      ...(external ? external.headers : { Authorization: buildAuthHeader(token) }),
    };

    if (!formData) {
      headers['Content-Type'] = 'application/json';
    }

    let payload: BodyInit | undefined;
    if (verb !== 'GET' && verb !== 'HEAD') {
      if (formData) {
        const form = new FormData();
        Object.entries(data || {}).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((entry) => {
              if (entry !== undefined && entry !== null) {
                form.append(key, entry as any);
              }
            });
          } else if (value !== undefined && value !== null) {
            form.append(key, value as any);
          }
        });
        payload = form;
      } else {
        payload = JSON.stringify(data);
      }
    }

    const upstream = await fetch(target, {
      method: verb,
      headers,
      body: payload,
    });

    console.log(upstream)

    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await upstream.json();
      return NextResponse.json(json, { status: upstream.status });
    }



    const text = await upstream.text();
    return new Response(text, { status: upstream.status, headers: { 'Content-Type': contentType } });
  } catch (err: any) {
    console.error('Proxy error', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
