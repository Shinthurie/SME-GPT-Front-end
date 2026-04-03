export type DummyUser = {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
};

export type SessionUser = {
  email: string;
  fullName: string;
  companyName: string;
  isLoggedIn: boolean;
};

const USER_KEY = "sme_gpt_user";
const SESSION_KEY = "sme_gpt_session";

export function saveUser(user: DummyUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): DummyUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as DummyUser;
  } catch {
    return null;
  }
}

export function loginUser(email: string, password: string): boolean {
  const user = getUser();
  if (!user) return false;

  if (user.email === email && user.password === password) {
    const session: SessionUser = {
      email: user.email,
      fullName: user.fullName,
      companyName: user.companyName,
      isLoggedIn: true,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }

  return false;
}

export function getSession(): SessionUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function clearAllDummyAuth() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(SESSION_KEY);
}