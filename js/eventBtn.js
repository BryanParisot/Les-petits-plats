////////// btn
const btnIngredients = document.getElementById("btnIngredients");
const btnAppareil = document.getElementById("btnAppareil");
const btnUstensil = document.getElementById("btnUstensiles");
/////// lists
const listIngredients = document.getElementById("listElementsIngredientsInBtn");
const listAppliance = document.getElementById("listElementsAppareil");
const listUstensils = document.getElementById("listElementsUstensiles");

const arrow = document.getElementById("arrowTop");
const arrow2 = document.getElementById("arrowTop2");
const arrow3 = document.getElementById("arrowTop3");

btnIngredients.addEventListener("click", displayELements);
arrow.addEventListener("click", notDisplayElements);

btnAppareil.addEventListener("click", displayApplicance);
arrow2.addEventListener("click", notDisplayAppliance);

btnUstensil.addEventListener('click', displayUstensilsee)
arrow3.addEventListener("click", notDisplayUstensils)

function displayELements() {
  listIngredients.style.display = "block";
  btnIngredients.style.display = "none";
}

function notDisplayElements() {
  listIngredients.style.display = "none";
  btnIngredients.style.display = "flex";
}
function displayApplicance() {
  listAppliance.style.display = "block";
  btnAppareil.style.display = "none";
}

function notDisplayAppliance() {
  listAppliance.style.display = "none";
  btnAppareil.style.display = "flex";
}

function displayUstensilsee() {
  listUstensils.style.display = "block";
  btnUstensil.style.display = "none";
}

function notDisplayUstensils() {
  listUstensils.style.display = "none";
  btnUstensil.style.display = "flex";
}

