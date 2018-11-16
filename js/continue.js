function readMemePortfolio(portfolio) {
  updateBalance(portfolio.balance);
  let owned = [];
  portfolio.owned.forEach(meme => {
    let input = new Meme(meme.title, meme.permalink, meme.imgURL, meme.time, meme.score,meme.id);
    owned.push(input);
  });
  memeIDCount = portfolio.memeIDCount;
  ownedMemes = owned;
  createValuesTable();
}

function saveMemePortfolio() {
  let portfolio = {};
  portfolio.balance = balance;
  portfolio.memeIDCount = memeIDCount;
  portfolio.owned = ownedMemes;

  let strPortfolio = JSON.stringify(portfolio);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("portfolio", strPortfolio);
  } else return "Unable to find local storage\n";
  return strPortfolio;
}

//loads a previous meme portfolio
(function(){
  if (localStorage.getItem("portfolio")) {
    let portfolio = JSON.parse(localStorage.getItem("portfolio"));
    readMemePortfolio(portfolio);
  }
})();

function restartGame() {
  localStorage.removeItem("portfolio");
  location.reload();
}

setInterval(saveMemePortfolio, 30000);

document.getElementById('SavePortfolio').onclick = "saveMemePortfolio();";
