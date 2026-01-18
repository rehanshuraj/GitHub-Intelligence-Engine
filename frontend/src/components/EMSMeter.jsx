export default function EMSMeter({ score }) {
  const color =
    score >= 75 ? "green" :
    score >= 50 ? "orange" :
    "red";

  return (
    <div className="ems">
      <h3>Commit Quality Score</h3>
      <div className={`circle ${color}`}>
        {score}
      </div>
    </div>
  );
}
