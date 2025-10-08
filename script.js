const img = document.querySelector("#image");
const qot = document.querySelector("#quote");
const btn = document.querySelector("button");
const ani = document.querySelector("#anime");
const cha = document.querySelector("#character");
const imgTypes = ["sea", "hills", "cities", "nightstars", "picsum", "space"];
let qotUrl = "https://api.animechan.io/v1/quotes/random";
let qotRequest = new Request(qotUrl);
let imgType;
let imgUrl;

btn.addEventListener("click", visualize);

function visualize() {
  setupImg();

  fetch(qotRequest)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      const quoteData = data.data;
      const animeName = quoteData.anime.name;
      const characterName = quoteData.character.name;
      ani.textContent = `Anime: ${animeName}`;
      cha.textContent = `Character: ${characterName}`;
      qot.textContent = quoteData.content;
    });
}

function setupImg() {
  imgType = giveRandomImg();
  imgUrl = `https://picsum.photos/seed/${imgType}/1920/1080?blur=10?greyscale`;
  img.src = imgUrl;
  img.width = img.parentElement.offsetWidth;
  img.height = img.parentElement.offsetHeight;
}

function giveRandomImg() {
  return imgTypes[Math.floor(Math.random() * imgTypes.length)];
}

visualize();
