import { useEffect, useMemo } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useChat } from "../context/ChatContext";

/* Util: "hace X" o fecha/hora corta */
function formatLastSeen(tsMs) {
  if (!tsMs) return "";
  const diff = tsMs - Date.now();
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "always" });

  if (abs < 60_000) return rtf.format(Math.round(diff / 1000), "second");
  if (abs < 3_600_000) return rtf.format(Math.round(diff / 60_000), "minute");
  if (abs < 86_400_000) return rtf.format(Math.round(diff / 3_600_000), "hour");
  if (abs < 30 * 86_400_000) return rtf.format(Math.round(diff / 86_400_000), "day");
  return new Date(tsMs).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });
}

export default function ProfileUser({ open = false, onClose, user }) {
  const { users, selectedUserId } = useChat();

  const u = useMemo(
    () => user ?? users.find((x) => x.id === selectedUserId),
    [user, users, selectedUserId]
  );

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !u) return null;

  const isOnline = u.status === "online" || u.online === true;
  const lastSeenText = isOnline ? "online" : (u.lastSeenMs ? `Últ. vez ${formatLastSeen(u.lastSeenMs)}` : "");

  return (
    <div className="profileuser-root" role="dialog" aria-modal="true" aria-labelledby="profileuser-title">
      <button className="profileuser-overlay" aria-label="Cerrar" onClick={onClose} />
      <aside className="profileuser" data-open="true">
        <header className="profileuser-header">
          <h4 id="profileuser-title" className="profileuser-title">Info. del contacto</h4>
          <button
            type="button"
            className="profileuser-close"
            aria-label="Cerrar panel"
            onClick={onClose}
          >
            <XMarkIcon className="profileuser-close-icon" />
          </button>
        </header>

        <section className="profileuser-body">
          <img
            className="profileuser-avatar"
            src={
              u.avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
            }
            alt={u.name}
          />
          <div className="profileuser-name">{u.name}</div>
          <div className={`profileuser-last ${isOnline ? "is-online" : ""}`}>
            {lastSeenText}
          </div>
        </section>
      </aside>
    </div>
  );
}
