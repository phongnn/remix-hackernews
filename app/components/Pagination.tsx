import type { FunctionComponent } from "react";
import { Link } from "@remix-run/react";

interface Props {
  category: string;
  currentPage: number;
}

const Pagination: FunctionComponent<Props> = ({ currentPage, category }) => {
  return (
    <div className="news-list-nav">
      {currentPage == 1 && (
        <span className="page-link disabled" aria-hidden="true">
          &lt; prev
        </span>
      )}

      {currentPage > 1 && (
        <Link
          to={`/${category}?page=${currentPage - 1}`}
          className="page-link"
          aria-label="Previous Page"
        >
          {"<"} prev
        </Link>
      )}

      <span>page {currentPage}</span>

      <Link
        to={`/${category}?page=${currentPage + 1}`}
        className="page-link"
        aria-label="Next Page"
      >
        more {">"}
      </Link>
    </div>
  );
};

export default Pagination;
