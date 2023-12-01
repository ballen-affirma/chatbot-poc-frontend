'use client'

import { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useRef, useState } from "react"

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


    return (
        <div className="chatbot-window">
            <div className="message-history">
                {history.map(message => {
                    let icon = null
                    if (message.sender == 'AI') {
                        icon = <svg className="svg-icon" viewBox="0 0 20 20">
							<path d="M17.237,3.056H2.93c-0.694,0-1.263,0.568-1.263,1.263v8.837c0,0.694,0.568,1.263,1.263,1.263h4.629v0.879c-0.015,0.086-0.183,0.306-0.273,0.423c-0.223,0.293-0.455,0.592-0.293,0.92c0.07,0.139,0.226,0.303,0.577,0.303h4.819c0.208,0,0.696,0,0.862-0.379c0.162-0.37-0.124-0.682-0.374-0.955c-0.089-0.097-0.231-0.252-0.268-0.328v-0.862h4.629c0.694,0,1.263-0.568,1.263-1.263V4.319C18.5,3.625,17.932,3.056,17.237,3.056 M8.053,16.102C8.232,15.862,8.4,15.597,8.4,15.309v-0.89h3.366v0.89c0,0.303,0.211,0.562,0.419,0.793H8.053z M17.658,13.156c0,0.228-0.193,0.421-0.421,0.421H2.93c-0.228,0-0.421-0.193-0.421-0.421v-1.263h15.149V13.156z M17.658,11.052H2.509V4.319c0-0.228,0.193-0.421,0.421-0.421h14.308c0.228,0,0.421,0.193,0.421,0.421V11.052z"></path>
						</svg>
                    }
                    else {
                        icon = <svg className="svg-icon" viewBox="0 0 20 20">
                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                    </svg>
                    }

                    return <div className="message" ref={
                        message.key == (history.length - 1).toString()
                        ? messagesEndRef
                        : null} key={message.key}>
                        <div className="iconContainer">{icon}</div>
                        <div className="textContainer">{message.text}</div>
                    </div>
                    
                })}
            </div>
            <hr />
            <form method="post" onSubmit={handleSubmit}>
                <div className="inputForm">
                    <input className="chatInput" type="text" value={message} onChange={handleMessageChange} style={{"border": "1px solid black"}} placeholder="Chat!"></input>
                    <button className="submitButton" type="submit" disabled={isAILoading}>
                        {isAILoading ? (
                            <div className="lds-dual-ring"></div>
                        ) : (
                        <svg className="svg-icon" viewBox="0 0 20 20">
							<path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
						</svg>
                        )}    
                    </button>
                </div>
            </form>
        </div>
    )
}