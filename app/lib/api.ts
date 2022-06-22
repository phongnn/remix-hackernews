export async function fetchData(url: string) {
  console.log(`[fetchData] fetching data from ${url}`);
  const res = await fetch(url);
  if (res.status === 200) {
    return await res.json();
  } else {
    // console.log("[fetchData] res = ", res);
    throw new Response(null, { status: res.status });
  }
}

export async function fetchStoryData(path: string) {
  return await fetchData(`https://node-hnapi.herokuapp.com/${path}`);
}

export async function fetchUserData(path: string) {
  return await fetchData(`https://hacker-news.firebaseio.com/v0/${path}.json`);
}
