// Espaço reservado para imagens que ainda não chegaram.
// Trocar por <img> quando o Rafa enviar as fotos e os ecrãs dos projetos.
export default function Placeholder({ label, color = "#d9d9d6", tone = "dark", style, className }) {
  const textColor = tone === "light" ? "rgba(255,255,255,0.75)" : "rgba(20,20,20,0.55)";
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "12px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: textColor,
            border: `1px dashed ${textColor}`,
            padding: "6px 10px",
            borderRadius: "999px",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
