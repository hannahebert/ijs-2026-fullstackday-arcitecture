import { useEffect, useState } from "react";
import "./god-component/god-component.css";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  active: boolean;
  lastLoginAt: string | null;
};

type RoleFilter = "all" | "admin" | "editor" | "viewer";

export default function GodComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [editing, setEditing] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState<User["role"]>("viewer");

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load users");
        return r.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [setLoading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  function toggleSelected(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((u) => u.id)));
    }
  }

  function openEdit(user: User) {
    setEditing(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
  }

  function closeEdit() {
    setEditing(null);
  }

  function saveEdit() {
    closeEdit();
  }

  return (
    <article className="god-component">
      <h1>Users</h1>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
        >
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        {selected.size > 0 && (
          <div className="bulk-actions">
            <span>{selected.size} selected</span>
            <button
              onClick={() =>
                alert("Pretend we deactivated " + selected.size + " users")
              }
            >
              Deactivate selected
            </button>
          </div>
        )}
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selected.size === filtered.length && filtered.length > 0
                }
                onChange={toggleAll}
              />
            </th>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last login</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.has(u.id)}
                  onChange={() => toggleSelected(u.id)}
                />
              </td>
              <td>
                <div className="user-cell">
                  <div className="avatar">
                    {u.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className="user-name">{u.name}</div>
                    <div className="user-email">{u.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <span
                  className="role-badge"
                  style={{
                    background:
                      u.role === "admin"
                        ? "#fde2e2"
                        : u.role === "editor"
                          ? "#fff4d4"
                          : "#e2ecfd",
                    color:
                      u.role === "admin"
                        ? "#a4262c"
                        : u.role === "editor"
                          ? "#8a6d1a"
                          : "#1f4ea8",
                  }}
                >
                  {u.role}
                </span>
              </td>
              <td>
                {!u.active ? (
                  <span className="pill pill-inactive">Inactive</span>
                ) : !u.lastLoginAt ? (
                  <span className="pill pill-pending">Never logged in</span>
                ) : new Date(u.lastLoginAt).getTime() <
                  Date.now() - 30 * 24 * 60 * 60 * 1000 ? (
                  <span className="pill pill-stale">Stale</span>
                ) : (
                  <span className="pill pill-active">Active</span>
                )}
              </td>
              <td>
                {u.lastLoginAt
                  ? (() => {
                      const ms =
                        Date.now() - new Date(u.lastLoginAt).getTime();
                      const min = Math.floor(ms / 60000);
                      if (min < 1) return "just now";
                      if (min < 60) return min + "m ago";
                      const hr = Math.floor(min / 60);
                      if (hr < 24) return hr + "h ago";
                      const d = Math.floor(hr / 24);
                      if (d < 30) return d + "d ago";
                      const mo = Math.floor(d / 30);
                      return mo + "mo ago";
                    })()
                  : "—"}
              </td>
              <td className="row-actions">
                <button onClick={() => openEdit(u)}>Edit</button>
                <button
                  onClick={() => alert("Pretend we deactivated " + u.name)}
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="empty">No users match your filters.</p>
      )}

      {editing && (
        <div className="drawer-backdrop" onClick={closeEdit}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <h2>Edit user</h2>
            <label>
              Name
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </label>
            <label>
              Role
              <select
                value={editRole}
                onChange={(e) =>
                  setEditRole(e.target.value as User["role"])
                }
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>
            <div className="drawer-actions">
              <button onClick={closeEdit}>Cancel</button>
              <button onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
