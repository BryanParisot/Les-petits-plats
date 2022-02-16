//Variable Utilisable généralement
let inputSearch = document.getElementById("inputSearchCard");
const cardResultFordisplay = document.getElementById("sectionCard");
const listIngredient = document.getElementById("aaaaa");
const listApliance = document.getElementById("appareilList");
const listUstensil = document.getElementById("ustensilelList");

const url = "data/data.json";

let dataArray;
let dataIngredient = [];
let dataAppliances = [];
let dataUstensils = [];
let filterIngredients = [];

async function getCard() {
  const res = await fetch(url);
  const { recipes } = await res.json();

  dataArray = recipes;
  //createListCard(dataArray);
}
getCard();

function createListCard(dataCard) {
  dataCard.forEach((response) => {
    //card global
    const card = document.createElement("div");
    card.className = "card mr-5 mb-5 sizeCard";

    //color image
    const colorImage = document.createElement("div");
    colorImage.className = "w-100 colorStyleImg";

    //contain card
    const containCard = document.createElement("div");
    containCard.className = "d-flex card-body bg-light";

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
    containerTimeAndDescription.className = "w-50";

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
    cardResultFordisplay.appendChild(card);
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

inputSearch.addEventListener("input", filterData);
let dataInInputSearch = "";

function filterData(e) {
  dataInInputSearch = e.target.value.toLowerCase();
  cardResultFordisplay.innerHTML = "";
  listIngredient.innerHTML = "";
  listApliance.innerHTML = "";
  listUstensil.innerHTML = "";

  let filterArray = dataArray.filter(
    (el) =>
      el.name.toLowerCase().includes(dataInInputSearch) ||
      el.description.toLowerCase().includes(dataInInputSearch) ||
      el.ingredients[0].ingredient.toLowerCase().includes(dataInInputSearch) // TODO: to review
  );
  if (filterIngredients.length > 0 ) {
    filterArray = filterArray.filter(el => el.ingredients[0].ingredient.toLowerCase().includes()
    )
  }
  //console.log(dataInInputSearch);
  if (dataInInputSearch.length > 2) {
    createListCard(filterArray);
    displayIngredientInBtn(filterArray);
    displayAppliances(filterArray);
    displayUstensils(filterArray);
  }
}

function displayIngredientInBtn(data) {
  let abc = data.reduce((d, el) => {
    let efg = el.ingredients || [];
    return d.concat(efg.map((i) => i.ingredient.toLowerCase()));
  }, []);
  abc = [...new Set(abc)];
  buildIngredients(abc);
}

function buildIngredients(ingredients, canAddToIngredients = true) {
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
}

function displayAppliances(data) {
  let newArray = data.map((element) => element.appliance);
  newArray = [...new Set(newArray)];
  dataAppliances.push(newArray);

  //console.log("new array" + data);
  dataAppliances.forEach((appliance) => {
    appliance.forEach((currentAppliance) => {
      const applianceList = document.createElement("li");
      applianceList.className = "mr-2 ingredient";
      applianceList.innerHTML = `${currentAppliance}`;
      listApliance.appendChild(applianceList);
    });
  });
}

function displayUstensils(cards) {
  //console.log(cards);
  let ustensils = cards
    .map((card) => card.ustensils)
    .reduce((concatData, ustensils) => concatData.concat(ustensils), []);
  ustensils = [...new Set(ustensils)];

  dataUstensils.push(ustensils);

  dataUstensils.forEach((ustensil) => {
    ustensil.forEach((currentUstensil) => {
      const ustensilElementLi = document.createElement("li");
      ustensilElementLi.className = "mr-2 ingredient";
      ustensilElementLi.innerHTML = `${currentUstensil}`;
      listUstensil.appendChild(ustensilElementLi);
    });
    //console.log(ustensil);
  });
}
function filterIngredientInInput() {
  //console.log(listIngredient);
  const InputSearchIngredientInInput =
    document.getElementById("searchIngredient");

  InputSearchIngredientInInput.addEventListener("input", (e) => {
    listIngredient.innerHTML = "";
    const valueInput = e.target.value.toLowerCase();
    let test = dataArray
      .filter(
        (el) =>
          el.name.toLowerCase().includes(dataInInputSearch) ||
          el.description.toLowerCase().includes(dataInInputSearch) ||
          el.ingredients[0].ingredient.toLowerCase().includes(dataInInputSearch)
      )
      .reduce(
        (data, card) => data.concat(card.ingredients.map((i) => i.ingredient)),
        []
      );

    test = [...new Set(test)].filter((el) =>
      el.toLowerCase().includes(valueInput)
    );
    console.log("test ===", test);

    buildIngredients(test, true);
  });
}
filterIngredientInInput();

//manque à afficher
function filterAppareil() {
  const inputSearchAppareil = document.getElementById("searchAppareil");

  inputSearchAppareil.addEventListener("input", (e) => {
    listApliance.innerHTML = "";
    dataAppliances = [];
    const valueInputSearchAppreil = e.target.value.toLowerCase();
    let aaaa = dataArray
      .filter(
        (el) =>
          el.name.toLowerCase().includes(dataInInputSearch) ||
          el.description.toLowerCase().includes(dataInInputSearch) ||
          el.ingredients[0].ingredient.toLowerCase().includes(dataInInputSearch)
      )
      .reduce((data, card) => data.concat(card.appliance), []);
    aaaa = [...new Set(aaaa)].filter((el) =>
      el.toLowerCase().includes(valueInputSearchAppreil)
    );
    console.log(aaaa);
    dataAppliances.push(aaaa);
    displayAppliances(aaaa);
  });
}
filterAppareil();

function filterUstensil() {
  const inputSearchUstensil = document.getElementById("searchUstensile");
  inputSearchUstensil.addEventListener("input", (e) => {
    listUstensil.innerHTML = "";
    dataUstensils = [];
    let valueSearchUstensil = e.target.value.toLowerCase();
    let bbbbb = dataArray
      .filter(
        (el) =>
          el.name.toLowerCase().includes(dataInInputSearch) ||
          el.description.toLowerCase().includes(dataInInputSearch) ||
          el.ingredients[0].ingredient.toLowerCase().includes(dataInInputSearch)
      )
      .reduce((data, card) => data.concat(card.ustensils.map((x) => x)), []);
    bbbbb = [...new Set(bbbbb)].filter((el) =>
      el.toLowerCase().includes(valueSearchUstensil)
    );
    dataUstensils.push(bbbbb);
    displayUstensils(bbbbb);
  });
}
filterUstensil();

function handlePermanentFilterIngredients(e) {
  if (
    filterIngredients.find(
      (currentIngredient) => currentIngredient === e.currentTarget.textContent
    )
  ) {
    return;
  }
  filterIngredients.push(e.currentTarget.textContent);
  buildFilterButton(e.currentTarget.textContent);
  console.log(filterIngredients);
}

function buildFilterButton(name) {
  const zoneBtn = document.getElementById("endroitBtn");
  const btn = document.createElement("button");
  btn.className =
    "btn btn-secondary bg-primary d-flex justify-content-between mt-4";

  btn.innerHTML = name;

  const span = document.createElement("span");
  span.className = "ml-3";

  const svg = document.createElement("svg");
  svg.style.width = "20";
  svg.style.height = "20";
  svg.style.viewBox = "0 0 20 20";
  svg.style.xmlns = "http://www.w3.org/2000/svg";

  const path = document.createElement("path");
  path.style.d =
    "M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z";
  path.style.fill = "white";

  zoneBtn.appendChild(btn);
  btn.appendChild(span);
  span.appendChild(svg);
  svg.appendChild(path);
}
