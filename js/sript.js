const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//Fetch random  user and add money
async function getRandomUser() {
  const result = await fetch("https://randomuser.me/api");
  const data = await result.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Filetr Only Millionaries
function showMillionaires() {
  data = data.filter((item) => item.money > 1000000);
  updateDOM();
}

//Calcualte Total Wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong>`;
  main.appendChild(wealthEl);
}

//Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Update DOM
function updateDOM(provideData = data) {
  //Clear Data
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  provideData.forEach((items) => {
    const element = document.createElement("div");

    element.classList.add("person"); // <div class="person"> </div>
    element.innerHTML = `<strong>${items.name}</strong> ${formatMoney(
      items.money
    )}`;
    //<div class="person"> <strong> ? </strong> ? </div>
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return `$ ${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  // 123456 => 12,345.67
}

//Event Listeners
addUser.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
