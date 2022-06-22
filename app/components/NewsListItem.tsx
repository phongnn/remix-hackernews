import type { FunctionComponent } from "react";
import { Link } from "@remix-run/react";

import type { StoryData } from "~/types";

interface Props {
  story: Partial<StoryData>;
}

const NewsListItem: FunctionComponent<Props> = ({ story }) => {
  return (
    <li className="news-item">
      <span className="score">{story.points}</span>
      <span className="title">
        <a href={story.url} target="_blank" rel="noreferrer">
          {story.title}
        </a>
        <span className="host"> ({story.domain})</span>
      </span>
      <br />
      <span className="meta">
        {story.type === "job" && (
          <Link to={`/stories/${story.id}`}>{story.time_ago}</Link>
        )}
        {story.type !== "job" && (
          <>
            by <Link to={`/users/${story.user}`}>{story.user}</Link>{" "}
            {story.time_ago} |{" "}
            <Link to={`/stories/${story.id}`}>
              {story.comments_count
                ? `${story.comments_count} comments`
                : "discuss"}
            </Link>
          </>
        )}
      </span>
      {story.type !== "link" && (
        <>
          {" "}
          <span className="label">{story.type}</span>
        </>
      )}
    </li>
  );
};

export default NewsListItem;
