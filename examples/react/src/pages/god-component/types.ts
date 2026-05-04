export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  active: boolean;
  lastLoginAt: string | null;
};

export type RoleFilter = "all" | "admin" | "editor" | "viewer";
