import type { LoaderFunction, ErrorBoundaryComponent } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { StoryData } from "~/types";
import { fetchStoryData } from "~/lib/api";
import NewsListItem from "~/components/NewsListItem";
import Pagination from "~/components/Pagination";
import { CATEGORY_MAP } from "~/lib/common";

interface PageData {
  category: string;
  page: number;
  stories: Partial<StoryData>[];
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const category = params["category"] || "news";
  const isValidCategory = Object.values(CATEGORY_MAP).includes(category);
  const url = new URL(request.url);
  const page = +(url.searchParams.get("page") || 1);
  const stories = isValidCategory
    ? await fetchStoryData(`${category}?page=${page}`)
    : null;

  return {
    category,
    page,
    stories,
  };
};

export default function CategoryPage() {
  const { category, page, stories } = useLoaderData<PageData>();
  return stories ? (
    <div className="news-view">
      <Pagination category={category} currentPage={page} />
      <main className="news-list">
        <ul>
          {stories.map((s) => (
            <NewsListItem story={s} key={s.id} />
          ))}
        </ul>
      </main>
    </div>
  ) : (
    <div>Not Found!</div>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.log(error);
  return <div>Oops, an error occurs!</div>;
};
