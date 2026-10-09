import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Placeholder from '../../common/Placeholder';

// Espaços reservados: trocar por ecrãs reais dos projetos quando chegarem.
const slider1 = [
    { color: "#e6ebe7", label: "FPF · Botão" },
    { color: "#dfe3e0", label: "FPF · Tokens" },
    { color: "#e6ebe7", label: "FPF · Site" },
    { color: "#d8ddd9", label: "FPF · Score" },
]

const slider2 = [
    { color: "#ebe7e1", label: "RRS · Supervisor" },
    { color: "#e3dfd9", label: "RRS · Tabuleiro" },
    { color: "#ebe7e1", label: "RRS · Remoção" },
    { color: "#ddd8d1", label: "RRS · Adição" },
]

export default function index() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    return (
        <div ref={container} className={styles.slidingImages}>
            <motion.div style={{x: x1}} className={styles.slider}>
                    {
                        slider1.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div className={styles.imageContainer}>
                                    <Placeholder label={project.label} color="rgba(255,255,255,0.55)" />
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                <motion.div style={{x: x2}} className={styles.slider}>
                    {
                        slider2.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div key={index} className={styles.imageContainer}>
                                    <Placeholder label={project.label} color="rgba(255,255,255,0.55)" />
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                <motion.div style={{height}} className={styles.circleContainer}>
                    <div className={styles.circle}></div>
                </motion.div>
        </div>
    )
}
