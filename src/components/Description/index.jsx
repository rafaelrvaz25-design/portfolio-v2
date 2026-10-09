import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
export default function index() {

    const phrase = "Desenho produtos digitais que continuam a evoluir depois do lançamento. Prefiro sistemas a projetos fechados.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} id="sobre" className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>Três anos na Monday, de estagiário a UX/UI Designer, entre desporto, e-commerce e retalho. Trabalho com clientes como a Federação Portuguesa de Futebol, a Perfumes & Companhia e a Fujitsu, para o Pingo Doce.</motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <a href="#contacto">
                        <Rounded className={styles.button}>
                            <p>Vamos falar</p>
                        </Rounded>
                    </a>
                </div>
            </div>
        </div>
    )
}
