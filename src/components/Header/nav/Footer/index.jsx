import styles from './style.module.scss';
import { person } from '../../../../data/projects';

export default function index() {
  return (
    <div className={styles.footer}>
        <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${person.email}`}>Email</a>
    </div>
  )
}
