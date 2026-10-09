import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';

const navItems = [
  { title: "Início", href: "/" },
  { title: "Projetos", href: "/#projetos" },
  { title: "Sobre", href: "/#sobre" },
  { title: "Contacto", href: "/#contacto" },
]

export default function index({ onNavigate }) {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className={styles.menu}
      >
       <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navegação</p>
                    </div>
                    {
                      navItems.map( (data, index) => {
                        return <Link 
                        key={index} 
                        data={{...data, index}} 
                        onClick={(e) => onNavigate(e, data.href)} 
                        isActive={selectedIndicator == data.href} 
                        setSelectedIndicator={setSelectedIndicator}>
                        </Link>
                      })
                    }
            </div>
            <Footer />
        </div>
        <Curve />
    </motion.div>
  )
}