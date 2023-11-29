import Image from 'next/image'
import ChatbotWindow from '../components/chatbot_window'

export default function Home() {
  return (
    <div className="flex-col">
      <div className="flex-bottom-right">
        <ChatbotWindow></ChatbotWindow>
      </div>
    </div>
  )
}
