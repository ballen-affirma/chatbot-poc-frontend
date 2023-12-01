'use client'

import { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useRef, useState } from "react"
import styles from './chatbot.module.css'

type SentMessage = {
    'sender': "AI" | "USER",
    'key': string,
    'text': string
};

export default function ChatbotWindow() {
    const [history, setHistory] = useState<SentMessage[]>([]);
    const [message, setMessage] = useState('');
    const [isAILoading, setIsAILoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleMessageChange = function (event: ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    const handleSubmit = async function(event: FormEvent<HTMLFormElement>) {
        if (message == "") {
            return;
        }
        event.preventDefault();
        setHistory(h => [...h, {'sender': 'USER', 'text': message, 'key': h.length.toString()}]);

        const queryStr = encodeURIComponent(message)
        fetch(`https://webapi-5waicdtr5a-uc.a.run.app/predict?msg=${queryStr}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                let ai_response = data.response;
                setHistory(h => [...h, {'sender': 'AI', 'text': ai_response, 'key': h.length.toString()}])
                setIsAILoading(false);
            })

        setMessage("");
        setIsAILoading(true);
    }

    useEffect(() => {
        messagesEndRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        })
    }, [messagesEndRef, history])

    const createMessageJSX = (message: SentMessage) => {
        let icon = null;
        let additionalClass = null;
        if (message.sender == "AI") {
            icon = <img src="/assets/chatbot.webp" />
            additionalClass = styles.gray;
        }
        else {
            icon = <img src="/assets/user.png" />
            additionalClass = styles.blue;
        }

        return <div className={styles.message} ref={
            message.key == (history.length - 1).toString()
            ? messagesEndRef
            : null} key={message.key}>
            <div className={styles.chatIcon}>{icon}</div>
            <div className={`${styles.messageText} ${additionalClass}`}>{message.text}</div>
        </div>
    }

    return (
        <div className={styles.chatbotWindow}>
            <div className={styles.header}>
                <div className={styles.introIcon}>
                    <img src="/assets/chatbot.webp"></img>
                </div>
                <div className={styles.intro}>
                    <p className={styles.emphasized}>Hi, I'm AVA!</p>
                    <p>Alorica AI Virtual Assistant</p>
                </div>
            </div>
            <div className={styles.messageHistory}>
                {history.map(message => createMessageJSX(message))}
            </div>
            <form method="post" onSubmit={handleSubmit}>
                <div className={styles.inputForm}>
                    <input className={styles.chatInput} type="text" value={message} onChange={handleMessageChange} placeholder="Chat!"></input>
                    <button className={styles.submitButton} type="submit" disabled={isAILoading}>
                        {isAILoading ? (
                            <div className="lds-dual-ring"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="#1E3050" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                        )}    
                    </button>
                </div>
            </form>
        </div>
    )
}