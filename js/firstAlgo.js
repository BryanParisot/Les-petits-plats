function firstAlgo() {
  const sectionCard = document.getElementById("sectionCard");

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

  const listUl = document.createElement("ul");
  listUl.className = "list-unstyled mt-3 sizeList";

  const li = document.createElement("li");

  //div contain second
  const containerTimeAndDescription = document.createElement("div");
  containerTimeAndDescription.className = "w-50";

  const containTimeDiv = document.createElement("div");
  containTimeDiv.className = "w-100 text-right";

  const span = document.createElement("span");
  span.className = "text-right containDescription";

  const paragrapher = document.createElement('p')
  paragrapher.className = "mt-3 sizeList"

  //placement
  sectionCard.appendChild(card);
  card.appendChild(colorImage);
  card.appendChild(containCard);
  containCard.appendChild(containDescription);
  containDescription.appendChild(nameRecette);
  containDescription.appendChild(listUl);
  listUl.appendChild(li);
  containCard.appendChild(containerTimeAndDescription);
  containerTimeAndDescription.appendChild(containTimeDiv);
  containTimeDiv.appendChild(span)
  containerTimeAndDescription.appendChild(paragrapher)
}
