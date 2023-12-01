import Image from 'next/image'
import ChatbotWindow from '../components/chatbot_window'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.blurbContainer}>
        <p>The Next Generation</p>
        <p className={styles.emphasized}>Customer Experience</p>
        <br/>
        <p>Inspired by People, Infused with Technology</p>
        <p className={styles.emphasized}>Powered by Alorica IQ</p>
      </div>
      <div className={styles.instructionsContainer}>
        <p>Chat with our AI assistant</p>
      </div>
      <div className={styles.chatContainer}>
          <ChatbotWindow></ChatbotWindow>
      </div>
      <div className={styles.footer}>
        <p>© 2023 Alorica, Inc.</p>
        <p>Confidential and proprietary.</p>
        <a href="https://www.alorica.com/privacy-policy">Privacy Policy</a>
        <a href="https://www.alorica.com/terms-of-use">Terms of Use</a>
      </div>
    </div>
  )
}
