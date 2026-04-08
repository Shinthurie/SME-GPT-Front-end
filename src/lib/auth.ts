export type SessionUser = {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
};

export async function loginUser(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  return {
    ok: res.ok,
    data,
  };
}

export async function signupUser(data: {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
}) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.ok;
}

export async function getSession(): Promise<SessionUser | null> {
  const res = await fetch("/api/auth/me", {
    method: "GET",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}

export async function logoutUser() {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
}