const url = "data/data.json";
const cardResultForDisplay = document.getElementById("sectionCard");
const listIngredient = document.getElementById("aaaaa");

//INPUT SEARCH
let inputSearch = document.getElementById("inputSearchCard");
let inputSearchIngredient = document.getElementById("searchIngredient");
let inputSearchAppliance = document.getElementById("searchAppareil");
let inputSearchUstensil = document.getElementById("searchUstensile");

//VARIABLES
let recipesData;
//LIST SELECT
let listIngredientSelect = [];
let listApplianceSelect = [];
let listUtensilsSelect = [];
//DATA INPUT SEARCH TAG
let dataInInputSearch = "";
let dataInInputSearchIngredient = "";

//INPUT
inputSearch.addEventListener("input", handleSearch);

async function getRecipes() {
  const response = await fetch(url);
  const { recipes } = await response.json();

  recipesData = recipes;
  buildDomElements(recipesData);
}
getRecipes();

function buildDomElements(recipes) {
  buildRecipes(recipes);
  displayIngredientInBtn(recipes);
  displayApplianceInBtn(recipes);
  displayUstensilInBtn(recipes);
}

function buildRecipes(recipes) {
  cardResultForDisplay.innerHTML = "";

  recipes.forEach((response) => {
    //card global
    const card = document.createElement("div");
    card.className = "card mr-5 mb-5 sizeCard";

    //color image
    const colorImage = document.createElement("div");
    colorImage.className = "w-100 colorStyleImg";

    //contain card
    const containCard = document.createElement("div");
    containCard.className = "d-flex card-body bg-light overflow-auto";

    //contain description card
    const containDescription = document.createElement("div");
    containDescription.className = "h-100 w-50";

    const nameRecette = document.createElement("h2");
    nameRecette.className = "text-sm card-text containDescription";
    nameRecette.innerHTML = `${response.name}`;

    const listUl = document.createElement("ul");
    listUl.className = "list-unstyled mt-3 sizeList";
    response.ingredients.forEach((i) => {
      const li = document.createElement("li");
      if (i.unit === undefined) {
        i.unit = "";
      } else if (i == i.unit) {
        return (i.unit = i.unit);
      }

      if (i.quantity === undefined) {
        i.quantity = "";
      }

      li.innerHTML = `<b>${i.ingredient}:</b> ${i.quantity} ${i.unit}`;

      listUl.appendChild(li);
    });

    //div contain second
    const containerTimeAndDescription = document.createElement("div");
    containerTimeAndDescription.className = "w-50 h-100 overflow-auto";

    const containTimeDiv = document.createElement("div");
    containTimeDiv.className = "w-100 text-right";

    const span = document.createElement("span");
    span.className = "text-right containDescription";
    span.innerHTML = `${response.time} min`;

    const containParagraphe = document.createElement("div");
    containParagraphe.className = "aaa";

    const paragrapher = document.createElement("p");
    paragrapher.className = "mt-3 sizeList elispe";
    paragrapher.innerHTML = `${response.description}`;

    //placement
    cardResultForDisplay.appendChild(card);
    card.appendChild(colorImage);
    card.appendChild(containCard);
    containCard.appendChild(containDescription);
    containDescription.appendChild(nameRecette);
    containDescription.appendChild(listUl);
    containCard.appendChild(containerTimeAndDescription);
    containerTimeAndDescription.appendChild(containTimeDiv);
    containTimeDiv.appendChild(span);
    containerTimeAndDescription.appendChild(containParagraphe);
    containParagraphe.appendChild(paragrapher);
  });
}

function handleSearch(e) {
  dataInInputSearch = e.target.value.toLowerCase();
  cardResultForDisplay.innerHTML = "";
  listIngredient.innerHTML = "";
  let filterArray = performBySearch(recipesData);

  filterArray = performByIngredientTags(filterArray);
  buildDomElements(filterArray);
}

function displayIngredientInBtn(recipes) {
  let arrayIngredientBtn = recipes.reduce((d, el) => {
    let currentIngredientBtn = el.ingredients || [];
    return d.concat(
      currentIngredientBtn.map((i) => i.ingredient.toLowerCase())
    );
  }, []);
  arrayIngredientBtn = [...new Set(arrayIngredientBtn)];
  buildIngredients(arrayIngredientBtn);
}

function displayApplianceInBtn(recipes) {
  let newArray = recipes.map((element) => element.appliance);
  newArray = [...new Set(newArray)];
  buildAppliances(newArray);
}
function displayUstensilInBtn(recipes) {
  let ustensils = recipes
    .map((recipe) => recipe.ustensils)
    .reduce((concatData, ustensils) => concatData.concat(ustensils), []);
  ustensils = [...new Set(ustensils)];
  buildUtensils(ustensils);
}

function buildUtensils(ustensil) {
  const listUtensils = document.getElementById("cccc");

  listUtensils.innerHTML = "";
  ustensil.forEach((currentAppliance) => {
    const utensilsListItem = document.createElement("li");
    utensilsListItem.addEventListener("click", handlePermanentFilterUstensil);
    utensilsListItem.className = "ustensil";
    utensilsListItem.innerHTML = `${currentAppliance}`;
    listUtensils.appendChild(utensilsListItem);
  });

  inputSearchUstensil.addEventListener("input", (e) => {
    let valueInput = e.target.value;

    listUtensils.innerHTML = "";

    filterInInputUtensils(ustensil, valueInput);
  });
}

function buildIngredients(ingredients) {
  listIngredient.innerHTML = "";
  ingredients.forEach((currentIngredient) => {
    const ingredientListItem = document.createElement("li");
    ingredientListItem.addEventListener(
      "click",
      handlePermanentFilterIngredients
    );
    ingredientListItem.className = "ingredient";
    ingredientListItem.innerHTML = `${currentIngredient}`;
    listIngredient.appendChild(ingredientListItem);
  });

  inputSearchIngredient.addEventListener("input", (e) => {
    let valueInput = e.target.value;

    listIngredient.innerHTML = "";

    filterInInputIngredients(ingredients, valueInput);
  });
}

function filterInInputIngredients(g, b) {
  let a = g.filter((i) => {
    return i.toLowerCase().includes(b.toLowerCase());
  });

  a = [...new Set(a)].filter((el) => el.toLowerCase().includes(b));

  a.forEach((currentIngredient) => {
    const ingredientListItem = document.createElement("li");
    ingredientListItem.addEventListener(
      "click",
      handlePermanentFilterIngredients
    );
    ingredientListItem.className = "ingredient";
    ingredientListItem.innerHTML = `${currentIngredient}`;
    listIngredient.appendChild(ingredientListItem);
  });
}

function filterInInputUtensils(g, b) {
  const listUtensils = document.getElementById("cccc");

  let a = g.filter((i) => {
    return i.toLowerCase().includes(b.toLowerCase());
  });

  a = [...new Set(a)].filter((el) => el.toLowerCase().includes(b));

  a.forEach((currentAppliance) => {
    const utensilsListItem = document.createElement("li");
    utensilsListItem.addEventListener("click", handlePermanentFilterUstensil);
    utensilsListItem.className = "ustensil";
    utensilsListItem.innerHTML = `${currentAppliance}`;
    listUtensils.appendChild(utensilsListItem);
  });
}

function buildAppliances(appliances) {
  const listAppliance = document.getElementById("bbbbb");

  listAppliance.innerHTML = "";
  appliances.forEach((currentAppliance) => {
    const applianceListItem = document.createElement("li");
    applianceListItem.addEventListener("click", handlePermanentFilterAppliance);
    applianceListItem.className = "appliance";
    applianceListItem.innerHTML = `${currentAppliance}`;
    listAppliance.appendChild(applianceListItem);

    inputSearchAppliance.addEventListener("input", (e) => {
      let inputValue = e.target.value;
      listAppliance.innerHTML = "";

      filterInInputAppliances(appliances, inputValue);
    });
  });
}

function filterInInputAppliances(g, b) {
  const listAppliance = document.getElementById("bbbbb");

  let a = g.filter((i) => {
    return i.toLowerCase().includes(b.toLowerCase());
  });

  a = [...new Set(a)].filter((el) => el.toLowerCase().includes(b));

  a.forEach((currentAppliance) => {
    const applianceListItem = document.createElement("li");
    applianceListItem.addEventListener("click", handlePermanentFilterAppliance);
    applianceListItem.className = "appliance";
    applianceListItem.innerHTML = `${currentAppliance}`;
    listAppliance.appendChild(applianceListItem);
  });
}

function handlePermanentFilterAppliance(e) {
  if (
    listApplianceSelect.find((currentIngredient) => {
      currentIngredient === e.currentTarget.textContent;
    })
  ) {
    return;
  }
  listApplianceSelect.push(e.currentTarget.textContent);

  let filterWithTag = performBySearch(recipesData);

  filterWithTag = performByApplianceTags(filterWithTag);
  filterWithTag = performByUstensilTags(filterWithTag);
  filterWithTag = performByIngredientTags(filterWithTag);

  buildFilterButtonAppliance(e.currentTarget.textContent);
  buildDomElements(filterWithTag);
}

function handlePermanentFilterIngredients(e) {
  if (
    listIngredientSelect.find((currentIngredient) => {
      currentIngredient === e.currentTarget.textContent;
    })
  ) {
    return;
  }
  listIngredientSelect.push(e.currentTarget.textContent);

  let filterWithTag = performBySearch(recipesData);

  filterWithTag = performByIngredientTags(filterWithTag);
  filterWithTag = performByApplianceTags(filterWithTag);
  filterWithTag = performByUstensilTags(filterWithTag);

  buildFilterButton(e.currentTarget.textContent);
  buildDomElements(filterWithTag);
}

function handlePermanentFilterUstensil(e) {
  if (
    listUtensilsSelect.find((currentUstensil) => {
      currentUstensil === e.currentTarget.textContent;
    })
  ) {
    return;
  }
  listUtensilsSelect.push(e.currentTarget.textContent);

  let filterWithTag = performBySearch(recipesData);

  console.log(listUtensilsSelect);

  filterWithTag = performByIngredientTags(filterWithTag);
  filterWithTag = performByApplianceTags(filterWithTag);
  filterWithTag = performByUstensilTags(filterWithTag);

  buildFilterButtonUstensil(e.currentTarget.textContent);
  buildDomElements(filterWithTag);
}

function performByUstensilTags(recipes) {
  if (listUtensilsSelect.length === 0) {
    return recipes;
  }

  const e = recipes.filter((i) => {
    return i.ustensils.reduce(
      (aggregated, ustensilItem) =>
        aggregated || listUtensilsSelect.includes(ustensilItem.toLowerCase()),
      false
    );
  });
  return e;
}

function performByIngredientTags(recipes) {
  if (listIngredientSelect.length === 0) {
    return recipes;
  }

  return recipes.filter((i) => {
    return i.ingredients.reduce(
      (aggregated, ingredientItem) =>
        aggregated ||
        listIngredientSelect
          .map((item) => item.toLowerCase())
          .includes(ingredientItem.ingredient.toLowerCase()),
      false
    );
  });
}
function performByApplianceTags(recipes) {
  if (listApplianceSelect.length === 0) {
    return recipes;
  }
  return recipes.filter((item) =>
    listApplianceSelect.find((appliance) => appliance === item.appliance)
  );
}

function performBySearch(recipes) {
  const results = [];

  if (dataInInputSearch.length === 0) {
    return recipes;
  }
  if (dataInInputSearch.length > 2) {
    return recipes.filter(
      (el) =>
        el.name.toLowerCase().includes(dataInInputSearch) ||
        el.description.toLowerCase().includes(dataInInputSearch) ||
        el.ingredients[0].ingredient.toLowerCase().includes(dataInInputSearch) // TODO: to review
    );
  }
  return recipes;
}

function buildFilterButton(name) {
  const zoneBtn = document.getElementById("endroitBtn");
  const btn = document.createElement("button");
  btn.className =
    "btn btn-secondary bg-primary d-flex justify-content-between mt-4 mr-1";

  btn.id = name;

  btn.innerHTML = name;

  const span = document.createElement("span");
  span.className = "ml-3";

  const img = document.createElement("img");
  img.src = "./img/close.png";
  img.id = name;

  zoneBtn.appendChild(btn);
  btn.appendChild(span);
  span.appendChild(img);

  img.addEventListener("click", listenTagToDelete);
}

function buildFilterButtonAppliance(name) {
  const zoneBtn = document.getElementById("endroitBtn");
  const btn = document.createElement("button");
  btn.className =
    "btn btn-secondary bg-success d-flex justify-content-between mt-4 mr-1";

  btn.id = name;

  btn.innerHTML = name;

  const span = document.createElement("span");
  span.className = "ml-3";

  const img = document.createElement("img");
  img.src = "./img/close.png";
  img.id = name;

  zoneBtn.appendChild(btn);
  btn.appendChild(span);
  span.appendChild(img);

  img.addEventListener("click", listenTagToDeleteAppliance);
}

function buildFilterButtonUstensil(name) {
  const zoneBtn = document.getElementById("endroitBtn");
  const btn = document.createElement("button");
  btn.className =
    "btn btn-secondary bg-danger d-flex justify-content-between mt-4 mr-1";

  btn.id = name;

  btn.innerHTML = name;

  const span = document.createElement("span");
  span.className = "ml-3";

  const img = document.createElement("img");
  img.src = "./img/close.png";
  img.id = name;

  zoneBtn.appendChild(btn);
  btn.appendChild(span);
  span.appendChild(img);

  img.addEventListener("click", listenTagToDeleteUstensil);
}

function listenTagToDelete(e) {
  const textValue = e.target.id;

  let index = listIngredientSelect.indexOf(textValue);

  if (index > -1) {
    listIngredientSelect.splice(index, 1);
    let filterWithTag = performBySearch(recipesData);

    filterWithTag = performByIngredientTags(filterWithTag);

    buildDomElements(filterWithTag);

    let valueBtnClick = document.getElementById(textValue);

    valueBtnClick.remove();
  }
  performByIngredientTags(recipesData);
}

function listenTagToDeleteUstensil(e) {
  const textValue = e.target.id;

  let index = listUtensilsSelect.indexOf(textValue);

  if (index > -1) {
    listUtensilsSelect.splice(index, 1);
    let filterWithTag = performBySearch(recipesData);

    filterWithTag = performByIngredientTags(filterWithTag);

    buildDomElements(filterWithTag);

    let valueBtnClick = document.getElementById(textValue);

    valueBtnClick.remove();
  }
  performByIngredientTags(recipesData);
}

function listenTagToDeleteAppliance(e) {
  const textValue = e.target.id;

  let index = listApplianceSelect.indexOf(textValue);

  if (index > -1) {
    listApplianceSelect.splice(index, 1);
    let filterWithTag = performBySearch(recipesData);

    filterWithTag = performByIngredientTags(filterWithTag);

    buildDomElements(filterWithTag);

    let valueBtnClick = document.getElementById(textValue);

    valueBtnClick.remove();
  }
  performByIngredientTags(recipesData);
}
