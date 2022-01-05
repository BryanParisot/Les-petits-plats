export default class DataApi {
  async findData() {
    const url = "data/data.json";
    let reponse = await fetch(url);
    let data = await reponse.json();

    const recipes = data.recipes;

    return {
      recipes: recipes,
    };
  }
}
