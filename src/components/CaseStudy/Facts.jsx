import styles from './style.module.scss';

// Ficha do topo dos case studies.
// Todos os case studies têm os mesmos quatro campos (pedido do Rafa, 11 nov):
// Cliente, O meu papel e Setor vêm da "Ficha rápida" do markdown; Leitura é calculada a partir do texto.
export const FACT_FIELDS = ['Cliente', 'O meu papel', 'Setor', 'Leitura'];
const MAX_COMPACT = 5;

export default function Facts({ items = [] }) {
  if (!items.length) return null;

  // Uma ficha que só usa os campos do padrão (até 5) usa o layout compacto, numa linha.
  // Fichas antigas, com outros campos, mantêm a grelha anterior até serem revistas.
  const compact =
    items.length <= MAX_COMPACT && items.every((f) => FACT_FIELDS.includes(f.label));

  const ordered = compact
    ? [...items].sort((a, b) => FACT_FIELDS.indexOf(a.label) - FACT_FIELDS.indexOf(b.label))
    : items;

  return (
    <dl className={compact ? `${styles.facts} ${styles.factsCompact}` : styles.facts}>
      {ordered.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd className={f.pending ? styles.pending : undefined}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
