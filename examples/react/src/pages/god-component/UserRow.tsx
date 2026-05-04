import type { User } from "./types";

type UserRowProps = {
  user: User;
  selected: boolean;
  onToggleSelected: (id: string) => void;
  onEdit: (user: User) => void;
  onDeactivate: (user: User) => void;
};

export default function UserRow({
  user,
  selected,
  onToggleSelected,
  onEdit,
  onDeactivate,
}: UserRowProps) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelected(user.id)}
        />
      </td>
      <td>
        <div className="user-cell">
          <div className="avatar">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span
          className="role-badge"
          style={{
            background:
              user.role === "admin"
                ? "#fde2e2"
                : user.role === "editor"
                  ? "#fff4d4"
                  : "#e2ecfd",
            color:
              user.role === "admin"
                ? "#a4262c"
                : user.role === "editor"
                  ? "#8a6d1a"
                  : "#1f4ea8",
          }}
        >
          {user.role}
        </span>
      </td>
      <td>
        {!user.active ? (
          <span className="pill pill-inactive">Inactive</span>
        ) : !user.lastLoginAt ? (
          <span className="pill pill-pending">Never logged in</span>
        ) : new Date(user.lastLoginAt).getTime() <
          Date.now() - 30 * 24 * 60 * 60 * 1000 ? (
          <span className="pill pill-stale">Stale</span>
        ) : (
          <span className="pill pill-active">Active</span>
        )}
      </td>
      <td>
        {user.lastLoginAt
          ? (() => {
              const ms = Date.now() - new Date(user.lastLoginAt).getTime();
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
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDeactivate(user)}>Deactivate</button>
      </td>
    </tr>
  );
}
