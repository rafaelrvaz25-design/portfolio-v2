import styles from './style.module.scss';
import Rounded from '../../common/RoundedButton';
import { useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import Placeholder from '../../common/Placeholder';
import { person } from '../../data/projects';

function useLisbonTime() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const format = () => new Intl.DateTimeFormat('pt-PT', {
            hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Lisbon'
        }).format(new Date());
        setTime(format());
        const id = setInterval(() => setTime(format()), 30000);
        return () => clearInterval(id);
    }, []);
    return time;
}

export default function index() {
    const container = useRef(null);
    const time = useLisbonTime();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
    return (
        <motion.div style={{y}} ref={container} id="contacto" className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Placeholder label="Foto" color="#3a3b3e" tone="light" style={{ padding: 0 }} />
                        </div>
                        <h2>Vamos trabalhar</h2>
                    </span>
                    <h2>juntos</h2>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <a href={`mailto:${person.email}`}>
                            <Rounded backgroundColor={"#334BD3"} className={styles.button}>
                                <p>Enviar email</p>
                            </Rounded>
                        </a>
                    </motion.div>
                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                    <a href={`mailto:${person.email}`}>
                        <Rounded>
                            <p>{person.email}</p>
                        </Rounded>
                    </a>
                    <a href={person.linkedin} target="_blank" rel="noreferrer">
                        <Rounded>
                            <p>LinkedIn</p>
                        </Rounded>
                    </a>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>Versão</h3>
                            <p>Alpha · 2026</p>
                        </span>
                        <span>
                            <h3>Hora em Lisboa</h3>
                            <p>{time}</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <h3>Redes</h3>
                            <Magnetic>
                                <a href={person.linkedin} target="_blank" rel="noreferrer"><p>LinkedIn</p></a>
                            </Magnetic>
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
