export interface User {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = "users";
const AUTH_USER_KEY = "auth_user";

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Development helper: pastikan ada user admin default (email: "admin", password: "admin").
// Tidak akan membuat default ketika aplikasi berjalan di mode produksi.
if (!import.meta.env?.PROD) {
  (function ensureDefaultAdmin() {
    try {
      const users = readUsers();
      if (!users.find((u) => u.email === "admin")) {
        users.push({ name: "Admin", email: "admin", password: "admin" });
        writeUsers(users);
      }
    } catch (e) {
      // ignore
    }
  })();
}

export function signup({ name, email, password }: User) {
  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("Email sudah terdaftar");
  }

  const user = { name, email, password };
  users.push(user);
  writeUsers(users);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  return user;
}

export function login(email: string, password: string) {
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Email atau password salah");
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  return user;
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(AUTH_USER_KEY);
}

// admin utilities
export function listUsers() {
  return readUsers();
}

export function deleteUser(email: string) {
  const users = readUsers().filter((u) => u.email !== email);
  writeUsers(users);
  // if deleting currently logged in user, sign out
  try {
    const current = getUser();
    if (current && current.email === email) logout();
  } catch {}
}
