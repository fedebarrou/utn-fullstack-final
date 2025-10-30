# **Clon de WhatsApp — React**

_Proyecto educativo que replica un flujo básico de WhatsApp: login, lista de chats, inicio de chat, vista de perfil y popup de opciones._

**Stack:** React • React Router • Context API • CSS • localStorage • MatchMedia  
**Deploy:** Vercel
**Contraseña:** pepe123
---

## ✨ Resumen

- Inició en **HTML + JavaScript** y luego se **migró a React**.  
- Se usan **useState**, **useEffect**, **React Router** y **Context** (tema y chat).  
- **Lista de contactos** mantenida en un `.js` local para pruebas del curso.  
- **Responsive** con `matchMedia` y ajustes para pantallas pequeñas.  
- **Optimización de UI**: distribución de botones y estilos visuales.  
- **Enlace a Vercel** para deploy continuo.  
- Botón “**Remover localStorage (users)**” para limpiar datos de prueba.

---

## 📁 Estructura mínima (orientativa)

```
src/
  assets/
    images/logo.png
  components/
    NewChat.jsx
    PopupSidebar.jsx
    ProfileUser.jsx
    Sidebar.jsx
    Chat.jsx
  context/
    ChatContext.jsx      // estado global de chats/usuarios/selección
    ThemeContext.jsx     // tema claro/oscuro (si aplica)
  data/
    contacts.js          // fuente local de contactos del curso
  pages/
    Login.jsx
    Help.jsx             // página informativa/faq (opcional)
  router/
    AppRouter.jsx        // rutas /login y /chat
  styles/
    app.css              // estilos globales
main.jsx
index.html
```

> Los nombres pueden variar; lo importante es la separación por responsabilidades.

---

## 🧠 Hooks y conceptos usados (explicado simple)

- **useState**: estado local del componente.  
  _Ej.: guardar el texto del input, si se muestra/oculta la contraseña, etc._

- **useEffect**: efectos secundarios reactivos.  
  _Ej.: al montar `Login`, leer `localStorage.isLoggedIn` para redirigir si ya inició sesión._

- **Context (Context API)**: estado global compartido sin “prop drilling”.  
  _Ej.: **ChatContext** para usuarios, chats y seleccionado; **ThemeContext** para tema._

- **React Router**: navegación entre pantallas.  
  _Rutas típicas: `/login` y `/chat`. `useNavigate()` para redirigir tras logueo._

- **matchMedia**: detectar ancho/condiciones del dispositivo y preferencia de color.  
  _Ej.: ajustar layout en móviles o activar tema oscuro/claro automáticamente._

---

## 🗂️ Datos locales del curso

- Se usa un archivo JS (p.ej. `src/data/contacts.js`) con la **lista de contactos** para pruebas.  
- Esto permite crear **nuevos chats** desde `NewChat` sin depender de un backend.

---

## 🔐 Login y almacenamiento

- `Login.jsx` guarda un flag `isLoggedIn` en **localStorage** al validar la contraseña.  
- Datos de prueba (p.ej. `users`) también se guardan en **localStorage**.  
- En la pantalla de login hay un botón **“Remover localStorage (users)”** para limpiar sólo esa key sin afectar el resto.

> **Nota:** La contraseña demo está en código (const `PASS`). Cambiala antes de publicar.

---

## 🧩 Componentes principales

- **Sidebar.jsx**: lista de usuarios/chats con buscador.  
- **NewChat.jsx**: modal para iniciar chat con un contacto.  
- **PopupSidebar.jsx**: menú lateral con **cambio de tema** y **cerrar sesión**.  
- **ProfileUser.jsx**: muestra datos básicos del perfil seleccionado.  
- **Chat.jsx**: vista del chat, input y envío (UI tipo WhatsApp).  
- **Login.jsx**: acceso con verificación básica y redirección.

---

## 🎨 Estilos y responsive

- Estilos en **CSS** (sin inline styling en JSX).  
- **Distribución de botones** y jerarquía visual mejoradas.  
- Footer del login “pegado” abajo con botón de **limpieza de `users`**.  
- Soporte para pantallas pequeñas y dark mode vía `matchMedia` (si se habilita).

---

## 🏃‍♂️ Instalación y ejecución

**Requisitos**: Node 18+ y npm 9+ (o pnpm/yarn equivalentes)

```bash
# 1) Instalar dependencias
npm install

# 2) Levantar en desarrollo
npm run dev

# 3) (Opcional) Build de producción + preview local
npm run build && npm run preview
```

Abrí el navegador en la URL que imprima el dev server (ej.: `http://localhost:5173`).

---

## 🚀 Deploy en Vercel (resumen)

1. Subí el repo a GitHub/GitLab.  
2. En **Vercel**, “New Project” → importá tu repo.  
3. **Framework**: React/Vite (auto-detecta).  
4. **Build Command**: `npm run build`  
5. **Output Directory**: `dist`  
6. Deploy. Cada push a `main` vuelve a desplegar.

---

## 🔧 Scripts útiles

```jsonc
// package.json (ejemplo)
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 4173"
  }
}
```

---

## 🧹 Limpieza de datos de prueba

- Botón en `Login` → **Remover localStorage (users)** (sólo elimina la key `users`).  
- Si necesitás “forzar” el login desde cero, borrá también `isLoggedIn`.

---

## 🧭 Rutas

- `/login`: acceso y control de sesión.  
- `/chat`: sidebar + conversación activa. Redirige aquí tras logueo correcto.

---

## 🗺️ Roadmap / mejoras futuras

- 🎤 **Grabación de audio** en el chat.  
- 😊 **Picker de emojis** y soporte de reacciones.  
- 🗑️ **Eliminar chat** y acciones masivas.  
- 🎨 **Personalización de colores**/temas por chat o usuario.  
- 📎 Adjuntos (imágenes/documentos).  
- 🔔 Notificaciones y “visto”/“escribiendo…”.  
- 🔐 Autenticación real (backend) y persistencia de chats en DB.

---

## ⚖️ Aviso

Proyecto con fines **educativos**. No afiliado a WhatsApp.  
Recomendado **no** exponer credenciales ni datos sensibles en producción.

---

## 📄 Licencia

MIT — Usalo, modificalo y compartilo libremente.
