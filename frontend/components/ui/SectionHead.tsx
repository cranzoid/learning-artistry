import { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

interface SectionHeadProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: 'split' | 'center' | 'left';
  action?: ReactNode;
}

export default function SectionHead({
  index,
  eyebrow,
  title,
  sub,
  align = 'left',
  action,
}: SectionHeadProps) {
  const isSplit = align === 'split';
  const isCenter = align === 'center';

  if (isSplit) {
    return (
      <div
        className="grid gap-6 md:gap-14 md:items-end"
        style={{ gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)' }}
      >
        <div style={{ gridColumn: '1 / -1' }}>
          <div className="pb-5 border-b border-[var(--color-line)]">
            <Eyebrow label={eyebrow} index={index} />
          </div>
        </div>
        <div>
          <h2 className="h1 max-w-[20ch]">{title}</h2>
        </div>
        <div className="flex flex-col items-start gap-4 md:max-w-[44ch] md:pb-1">
          {sub && (
            <p className="lead max-w-[44ch]">{sub}</p>
          )}
          {action && <div>{action}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${isCenter ? 'items-center text-center' : ''}`}>
      <div className={`pb-5 border-b border-[var(--color-line)] ${isCenter ? 'w-full flex justify-center' : ''}`}>
        <Eyebrow label={eyebrow} index={index} />
      </div>
      <h2 className={`h1 ${isCenter ? 'max-w-[22ch]' : 'max-w-[20ch]'}`}>{title}</h2>
      {sub && (
        <p className={`lead ${isCenter ? 'max-w-[52ch]' : 'max-w-[44ch]'}`}>
          {sub}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
