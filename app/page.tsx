const marketShifts = [
  {
    label: 'Supply-side',
    description:
      'Factories are generating more data, with 78% of manufacturers putting 20% of improvement budgets into smart manufacturing (Deloitte, 2025).',
  },
  {
    label: 'Model-side',
    description:
      'Robots are learning more from data, with 1,000× more pretraining raising task performance 2.5× (Dyna Robotics, 2026).',
  },
  {
    label: 'Demand-side',
    description:
      'Labs are spending more on data, with robotics data spend expected to exceed $3B over the next two years (Bessemer, 2026).',
  },
];

const milestones = [
  'Shipped multimodal robotics hardware for frontier lab contracts',
  'Built at HF0 Residency (S26) and Founders, Inc. (Canopy)',
  'Built wearables ($2M+ in scholarships), edtech apps (30K+ users), nonprofits (4K+ students)',
  'Published ML research through IEEE, IIAI, and Harvard',
];

export default function Home() {
  return (
    <div className="page-shell">
      <main className="site-main">
        <article className="letter">
          <section className="copy-section" aria-labelledby="duet-heading">
            <h1 id="duet-heading">Duet</h1>
            <p>We’re building a new data layer for physical AI.</p>
          </section>

          <section className="copy-section" aria-label="Market data">
            <p className="list-intro">So, naturally, some data:</p>
            <ul>
              {marketShifts.map(({ label, description }) => (
                <li key={label}>
                  <em>{label}:</em> {description}
                </li>
              ))}
            </ul>
          </section>

          <section className="copy-section" aria-label="About Duet">
            <div className="milestones">
              <p>A little about us:</p>
              <ul>
                {milestones.map((milestone) => (
                  <li key={milestone}>{milestone}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="copy-section" aria-label="Funding">
            <p>We’ve raised <strong>$XXXK</strong> to prove robotics’ next scaling law.</p>
          </section>

          <section className="copy-section contact-section" aria-label="We’re hiring">
            <p>
              <strong>We’re hiring.</strong> If you’re exceptional with multimodal sensing, data infra, or
              ops, email{' '}
              <a className="paint-underline" href="mailto:research@duetlabs.co">
                research@duetlabs.co
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <footer className="site-footer">
        <nav className="linkedin-row" aria-label="Duet Labs founders on LinkedIn">
          <div className="founder-names">
            <span className="founder-link">
              <a
                className="paint-underline"
                href="https://www.linkedin.com/in/idhant-ranjan-078104254"
                aria-label="Idhant Ranjan on LinkedIn"
              >
                Idhant Ranjan
              </a>
            </span>
            <span className="founder-link">
              <span aria-hidden="true">·</span>
              <a
                className="paint-underline"
                href="https://www.linkedin.com/in/andrewheejay"
                aria-label="Andrew Lee on LinkedIn"
              >
                Andrew Lee
              </a>
            </span>
            <span className="founder-link">
              <span aria-hidden="true">·</span>
              <a
                className="paint-underline"
                href="https://www.linkedin.com/in/allenjxu"
                aria-label="Allen Xu on LinkedIn"
              >
                Allen Xu
              </a>
            </span>
          </div>
        </nav>
      </footer>

      <div className="factory-scene" aria-hidden="true" />
    </div>
  );
}
