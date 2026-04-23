import Eyebrow from '@/components/ui/Eyebrow';

interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageShellProps {
  eyebrow: string;
  title: string;
  lead: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export default function LegalPageShell({
  eyebrow,
  title,
  lead,
  effectiveDate,
  sections,
}: LegalPageShellProps) {
  return (
    <>
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0 clamp(3rem, 6vw, 5rem)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          <div
            className="mono"
            style={{
              fontSize: 11,
              paddingBottom: 20,
              borderBottom: '1px solid var(--color-line)',
              display: 'flex',
              gap: 20,
              flexWrap: 'wrap',
              color: 'var(--color-ink-4)',
            }}
          >
            <span>{eyebrow}</span>
            <span>Effective {effectiveDate}</span>
          </div>
          <h1
            className="serif"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
              marginTop: 40,
              maxWidth: '14ch',
            }}
          >
            {title}
          </h1>
          <p className="lead" style={{ marginTop: 28, maxWidth: '62ch' }}>
            {lead}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Eyebrow index="§ 01" label="Details" />
          <div style={{ marginTop: 36, borderTop: '1px solid var(--color-line)' }}>
            {sections.map((section, index) => (
              <div key={section.title} className="legal-row">
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.06em',
                    paddingTop: 8,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.08,
                  }}
                >
                  {section.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      style={{
                        margin: 0,
                        fontSize: 15,
                        color: 'var(--color-ink-3)',
                        lineHeight: 1.65,
                        maxWidth: '62ch',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .legal-row {
          display: grid;
          grid-template-columns: 80px 1fr 1.8fr;
          gap: 36px;
          padding: 32px 0;
          border-bottom: 1px solid var(--color-line);
          align-items: start;
        }
        @media (max-width: 900px) {
          .legal-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}
