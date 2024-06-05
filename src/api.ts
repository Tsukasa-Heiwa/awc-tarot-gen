const API_URL = "https://graphql.anilist.co";
const THREAD_ID = 69234;
async function fetchPostDetails(url: string) {
  const query = `
    query ($id: Int) {
      ThreadComment (id: $id, threadId: ${THREAD_ID}) {
        id
        comment
        user {
            id
            name
        }
        childComments
      }
    }
    `;
  // const ids:number[] = [...(url.matchAll(/\d+/g))];
  const ids: string[] | null = url.match(/\d+\/?$/g);
  if(!ids) return;
  const variables = {
    id: ids[0]
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  const response = await fetch(API_URL, options);
  return await response.json();
}

export { fetchPostDetails };
