import type { FunctionComponent } from "react";
import { useState } from "react";
import { Link } from "@remix-run/react";

import type { CommentData } from "~/types";

const pluralize = (n: number) => n + (n === 1 ? " reply" : " replies");

const Comment: FunctionComponent<{ comment: CommentData }> = ({ comment }) => {
  const [open, setOpen] = useState(true);
  return (
    <li className="comment">
      <div className="by">
        <Link to={`/users/${comment.user}`}>{comment.user}</Link>{" "}
        {comment.time_ago} ago
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      {comment.comments.length > 0 && (
        <div className={`toggle ${open ? "open" : ""}`}>
          <a onClick={() => setOpen((o) => !o)}>
            {open
              ? "[-]"
              : "[+] " + pluralize(comment.comments.length) + " collapsed"}
          </a>
        </div>
      )}
      {open && (
        <ul className="comment-children">
          {comment.comments.map((comment, idx) => (
            <Comment comment={comment} key={idx} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Comment;
