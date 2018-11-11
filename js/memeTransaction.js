//MEME TRANSACTIONS
let balance = 100;
(document.getElementById('balanceNum')).innerHTML = balance;
let value = 0;
(document.getElementById('valueNum')).innerHTML = value;

function buyMeme() {
  let memePrice = currentMeme.getValue();
  if (balance < memePrice) {
    alert("Not enough cash mate!")
    return;
  } 

  ownedMemes.push(currentMeme);
  balance -= memePrice;
  (document.getElementById('balanceNum')).innerHTML = balance;
  value += memePrice;
  addToTable(currentMeme);
  updateGraphics();
}

function sellMeme(meme) {
  var index = ownedMemes.indexOf(meme);
  if (index > -1) {
    ownedMemes.splice(index, 1);
  }
  balance += meme.getValue();
  value += memePrice;
}

function updateValue() {
  value = 0;
  for (let i = 0; i<ownedMemes.length; i++) {
    value += ownedMemes[i].getValue();
  }
}

function changeMeme() {
  updateGraphics();
}