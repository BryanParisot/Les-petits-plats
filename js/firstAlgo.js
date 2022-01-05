import DataApi from "./DataApi.js";

export default class firstAlgo {
  firstAlgo() {
    new DataApi().findData().then((response) => {
      const recipes = response.recipes;
      response.recipes.map((response) => {
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
        nameRecette.innerHTML = `${response.name}`;

        const listUl = document.createElement("ul");
        listUl.className = "list-unstyled mt-3 sizeList";

        response.ingredients.forEach((i) => {
          const li = document.createElement("li");
          if (i.unit === undefined) {
            i.unit = "";
            //   console.log(i);
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
        sectionCard.appendChild(card);
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
    });
  }
}
