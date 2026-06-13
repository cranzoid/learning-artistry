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
      <div className="sh-split">
        <div className="sh-split-full">
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
        <style>{`
          .sh-split {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .sh-split-full { grid-column: 1 / -1; }
          @media (min-width: 768px) {
            .sh-split {
              grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
              gap: 3.5rem;
              align-items: end;
            }
          }
        `}</style>
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
