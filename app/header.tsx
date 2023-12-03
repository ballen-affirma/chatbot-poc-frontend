'use client';

import styles from './layout.module.css'
import { useEffect, useState } from 'react'

function getCurrentDimension(){
    return {
      	width: window.innerWidth,
      	height: window.innerHeight
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
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        if (screenSize.width > 1024) {
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
                <a className={styles.link} href="/">Call Deflection</a>
                <a className={styles.link} href="/">Contact Optimization</a>
                <a className={styles.link} href="/">Tools</a>
                <a className={styles.link} href="/">Alorica Assure</a>
                <a className={styles.link} href="/">AVA</a>
            </div>
            )}
        </div>
    )
}