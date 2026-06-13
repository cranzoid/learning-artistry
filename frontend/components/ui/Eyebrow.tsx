interface EyebrowProps {
  label: string;
  /** Retained for call-site compatibility; the editorial index mark is no longer rendered. */
  index?: string;
  className?: string;
}

export default function Eyebrow({ label, className = '' }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="eyebrow">
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 22,
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            opacity: 0.7,
          }}
        />
        {label}
      </span>
    </div>
  );
}
