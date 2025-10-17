import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"
import { ChatProvider } from "../context/ChatContext"

const Messages = () => {
  return (
    <ChatProvider>
      <div className="app">
        <Sidebar />
        <Chat />
      </div>
    </ChatProvider>
  )
}

export { Messages }