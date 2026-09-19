const milestones = [
  'Shipped multimodal robotics hardware for contracts with frontier AI labs',
  'Joined HF0 (S26) and Founders, Inc. (Canopy) as Founders-in-Residence',
  'Built assistive wearables winning millions of dollars in academic scholarships',
  'Built edtech apps with 30k+ users and nonprofit organizations teaching 4k+ students',
  'Interviewed by Space Center Houston (2x), NBC News, ABC News, & more',
  'Conducted ML research at Northwestern University, Boston University, & the University of Michigan',
  'Published research through IEEE, IIAI, and Harvard University',
  'Reached semifinal outrounds at ISEF and NSDA Debate Nationals',
];

export default function Home() {
  return (
    <main className="page-shell">
      <article className="letter">
        <p>
          <em>In elementary school,</em> Andrew interviewed South Korea’s president for
          a project on the country’s semiconductor industry. Allen presented on
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
          <p>We’ve spent most of our lives building robots.</p>
          <p>
            <em>This time, we’re building the data infrastructure they learn from.</em>
          </p>
        </div>

        <p>
          <strong>Duet is building a data layer for human collaboration.</strong>{' '}
          We process-mine human-human interaction data from real-world worksites to
          understand how teams coordinate, where workflows break, and why the best crews
          move faster. Operators pay for workflow intelligence; frontier robotics labs
          license the resulting interactions as training data. One dataset, two
          customers: every deployment streamlines operations today and expands the
          world’s first off-the-shelf dataset for robots learning to work alongside
          humans.
        </p>

        <p>
          We’re hiring. If you’re exceptional with multimodal sensing, robot perception,
          or operations, email{' '}
          <a href="mailto:research@duetlabs.co">research@duetlabs.co</a>.
        </p>
      </article>
    </main>
  );
}
