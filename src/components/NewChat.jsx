import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CONTACTS from "../data/contact";

export default function NewChat({
  open = false,
  onClose,
  onPick,
  contacts = CONTACTS,
}) {
  const [q, setQ] = useState("");
  const panelRef = useRef(null);

  // Limpia el buscador y lleva el scroll arriba cada vez que se abre
  useEffect(() => {
    if (open) {
      setQ("");
      panelRef.current?.scrollTo?.({ top: 0 });
    }
  }, [open]);

  // Cerrar con ESC y seleccionar primero con ENTER
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Enter") {
        const first = flatList[0];
        if (first) {
          onPick?.(first);
          onClose?.();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, q]);

  /* ================= Utils ================= */
  const norm = (s = "") =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Obtiene la primera letra válida (A-Z). Si no hay, "#"
  const firstLetter = (name = "") => {
    const n = norm(String(name).trim());
    if (!n) return "#";
    const ch = n[0];
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122) return ch.toUpperCase(); // a-z
    return "#";
  };

  function getInitial(name = "") {
    const n = String(name).trim();
    return n ? n[0].toUpperCase() : "?";
  }

  /* =========== Filtro + orden plano (para ENTER) =========== */
  const flatList = useMemo(() => {
    const t = norm(q);
    const base = t ? contacts.filter((c) => norm(c.name).includes(t)) : contacts;
    return [...base].sort((a, b) =>
      a.name.localeCompare(b.name, "es", { sensitivity: "base" })
    );
  }, [contacts, q]);

  /* =========== Agrupado por letra (secciones) =========== */
  const sections = useMemo(() => {
    const map = new Map(); // letra -> items[]
    for (const c of flatList) {
      const L = firstLetter(c.name);
      if (!map.has(L)) map.set(L, []);
      map.get(L).push(c);
    }
    const letters = [...map.keys()].sort((a, b) => {
      if (a === "#") return 1;     // "#" al final
      if (b === "#") return -1;
      return a.localeCompare(b, "es");
    });
    return letters.map((letter) => ({ letter, items: map.get(letter) }));
  }, [flatList]);

  if (!open) return null;

  return (
    <div className="newchat" role="dialog" aria-modal="true" ref={panelRef}>
      {/* Header */}
      <div className="newchat-header">
        <button
          type="button"
          className="newchat-back"
          aria-label="Volver"
          onClick={onClose}
        >
          <ArrowLeftIcon className="newchat-back-icon" />
        </button>
        <h3 className="newchat-title">Nuevo chat</h3>
      </div>

      {/* Buscador */}
      <div className="newchat-search">
        <MagnifyingGlassIcon className="newchat-search-icon" />
        <input
          className="newchat-search-input"
          placeholder="Buscar un nombre o número"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar contactos"
        />
      </div>

      {/* Lista agrupada */}
      <div className="newchat-list">
        <div className="newchat-subtitle">Contactos</div>

        {sections.map(({ letter, items }) => (
          <section className="newchat-section" key={letter}>
            {/* Hacé este header sticky en tu CSS si querés, ej.: position: sticky; top: 0; */}
            <div className="newchat-letter" role="separator" aria-label={`Letra ${letter}`}>
              {letter}
            </div>

            <ul className="newchat-group">
              {items.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className="newchat-item"
                    onClick={() => {
                      onPick?.(c);
                      onClose?.();
                    }}
                  >
                    {c.avatar ? (
                      <img className="newchat-avatar" src={c.avatar} alt={c.name} />
                    ) : (
                      <div
                        className="newchat-avatar newchat-avatar--placeholder"
                        aria-hidden
                      >
                        {getInitial(c.name)}
                      </div>
                    )}

                    <div className="newchat-item-body">
                      <div className="newchat-name">{c.name}</div>
                      <div className="newchat-meta">
                        {c.state || "¡Hola! Estoy usando WhatsCloneApp."}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
