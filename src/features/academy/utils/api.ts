const API_ROOT = 'https://infinityhealthapi.onrender.com';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_ROOT}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  console.log(token, res.status, res.statusText, res.url);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error ${res.status}: ${errText}`);
  }
  return res.json();
}

export interface ZoomSessionData {
  course_instructor: string;
  course_title: string;
  meeting_number: string;
  meeting_password: string;
  meeting_user: string;
}

export function getZoomSession(courseId: number): Promise<{ status: string; data: ZoomSessionData }> {
  return request(`/zoom/course/${courseId}/`);
}
