export default class Giphy {
  static async apiQuery(userSearch) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=${process.env.API_KEY}&rating=pg-13`;
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  }
}
