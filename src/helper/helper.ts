export const getBooksData = async (query: string): Promise<any> => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`,
    {
      method: "GET"
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const { items } = data || [];
      return items;
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
};
