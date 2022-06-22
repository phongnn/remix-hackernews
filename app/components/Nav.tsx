import { Link } from "@remix-run/react";

import { CATEGORY_MAP } from "~/lib/common";

export default function Nav() {
  return (
    <header className="header">
      <nav className="inner">
        {Object.entries(CATEGORY_MAP).map(([name, path]) => (
          <Link to={`/${path}`} key={path}>
            <strong>{name}</strong>
          </Link>
        ))}

        <a
          className="github"
          href="https://remix.run"
          target="_blank"
          rel="noreferrer"
        >
          Built with Remix
        </a>
      </nav>
    </header>
  );
}
