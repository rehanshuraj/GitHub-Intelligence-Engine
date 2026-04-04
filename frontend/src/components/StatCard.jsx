export default function StatCard({ title, value }) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        background: "#111827",
        color: "white",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      <h3 style={{ marginBottom: "8px", fontSize: "16px", color: "#9ca3af" }}>
        {title}
      </h3>

      <p style={{ fontSize: "22px", fontWeight: "bold" }}>
        {value ?? "N/A"}
      </p>
    </div>
  );
}