import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { UserData } from "~/types";
import { fetchUserData } from "~/lib/api";

interface Props {
  user: UserData;
}

export const loader: LoaderFunction = async ({ params }) => ({
  user: await fetchUserData(`user/${params!["id"]}`),
});

export default function UserPage() {
  const { user } = useLoaderData<Props>();
  return (
    <div className="user-view">
      {user && !user.error ? (
        <>
          <h1>User : {user.id}</h1>
          <ul className="meta">
            <li>
              <span className="label">Created:</span> {user.created}
            </li>
            <li>
              <span className="label">Karma:</span> {user.karma}
            </li>
            {user.about && (
              <>
                <li
                  className="about"
                  dangerouslySetInnerHTML={{ __html: user.about }}
                />{" "}
              </>
            )}
          </ul>
          <p className="links">
            <a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>
              submissions
            </a>{" "}
            |{" "}
            <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>
              comments
            </a>
          </p>
        </>
      ) : (
        <h1>User not found.</h1>
      )}
    </div>
  );
}
