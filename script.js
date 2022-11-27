const img = document.querySelector("#image");
const qot = document.querySelector("#quote");
const btn = document.querySelector("button");
const ani = document.querySelector("#anime");
const cha = document.querySelector("#character");
const imgTypes = ["sea", "hills", "cities", "nightstars", "picsum", "space"];
let qotUrl = "https://animechan.vercel.app/api/random";
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
            ani.textContent = `Anime: ${data["anime"]}`;
            cha.textContent = `Character: ${data["character"]}`;
            qot.textContent = data["quote"];
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
