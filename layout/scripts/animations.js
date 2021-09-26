let bigCards = document.querySelectorAll(".my__applications");

bigCards.forEach((card) => {
  let btn = card.querySelector(".button__my__applications");
  btn.addEventListener("click", () => {
    card.classList.toggle("my__applications_big");
    if (btn.innerHTML == "Развернуть") {
      btn.innerHTML = "Свернуть";
    } else if (btn.innerHTML == "Свернуть") {
      btn.innerHTML = "Развернуть";
    }
  });
});

let smallCard = document.querySelector("#applicationBtn");
let infoCard = document.querySelector("#applicationInfo");

smallCard.addEventListener("click", () => {
  infoCard.classList.toggle("hide");
});
