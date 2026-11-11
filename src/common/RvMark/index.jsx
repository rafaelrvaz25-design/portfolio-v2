import { logoNew } from '../../data/logoNew';

// O logo "Rv." em vetor (o novo desenho do Rafa, vetorizado a partir da imagem dele).
export default function RvMark({ className, style, title = 'Rafael Vaz' }) {
  return (
    <svg className={className} style={style} viewBox="90 71 725 300" {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' })}>
      <path d={logoNew.sharp.join(' ')} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
