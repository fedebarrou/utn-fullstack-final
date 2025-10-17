import { createContext, useContext, useState, useEffect } from "react"

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
  // 1. Estado de usuarios
  // Inicializamos vacío; luego lo cargamos de localStorage o mock
  const [users, setUsers] = useState([])

  // 2. Estado del usuario seleccionado
  const [selectedUser, setSelectedUser] = useState(null)

  /* Agrego el estado de id, para poder marcar como "seleccionado" al chat abierto */
  const [selectedUserId, setSelectedUserId] = useState(null);

  // 3. Al montar el Provider, revisamos si hay usuarios guardados en localStorage
  //    - Si existen, los usamos
  //    - Si no existen, cargamos los mock iniciales
  useEffect(() => {
    const storedUsers = localStorage.getItem("users")

    if (storedUsers !== null) {
      setUsers(JSON.parse(storedUsers))
    } else {
      const now = Date.now()
      const h = (n) => now - n * 60 * 60 * 1000
      const m = (n) => now - n * 60 * 1000

      const initialUsers = [
        {
          id: 1,
          name: "Gabriel Alberini",
          status: "offline",
          lastSeenMs: h(3), // hace 3 horas
          avatar:
            "https://cursos.utnba.centrodeelearning.com/pluginfile.php/215062/user/icon/space/f2?rev=2761150",
          messages: [
            {
              id: 1,
              from: "me",
              text:
                "Profe como le va, no tenemos habilitado el link, ademas de que la pagina anda muuuy mal jaja",
              time: "19:09",
            },
            {
              id: 2,
              from: "them",
              text:
                "Hola Fede! sii, anduvo muy mal, pero por suerte resolvimos. Gracias",
              time: "16:47",
            },
          ],
        },
        {
          id: 2,
          name: "Lautaro Miceli",
          status: "online",
          lastSeenMs: now, // conectado ahora
          avatar:
            "https://cursos.utnba.centrodeelearning.com/pluginfile.php/727204/user/icon/space/f2?rev=5889626",
          messages: [
            {
              id: 1,
              from: "me",
              text:
                "Hola, Lau. Muy buena la clase de reemplazo del profe. ¿Pudiste vender la heladera?",
              time: "20:15",
            },
          ],
        },
        {
          id: 3,
          name: "Rafaela Ruggeri",
          status: "offline",
          lastSeenMs: h(12), // hace 12 horas
          avatar:
            "https://cursos.utnba.centrodeelearning.com/pluginfile.php/368319/user/icon/space/f2?rev=2170340",
          messages: [
            { id: 1, from: "them", text: "Hola Federico!", time: "09:30" },
            {
              id: 2,
              from: "them",
              text:
                "Realizaste un buen trabajo con base solida ,se adapta a los requisitos de la consigna y además agregas funcionalidades extras como preview de links y animaciones.",
              time: "09:31",
            },
            {
              id: 3,
              from: "them",
              text: "Te detallo algunos puntos a mejorar",
              time: "09:31",
            },
            {
              id: 4,
              from: "them",
              text:
                'El campo de búsqueda no cumple con el placeholder solicitado - la consigna pide "Search..." pero tenes "Buscar...", lo cual no es un error grave pero no cumple exactamente con lo pedido.',
              time: "09:32",
            },
          ],
        },
      ];


      setUsers(initialUsers)
      // Actualizamos la lista de usuarios en el localstorage
      localStorage.setItem("users", JSON.stringify(initialUsers))
    }
  }, [])

  // 4. Cada vez que `users` cambie, sincronizamos con localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users))
    }
  }, [users])

  return (
    <ChatContext.Provider value={{ users, setUsers, selectedUser, setSelectedUser, selectedUserId, setSelectedUserId }}>
      {children}
    </ChatContext.Provider>
  )
}

const useChat = () => useContext(ChatContext)

export { useChat, ChatProvider }
