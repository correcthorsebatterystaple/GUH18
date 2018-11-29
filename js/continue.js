/* FUNCTIONS THAT SAVE GAME STATE AND ALLOW TO CONTINUE GAME */

// reads the given porfolio and updates the game state to that portfolio
function readMemePortfolio(portfolio) {
  updateBalance(portfolio.balance);
  let owned = [];
  portfolio.owned.forEach(meme => {
    let input = new Meme(meme.title, meme.permalink, meme.imgURL, meme.time, meme.initialValue,meme.id);
    owned.push(input);
  });
  memeIDCount = portfolio.memeIDCount;
  ownedMemes = owned;
  createValuesTable();
}

// saves the current portfolio of memes
function saveMemePortfolio(auto) {
  let portfolio = {};
  portfolio.balance = balance;
  portfolio.memeIDCount = memeIDCount;
  portfolio.owned = ownedMemes;

  let strPortfolio = JSON.stringify(portfolio);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("portfolio", strPortfolio);
    if (!auto) alert('Portfolio saved');
  } else alert("Unable to find local storage.\nPortfolio not saveed!");
  return strPortfolio;
}

//loads a previous meme portfolio if exists
(function(){
  if (localStorage.getItem("portfolio")) {
    let portfolio = JSON.parse(localStorage.getItem("portfolio"));
    readMemePortfolio(portfolio);
  }
})();

// restarts the game
function restartGame() {
  localStorage.removeItem("portfolio");
  location.reload();
}

setInterval(function(){saveMemePortfolio(true);}, 30000);

document.getElementById('SavePortfolio').onclick = "saveMemePortfolio();";
