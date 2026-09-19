const milestones = [
  'Shipped multimodal robotics hardware for contracts with frontier labs',
  'Joined HF0 (S26) and Founders, Inc. (Canopy) as Founders-in-Residence',
  'Built assistive wearables winning millions of dollars in academic scholarships',
  'Built edtech apps with 30k+ users and nonprofit organizations teaching 4k+ students',
  'Interviewed by Space Center Houston (2×), NBC News, ABC News, & more',
  'Conducted ML research at Northwestern University and Boston University (RISE)',
  'Published research through IEEE, IIAI, and Harvard University',
  'Reached semifinal outrounds at ISEF and NSDA Debate Nationals',
];

export default function Home() {
  return (
    <main className="page-shell">
      <article className="letter">
        <p>
          <em>In elementary school,</em> Andrew interviewed South Korea’s president for
          a class project on the country’s semiconductor industry. Allen presented on
          self-driving LiDAR with an ISEF winner. Idhant convinced his teacher to give
          him lessons in string theory.
        </p>

        <p>
          <em>In middle school,</em> Allen placed seventh at the FTC World Championships
          against teams dominated by high school seniors. Idhant pitched to the
          Mastercard Foundation board. Andrew raised a $30k fund that has returned 274%
          to date.
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
          <p>We’ve spent most of our lives learning how robots work.</p>
          <p>
            <em>This time, we’re helping robots learn how we work.</em>
          </p>
        </div>

        <p>
          <strong>
            Duet is building the world&apos;s first data layer for human collaboration.
          </strong>{' '}
          We process-mine human-human interaction data from real-world worksites to
          understand how teams coordinate, where workflows break, and why the best crews
          move faster. Operators pay for workflow intelligence. Frontier robotics labs
          license the resulting interactions as training data. One dataset, two
          customers: every deployment makes teams more efficient today and builds the
          data layer for robots working alongside them tomorrow.
        </p>

        <p>
          We’re hiring. If you’re exceptional with multimodal sensing, data infra, or ops,
          email{' '}
          <a className="paint-underline" href="mailto:allen@duetlabs.co">
            allen@duetlabs.co
          </a>
          .
        </p>
      </article>

      <footer className="site-footer">
        <div className="site-stamp">
          <small>
            © <time dateTime="2026">2026</time> Duet Labs
          </small>
        </div>

        <nav className="linkedin-row" aria-label="Duet Labs founders on LinkedIn">
          <svg
            className="linkedin-mark"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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
    </main>
  );
}
