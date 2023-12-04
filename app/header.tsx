'use client';

import styles from './header.module.css'
import { useEffect, useState } from 'react'

function getCurrentDimension(){
    if (typeof window !== 'undefined') {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    else {
        return {
            width: 0,
            height: 0,
        }
    }
}

export default function Header() {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const [showLinks, setShowLinks] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleLinks = () => {
        setShowLinks(s => !s)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateDimension = () => {
                setScreenSize(getCurrentDimension())
            }
            window.addEventListener('resize', updateDimension);

            if (screenSize.width > 1023) {
                setShowLinks(true);
                setShowMenu(false);
            }
            else {
                setShowLinks(false);
                setShowMenu(true);
            }
            
            return(() => {
                window.removeEventListener('resize', updateDimension);
            })
        }
    }, [screenSize]);

    return (
        <div className={styles.header}>
            <div className={styles.bannerRow}>
                <img className={styles.aloricaBanner} src="/assets/AloricaIQ_Banner.png"></img>
                {showMenu && (
                    <div className={styles.linksButton} onClick={toggleLinks} >
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="48px" height="48px"><path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z"/></svg>                    
                    </div>
                )}
            </div>
            {showLinks && (
            <div className={styles.links}>
                <a className={styles.link} href="https://alorica-chatbot-demo-5waicdtr5a-uc.a.run.app">Call Deflection</a>
                <a className={styles.link} href="https://alorica-chatbot-demo-5waicdtr5a-uc.a.run.app">Contact Optimization</a>
                <a className={styles.link} href="https://alorica-chatbot-demo-5waicdtr5a-uc.a.run.app">Tools</a>
                <a className={styles.link} href="https://alorica-chatbot-demo-5waicdtr5a-uc.a.run.app">Alorica Assure</a>
                <a className={styles.link} href="https://alorica-chatbot-demo-5waicdtr5a-uc.a.run.app">AVA</a>
            </div>
            )}
        </div>
    )
}