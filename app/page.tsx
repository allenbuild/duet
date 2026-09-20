const collaborationDimensions = [
  {
    label: 'Physical coordination',
    description: 'handoffs, shared loads, joint manipulation',
  },
  {
    label: 'Task coordination',
    description: 'role division, sequencing, turn-taking',
  },
  {
    label: 'Interactive adaptation',
    description: 'intent signaling, response, correction, recovery',
  },
];

const marketShifts = [
  {
    label: 'Supply-side',
    description:
      'Factories are generating more data, with 78% of large manufacturers putting over 20% of improvement budgets into smart manufacturing (Deloitte, 2025).',
  },
  {
    label: 'Model-side',
    description:
      'Robots are learning more from data, with 1,000× more pretraining raising average task performance from 20% to 53% (Dyna Robotics, 2026).',
  },
  {
    label: 'Demand-side',
    description:
      'Labs are spending more on data, with robotics data spend expected to exceed $3B over the next two years (Bessemer, 2026).',
  },
];

const milestones = [
  'Shipped multimodal robotics hardware for frontier lab contracts',
  'Joined HF0 (S26) and Founders, Inc. (Canopy) as Founders-in-Residence',
  'Built assistive wearables winning millions of dollars in academic scholarships',
  'Built edtech apps with 30k+ users and organizations teaching 4k+ students',
  'Interviewed by Space Center Houston (2×), NBC News, ABC News, and more',
  'Conducted ML research at Northwestern University and Boston University (RISE)',
  'Published through IEEE, IIAI, and Harvard University',
];

export default function Home() {
  return (
    <div className="page-shell">
      <main className="site-main">
        <article className="letter">
          <section className="copy-section" aria-labelledby="thesis-heading">
            <h1 id="thesis-heading">Thesis</h1>
            <p>
              Duet process-mines human collaboration into workflow data for industrial
              operators and training data for frontier labs.{' '}
              <strong>
                We believe human-human interaction data is robotics’ next scaling law.
              </strong>
            </p>

            <p className="list-intro">
              General-purpose robots have seen millions of hours of people working alone,
              and almost none of people working together. To our knowledge, ETH Zurich’s
              CoMind is the largest paired human-collaboration dataset at just 41 hours.
              Duet’s dataset captures what single-actor data misses:
            </p>
            <ul className="dash-list">
              {collaborationDimensions.map(({ label, description }) => (
                <li key={label}>
                  <em>{label}:</em> {description}
                </li>
              ))}
            </ul>

            <p>
              And of course, we capture these interactions across diverse, real-world
              worksites. One dataset, two customers: each deployment improves operations
              for teams today and builds training data for robots working alongside them
              tomorrow.
            </p>
          </section>

          <section className="copy-section" aria-labelledby="why-now-heading">
            <h2 id="why-now-heading">Why Now</h2>
            <p className="list-intro">Duet is a bet on three converging shifts:</p>
            <ul className="dash-list">
              {marketShifts.map(({ label, description }) => (
                <li key={label}>
                  <em>{label}:</em> {description}
                </li>
              ))}
            </ul>
          </section>

          <section className="copy-section" aria-labelledby="why-us-heading">
            <h2 id="why-us-heading">Why Us</h2>
            <p>
              <em>In elementary school,</em> Andrew interviewed South Korea’s president for
              a class project on the country’s semiconductor industry. Allen presented on
              self-driving LiDAR with an ISEF winner. Idhant convinced his teacher to give
              him lessons in string theory.
            </p>

            <p>
              <em>In middle school,</em> Allen placed 7th at the FTC Robotics World
              Championships against teams dominated by high school seniors. Idhant pitched
              to Mastercard. Andrew raised a $30k fund, now up 274%.
            </p>

            <div className="milestones">
              <p>Since then, we’ve:</p>
              <ul>
                {milestones.map((milestone) => (
                  <li key={milestone}>{milestone}</li>
                ))}
              </ul>
            </div>

            <div className="turn">
              <p>
                We’ve spent most of our lives building robots.{' '}
                <em>This time, we’re building the data layer they learn from.</em>
              </p>
            </div>
          </section>

          <section className="copy-section contact-section" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact</h2>
            <p>
              We’re hiring. If you’re exceptional with multimodal sensing, data infra, or
              ops, email{' '}
              <a className="paint-underline" href="mailto:allen@duetlabs.co">
                allen@duetlabs.co
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <footer className="site-footer">
        <div className="site-stamp">
          <small>
            © <time dateTime="2026">2026</time> Duet Labs
          </small>
        </div>

        <nav className="linkedin-row" aria-label="Duet Labs founders on LinkedIn">
          <svg className="linkedin-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.1 20.45H3.54V9H7.1v11.45Z" />
          </svg>
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
