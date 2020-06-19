const types = ["Swordsman", "Mage", "Archer", "Axeman"];
const imageUrl = {
  mage: "https://i.ibb.co/gDFp9J8/mage.png",
  swordsman: "https://i.ibb.co/KXdpf5B/swordsman.png",
  axeman: "https://i.ibb.co/sWbTMRk/axeman.png",
  archer: "https://i.ibb.co/MGW2ZwH/archer.png",
};
let currentCardIndex = 0;
const rightArrow = document.querySelector("#rightArrow");
const leftArrow = document.querySelector("#leftArrow");

//Create array of random cards--------------------------------------------------------------------------------

function makeRandomCards(num) {
  const aCards = [];
  for (i = 1; i <= num; i++) {
    let oCard = {
      type: getRandomType(),
      image: function () {
        let url = "";
        for (x in imageUrl) {
          if (`${x}` === this.type.toLowerCase()) {
            url = imageUrl[x];
            break;
          }
        }
        return url;
      },
      level: getRandomNumber(1, 10),
      power: getRandomStars(1, 10),
      damage: function () {
        return this.level * this.power.numberOfStars;
      },
    };
    aCards.push(oCard);
  }
  return aCards;
}

const getRandomType = () => {
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const getRandomStars = (min, max) => {
  const numberOfStars = getRandomNumber(min, max);
  let stringOfStars = "<span>&#10026;</span>";
  for (let i = 1; i < numberOfStars; i++) {
    stringOfStars += "<span>&#10026;</span>";
  }
  return { stringOfStars, numberOfStars };
};

let aCards = makeRandomCards(4);
//APPEND CARDS TO THE DOM------------------------------------------------

function insertCard(currentCardIndex) {
  const cardContainer = document.querySelector("#cardContainer");
  let card = aCards[currentCardIndex];
  cardContainer.innerHTML = ` <img src="${card.image()}" alt="${card.type}" />
  <div class="side-info">
  <div class="level">Level ${card.level}</div>
    <div class="header"> ${card.type} </div>
    <div>Power: ${card.power.stringOfStars}</div>
    <div>Damage: ${card.damage()}</div>
  </div>
</div>
`;
}
insertCard(currentCardIndex);

function getNextCard() {
  if (currentCardIndex === aCards.length - 1) {
    rightArrow.classList.add("hidden");
    return;
  } else {
    rightArrow.classList.remove("hidden");
    leftArrow.classList.remove("hidden");
    currentCardIndex++;
    insertCard(currentCardIndex);
    if (currentCardIndex === aCards.length - 1) {
      rightArrow.classList.add("hidden");
    }
  }
}
function getPreviousCard() {
  if (currentCardIndex === 0) {
    leftArrow.classList.add("hidden");
    return;
  } else {
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
    currentCardIndex--;
    insertCard(currentCardIndex);
  }
}

rightArrow.addEventListener("click", getNextCard);
leftArrow.addEventListener("click", getPreviousCard);
