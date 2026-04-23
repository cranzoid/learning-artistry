interface EyebrowProps {
  label: string;
  index?: string;
  className?: string;
}

export default function Eyebrow({ label, index, className = '' }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index && (
        <span className="mono text-[var(--color-ink-5)]">{index}</span>
      )}
      <span className="eyebrow">{label}</span>
    </div>
  );
}
