import { request } from "undici";

export async function fetchData(url: string) {
  console.log(`[fetchData] fetching data from ${url}`);
  const res = await request(url);
  if (res.statusCode === 200) {
    return await res.body.json();
  } else {
    // console.log("[fetchData] res = ", res);
    throw new Response(null, { status: res.statusCode });
  }
}

export async function fetchStoryData(path: string) {
  return await fetchData(`https://node-hnapi.herokuapp.com/${path}`);
}

export async function fetchUserData(path: string) {
  return await fetchData(`https://hacker-news.firebaseio.com/v0/${path}.json`);
}
