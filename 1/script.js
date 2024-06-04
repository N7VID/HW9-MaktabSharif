const nameInput = document.getElementById("name-country-input");
const searchDiv = document.querySelector(".search");
const resultDiv = document.querySelector(".result");
const titleDiv = document.querySelector(".title");
const detailDiv = document.querySelector(".detail");
const commonP = document.getElementById("common-name");
const flagImg = document.getElementById("flag");

const capitalSpan = document.getElementById("Capital");
const ContinentSpan = document.getElementById("Continent");
const PopulationSpan = document.getElementById("Population");
const CurrencySpan = document.getElementById("Currency");
const commonLangSpan = document.getElementById("Common-Language");

let countryName;
function searchBtnHandler() {
  countryName = nameInput.value;
  if (countryName) {
    getData(countryName);
  }
}

async function getData(countryName) {
  try {
    document.querySelector(".loading").style.display = "block";
    await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        renderData(result);
      });
    nameInput.value = "";
    Toastify({
      text: `Successful !`,
      className: "info",
      duration: 4000,
      position: "right",
      gravity: "up",
      style: {
        color: "white",
        background: "green",
      },
    }).showToast();
    resultDiv.style.display = "block";
  } catch (e) {
    Toastify({
      text: `${e}`,
      className: "info",
      duration: 4000,
      position: "right",
      gravity: "up",
      style: {
        color: "white",
        background: "red",
      },
    }).showToast();
  } finally {
    document.querySelector(".loading").style.display = "none";
  }
}

function renderData(data) {
  commonP.innerHTML = "";
  flagImg.src = "";
  data.forEach((element) => {
    commonP.innerHTML = element.name.common;
    flagImg.src = element.flags.svg;
    flagImg.alt = element.flags.alt;
    capitalSpan.innerText = element.capital;
    ContinentSpan.innerText = element.continents;
    PopulationSpan.innerText = element.population;
    let currencies = element.currencies;
    for (let currencyCode in currencies) {
      let currencyName = currencies[currencyCode].name;
      let currencySymbol = currencies[currencyCode].symbol;
      CurrencySpan.innerText = `${currencyName} , ${currencyCode} , ${currencySymbol}`;
    }
    let languages = element.languages;
    for (let Language in languages) {
      let lang = languages[Language];
      commonLangSpan.innerText = lang;
    }
  });
}
