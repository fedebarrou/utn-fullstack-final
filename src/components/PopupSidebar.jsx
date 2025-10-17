import { useEffect, useRef } from "react";
import { SunIcon, MoonIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

export default function PopupSidebar({ open, onClose, onLogout }) {
  const menuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // cerrar con click afuera o ESC
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) onClose?.();
    };
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isDark = theme === "dark";

  return (
    <div ref={menuRef} className="popup-sidebar" role="menu" aria-label="Opciones">
      {/* Toggle tema */}
      <button
        className="popup-item"
        role="menuitem"
        aria-pressed={isDark}
        onClick={() => {
          toggleTheme();
          // no cerramos el popup para que se vea el cambio
        }}
      >
        <div className="popup-left">
          {isDark ? <MoonIcon className="popup-icon" /> : <SunIcon className="popup-icon" />}
          <span>Tema {isDark ? "oscuro" : "claro"}</span>
        </div>

        {/* switch visual */}
        <span className="toggle" aria-hidden>
          <span className="toggle-track" />
          <span className={`toggle-thumb ${isDark ? "on" : ""}`} />
        </span>
      </button>

      <hr className="popup-sep" />

      {/* Cerrar sesión */}
      <button
        className="popup-item"
        role="menuitem"
        onClick={() => {
          onLogout?.();
          onClose?.();
        }}
      >
        <div className="popup-left">
          <ArrowRightOnRectangleIcon className="popup-icon" />
          <span>Cerrar sesión</span>
        </div>
      </button>
    </div>
  );
}
