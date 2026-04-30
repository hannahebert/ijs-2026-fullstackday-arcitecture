import { Link } from "react-router";

const examples = [
  {
    path: "/god-component",
    title: "God Component",
    blurb: "The 2,000-line component, prop drilling, business logic in JSX.",
  },
  {
    path: "/state-management",
    title: "State Management",
    blurb: "When state goes wrong: lifted too high, scattered too wide.",
  },
  {
    path: "/effects-lifecycle",
    title: "Effects & Lifecycle",
    blurb: "useEffect spaghetti and lifecycle chaos.",
  },
  {
    path: "/error-handling",
    title: "Error Handling & Loading",
    blurb: "The states you forget to handle until production reminds you.",
  },
  {
    path: "/forms",
    title: "Forms",
    blurb: "The eternal frontend pain point.",
  },
  {
    path: "/over-engineering",
    title: "Over-Engineering",
    blurb: "When the cure is worse than the disease.",
  },
];

export default function Index() {
  return (
    <article>
      <h1>Examples</h1>
      <ul className="example-list">
        {examples.map((e) => (
          <li key={e.path}>
            <Link to={e.path}>{e.title}</Link>
            <p>{e.blurb}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
