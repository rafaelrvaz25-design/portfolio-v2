import { logo } from '../../data/logo';

// O logo "Rv." em vetor (redesenhado a partir do logo do site Webflow antigo).
export default function RvMark({ className, style, title = 'Rafael Vaz' }) {
  return (
    <svg className={className} style={style} viewBox={logo.viewBox.join(' ')} role="img" aria-label={title}>
      <path d={logo.parts.join(' ')} fill="currentColor" />
    </svg>
  );
}
