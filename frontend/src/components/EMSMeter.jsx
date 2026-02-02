import { getEMSVerdict } from "../utils/emsVerdict";

export default function EMSMeter({ score }) {
  const color =
    score >= 75 ? "green" :
    score >= 50 ? "orange" :
    "red";

  const verdict = getEMSVerdict(score);

  return (
    <div className="ems">
      <h3>Engineering Maturity Score</h3>

      <div className={`circle ${color}`}>
        {score}
      </div>

      <h4 style={{ marginTop: "16px" }}>
        {verdict.label}
      </h4>

      <p style={{ maxWidth: "500px", lineHeight: "1.6" }}>
        {verdict.description}
      </p>
    </div>
  );
}
