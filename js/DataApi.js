export default class DataApi {
  async findData() {
    const url = "data/data.json";
    let response = await fetch(url);
    let data = await response.json();

    const recipes = data.recipes;

    return {
      recipes: recipes,
    };
  }
}
