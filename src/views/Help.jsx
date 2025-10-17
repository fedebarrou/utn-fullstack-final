// src/pages/Help.jsx
import {
  InformationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Help() {
  return (
    <>
      <main className="help">
        <header className="help-header">
          <div className="help-title-wrap">
            <InformationCircleIcon className="help-title-icon" />
            <h1 className="help-title">Ayuda — WhatsCloneApp</h1>
          </div>
          <p className="help-subtitle">
            WhatsCloneApp: el mejor clon de WhatsApp (o eso intentamos 😉).
          </p>
        </header>

        <section className="help-section">
          <h2 className="help-h2">¿Qué es WhatsCloneApp?</h2>
          <p className="help-p">
            Es una app inspirada en WhatsApp para chatear con tus compañeros de
            clase o amigos. Mantiene conversaciones, estados básicos y una UI
            familiar para enfocarte en lo importante: <strong>charlar</strong>.
          </p>
        </section>

        <section className="help-section">
          <h2 className="help-h2">Qué mejoramos vs. el TP base</h2>
          <ul className="help-list">
            <li>
              Reubicamos los botones de <strong>cerrar sesión</strong> y{" "}
              <strong>tema claro/oscuro</strong> para una navegación más clara.
            </li>
            <li>
              Agregamos la acción <strong>“Nuevo chat”</strong> desde el sidebar.
            </li>
            <li>
              Adaptamos el comportamiento para <strong>pantallas móviles</strong>{" "}
              (apertura/cierre del panel de chat según el ancho).
            </li>
          </ul>
        </section>

        <section className="help-section">
          <h2 className="help-h2">Próximas funciones</h2>
          <ul className="help-list help-list--chips">
            <li>
              <span className="help-chip">
                <SparklesIcon className="help-chip-icon" />
                Emojis
              </span>
            </li>
            <li>
              <span className="help-chip">
                <SparklesIcon className="help-chip-icon" />
                Grabación de voz
              </span>
            </li>
          </ul>
          <p className="help-p">
            Las iremos integrando manteniendo la estética y la performance.
          </p>
        </section>

        <section className="help-section">
          <h2 className="help-h2">Cómo usarla</h2>
          <ol className="help-steps">
            <li>Abrí la app y, si hace falta, iniciá sesión.</li>
            <li>
              Usá el buscador para encontrar un contacto o creá un chat nuevo.
            </li>
            <li>Escribí tu mensaje y envialo. Listo.</li>
          </ol>
        </section>

        <footer className="help-footer">
          <p className="help-footnote">
            Hecho con cariño para el TP — <strong>WhatsCloneApp</strong>. Mejor
            que el original*.
          </p>
          <p className="help-footnote help-footnote-small">
            *Al menos en intención 😅
          </p>
        </footer>
      </main>

      {/* Estilos embebidos */}
      <style>{`
        /* ====== Help page ====== */
        .help {
          max-width: 860px;
          margin: 0 auto;
          padding: 32px 20px 60px;
          line-height: 1.6;
          color: #0f172a;             /* slate-900 */
          background: transparent;
        }
        .help-header { margin-bottom: 28px; }
        .help-title-wrap { display: flex; align-items: center; gap: 10px; }
        .help-title-icon { width: 28px; height: 28px; flex: 0 0 auto; color: #0ea5e9; } /* sky-500 */
        .help-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.01em; margin: 0; }
        .help-subtitle { margin: 6px 0 0 38px; color: #475569; font-size: 0.98rem; } /* slate-600 */

        .help-section {
          border: 1px solid #e2e8f0;  /* slate-200 */
          border-radius: 14px;
          padding: 18px 16px;
          margin-bottom: 18px;
          background: #ffffff;
        }
        .help-h2 { font-size: 1.1rem; font-weight: 700; margin: 0 0 8px; color: #0f172a; }
        .help-p { margin: 0; color: #334155; } /* slate-700 */

        .help-list { margin: 8px 0 0; padding-left: 1.1rem; color: #334155; }
        .help-list li { margin: 6px 0; }

        /* Chips de próximas funciones */
        .help-list--chips {
          list-style: none;
          padding-left: 0;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .help-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 9999px;
          background: #f1f5f9;        /* slate-100 */
          color: #0f172a;
          font-weight: 600;
          font-size: 0.92rem;
          border: 1px solid #e2e8f0;  /* slate-200 */
        }
        .help-chip-icon { width: 18px; height: 18px; }

        /* Pasos */
        .help-steps { margin: 8px 0 0; padding-left: 1.2rem; color: #334155; }
        .help-steps li { margin: 6px 0; }

        /* Footer */
        .help-footer { margin-top: 24px; text-align: center; }
        .help-footnote { margin: 0; color: #475569; }
        .help-footnote-small { font-size: 0.9rem; color: #64748b; }

        /* ====== Dark mode (si tu app aplica .dark en <html> o <body>) ====== */
        .dark .help { color: #e2e8f0; }
        .dark .help-subtitle,
        .dark .help-p,
        .dark .help-list,
        .dark .help-steps,
        .dark .help-footnote,
        .dark .help-footnote-small { color: #cbd5e1; }
        .dark .help-section { background: #0b1220; border-color: #1e293b; }
        .dark .help-title-icon { color: #38bdf8; } /* sky-400 */
        .dark .help-chip { background: #0b1220; border-color: #1e293b; color: #e2e8f0; }
      `}</style>
    </>
  );
}
