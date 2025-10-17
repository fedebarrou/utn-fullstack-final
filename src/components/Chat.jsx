import { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  FaceSmileIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import ProfileUser from "./ProfileUser";
import { useTheme } from "../context/ThemeContext"; // tema

const DEFAULT_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [showBack, setShowBack] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1024px)").matches;
  });

  const { theme } = useTheme();
  const { users, selectedUser, setUsers } = useChat();
  const user = users.find((u) => u.id === selectedUser);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => setShowBack(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);

  if (!user) {
    return (
      <div className="user-not-found">
        <p>No hay usuario seleccionado...</p>
      </div>
    );
  }

  const handleChange = (e) => setMsg(e.target.value);

  // ✅ Validación: no enviar si está vacío o con solo espacios
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = msg.trim();
    if (!text || !selectedUser) return;

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const time = `${hh}:${mm}`;

    setUsers(prev =>
      prev.map(u => {
        if (u.id !== selectedUser) return u;
        const nextMessages = [...(u.messages || [])];
        const nextId = (nextMessages.at(-1)?.id || 0) + 1;
        nextMessages.push({ id: nextId, from: "me", text, time }); // 👈 acá
        return {
          ...u,
          messages: nextMessages,
          lastMessageAtMs: Date.now(),
          lastMessage: text,
        };
      })
    );

    setMsg("");
  };

  // Fondo estilo WhatsApp (azulado) desde React
  const bgLightUrl = "/chat-bg-blue.png";
  const bgDarkUrl = "/chat-bg-blue-dark.png"; // opcional
  const isDark = theme === "dark";
  const bgUrl = isDark ? bgDarkUrl : bgLightUrl;
  const bgOpacity = isDark ? 0.12 : 0.18;
  const bgSizePx = 480;
  const bgFilter = isDark ? "brightness(0.75) contrast(1.05)" : "none";

  const comingSoon = () => alert("Próximamente");

  return (
    <div className="chat">
      <header className="chat-header">
        <div
          className="chat-user chat-user--clickable"
          role="button"
          tabIndex={0}
          onClick={() => setProfileOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setProfileOpen(true)}
          title="Ver información de contacto"
        >
          {showBack && (
            <button
              className="sidebar-btn"
              aria-label="Volver"
              onClick={(e) => {
                e.stopPropagation();
                document.querySelector(".app")?.classList.remove("show-chat");
              }}
            >
              <ArrowLeftIcon className="sidebar-icon" />
            </button>
          )}

          <img src={user.avatar || DEFAULT_AVATAR} alt={user.name} className="chat-avatar" />
          <strong className="chat-user-name">{user.name}</strong>
        </div>

        <div className="chat-actions">
          <a
            href="/help"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-btn"
            aria-label="Ayuda"
            onClick={(e) => e.stopPropagation()}
            title="Ayuda"
          >
            <QuestionMarkCircleIcon className="sidebar-icon" />
          </a>
        </div>
      </header>

      <section className="chat-messages" style={{ position: "relative" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgUrl})`,
            backgroundRepeat: "repeat",
            backgroundSize: `${bgSizePx}px`,
            opacity: bgOpacity,
            filter: bgFilter,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, display: "contents" }}>
          {user.messages.map((m) => {
            const from = m.from === "me" ? "me" : "them"; // fallback a "them" si no viene
            return (
              <div
                key={m.id}
                className={`message ${from === "me" ? "is-me" : "is-them"}`}
                data-from={from}
              >
                <p>{m.text}</p>
                <span className="time">{m.time}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Composer: emoji | input | mic ===== */}
      <footer className="chat-footer">
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            className="composer-btn"
            aria-label="Emojis"
            title="Emojis (próximamente)"
            onClick={comingSoon}
          >
            <FaceSmileIcon className="composer-icon" />
          </button>

          <input
            type="text"
            placeholder="Escribe un mensaje..."
            onChange={handleChange}
            value={msg}
          />

          <button
            type="button"
            className="composer-btn"
            aria-label="Grabar audio"
            title="Grabar audio (próximamente)"
            onClick={comingSoon}
          >
            <MicrophoneIcon className="composer-icon" />
          </button>
        </form>
      </footer>

      {profileOpen && <ProfileUser open user={user} onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
