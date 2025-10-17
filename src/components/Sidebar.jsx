import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useChat } from "../context/ChatContext"
import { ChatBubbleLeftRightIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import NewChat from "./NewChat"
import PopupSidebar from "./PopupSidebar"

const DEFAULT_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s";

const ONLINE_WINDOW = 60_000; // 1 minuto

function isOnlineNow(user, now) {
  const ts = Number(user?.lastSeenMs || 0);
  return user?.status === "online" && now - ts < ONLINE_WINDOW;
}

/* === Utils de tiempo === */
function formatLastSeen(tsMs) {
  if (!tsMs) return ""
  const diff = tsMs - Date.now() // negativo si es pasado
  const abs = Math.abs(diff)
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "always" })

  if (abs < 60_000) return rtf.format(Math.round(diff / 1000), "second")
  if (abs < 3_600_000) return rtf.format(Math.round(diff / 60_000), "minute")
  if (abs < 86_400_000) return rtf.format(Math.round(diff / 3_600_000), "hour")
  if (abs < 30 * 86_400_000) return rtf.format(Math.round(diff / 86_400_000), "day")

  return new Date(tsMs).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })
}

/* === Preview unificado para el sidebar === */
function getPreviewText(user) {
  const msgs = Array.isArray(user.messages) ? user.messages : [];
  const last = msgs.at(-1);

  // Prioriza el texto real del último mensaje; cae a lastMessage si existe.
  const raw = (last?.text || user.lastMessage || "").toString();
  const clean = raw.replace(/\s+/g, " ").trim(); // saca saltos y espacios extra

  if (clean) {
    return clean.length > 70 ? clean.slice(0, 70) + "…" : clean;
  }
  return `Comenzá a chatear con ${user.name}`;
}

/* === Responsivo: mostrar el chat en pantallas chicas cuando hay selección === */
function ensureShowChat() {
  if (window.matchMedia("(max-width: 1024px)").matches) {
    document.querySelector(".app")?.classList.add("show-chat")
  }
}

export default function Sidebar() {
  const { users, setUsers, setSelectedUser, selectedUserId, setSelectedUserId } = useChat()
  const [usersToRender, setUsersToRender] = useState(users)
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate()

  useEffect(() => { setUsersToRender(users) }, [users])

  // Tick cada 15s para refrescar "hace X min"
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(id);
  }, []);

  // Mantener .app.show-chat actualizado cuando cambia el ancho o la selección
  useEffect(() => {
    const app = document.querySelector(".app")
    if (!app) return
    const mq = window.matchMedia("(max-width: 1024px)")
    const apply = () => {
      if (mq.matches && selectedUserId != null) app.classList.add("show-chat")
      else app.classList.remove("show-chat")
    }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [selectedUserId])

  const handleChange = (e) => {
    const q = e.target.value.toLowerCase()
    setUsersToRender(users.filter((u) => u.name.toLowerCase().includes(q)))
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    navigate("/")
  }

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">WhatsCloneApp</h2>
        <div className="sidebar-actions">
          <button
            type="button"
            className="sidebar-btn"
            aria-label="Nuevo mensaje"
            onClick={() => setNewChatOpen(true)}
          >
            <ChatBubbleLeftRightIcon className="sidebar-icon" />
          </button>
          <button
            type="button"
            className="sidebar-btn"
            aria-label="Menú"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <EllipsisVerticalIcon className="sidebar-icon" />
          </button>
        </div>

        <PopupSidebar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onLogout={handleLogout}
        />
      </div>

      {/* Search */}
      <div className="search-wrap">
        <MagnifyingGlassIcon className="search-icon" />
        <input
          type="text"
          placeholder="Buscar un chat o iniciar uno nuevo"
          className="search-input"
          onChange={handleChange}
          aria-label="Buscar chats"
        />
      </div>

      {usersToRender.length === 0 && (
        <p className="search-result">No search found...</p>
      )}

      {/* Lista de chats */}
      <ul className="user-list">
        {usersToRender.map((user) => {
          const online = isOnlineNow(user, now);
          const lastSeenText = online ? "online" : formatLastSeen(user.lastSeenMs);
          const previewText = getPreviewText(user, online);
          const msgs = Array.isArray(user.messages) ? user.messages : [];
          const hasMsgs = msgs.length > 0;

          return (
            <li
              key={user.id}
              onClick={() => { setSelectedUser(user.id); setSelectedUserId(user.id); ensureShowChat(); }}
              className={`user ${selectedUserId === user.id ? "is-active" : ""}`}
            >
              <img
                className="avatar"
                src={user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"}
                alt={user.name}
              />

              <div className="user-info">
                <div className="user-top">
                  <strong className="user-name">{user.name}</strong>
                  <time className={`user-time ${online ? "is-online" : ""}`}>
                    {lastSeenText}
                  </time>
                </div>

                <div className="user-bottom">
                  <span className={`user-preview ${hasMsgs ? "" : "is-empty"}`}>
                    {previewText}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Panel Nuevo Chat */}
      <NewChat
        open={newChatOpen}
        onClose={() => setNewChatOpen(false)}
        onPick={(c) => {
          const existing =
            users.find(u => u.contactId === c.id) ||
            users.find(u => u.name === c.name)

          const nextId =
            users.length > 0
              ? Math.max(...users.map(x => Number(x.id) || 0)) + 1
              : 1
          const selectedId = existing ? existing.id : nextId

          setUsers(prev => {
            const found =
              prev.find(u => u.contactId === c.id) ||
              prev.find(u => u.name === c.name)

            if (!found) {
              return [
                ...prev,
                {
                  id: selectedId,
                  contactId: c.id,
                  name: c.name,
                  avatar: c.avatar || DEFAULT_AVATAR,
                  status: "online",
                  lastSeenMs: Date.now(),
                  messages: [],
                  lastMessage: "",
                  lastTime: ""
                }
              ]
            }

            return prev.map(u =>
              u.id === found.id
                ? {
                  ...u,
                  contactId: u.contactId ?? c.id,
                  avatar: u.avatar || DEFAULT_AVATAR,
                  status: "online"
                }
                : u
            )
          })

          setSelectedUser(selectedId)
          setSelectedUserId?.(selectedId)
          setNewChatOpen(false)
        }}
      />
    </div>
  )
}
