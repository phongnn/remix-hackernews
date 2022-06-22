import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useCatch } from "@remix-run/react";

import type { StoryData } from "~/types";
import { fetchStoryData } from "~/lib/api";
import Comment from "~/components/Comment";

interface Props {
  story: StoryData;
}

export const loader: LoaderFunction = async ({ params }) => {
  return {
    story: await fetchStoryData(`item/${params["id"]}`),
  };
};

export default function StoryPage() {
  const { story } = useLoaderData<Props>();
  return (
    <div className="item-view">
      <div className="item-view-header">
        <a href={story.url} target="_blank" rel="noreferrer">
          <h1>{story.title}</h1>
        </a>
        {story.domain && <span className="host">({story.domain})</span>}
        <p className="meta">
          {story.points ?? 0} points | by{" "}
          <Link to={`/users/${story.user}`}>{story.user}</Link> {story.time_ago}{" "}
          ago
        </p>
      </div>
      <div className="item-view-comments">
        <p className="item-view-comments-header">
          {story.comments_count
            ? story.comments_count + " comments"
            : "No comments yet."}
        </p>
        <ul className="comment-children">
          {story.comments.map((comment, idx) => (
            <Comment comment={comment} key={idx} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const { status } = useCatch();
  const message = status === 404 ? "Story not found." : "Unexpected error.";
  return <h3>{message}</h3>;
}
