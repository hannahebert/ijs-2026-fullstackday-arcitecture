import { useEffect, useState } from "react";
import type { User } from "./god-component/types";
import { useFilteredList } from "./god-component/useFilteredList";
import UserRow from "./god-component/UserRow";
import "./god-component/god-component.css";

export default function GodComponentRefactored() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { filters, setFilter, filtered } = useFilteredList(users);

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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
        />
        <select
          value={filters.role}
          onChange={(e) =>
            setFilter("role", e.target.value as typeof filters.role)
          }
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
            <UserRow
              key={u.id}
              user={u}
              selected={selected.has(u.id)}
              onToggleSelected={toggleSelected}
              onEdit={openEdit}
              onDeactivate={(user) =>
                alert("Pretend we deactivated " + user.name)
              }
            />
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
