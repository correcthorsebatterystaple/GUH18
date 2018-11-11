//MEME TRANSACTIONS
let balance = 0;
let value = 0;

function buyMeme() {
  ownedMemes.push(currentMeme);
  let memePrice = currentMeme.getValue();
  balance -= memePrice;
  value += memePrice;
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