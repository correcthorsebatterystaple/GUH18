/* FUNCTIONS THAT HANDLE THE TRANSACTIONS FOR THE BUYING AND SELLING OF MEMES */

// initialize portfolio balance
const INIT_BALANCE = 100;
let balance = INIT_BALANCE;
updateBalance(INIT_BALANCE);

//initialize portfolio value
let value = 0;
(document.getElementById('valueNum')).innerHTML = value;

// buy the current meme
function buyMeme() {
  let memePrice = Math.floor(currentMeme.getValue() * PURCHASE_FEE_RATIO);
  if (balance < memePrice) {
    alert("Not enough cash mate!")
    return;
  }

  ownedMemes.push(currentMeme);
  balance -= memePrice;
  (document.getElementById('balanceNum')).innerHTML = balance;
  updateValue();
  addToTable(currentMeme);
  updateGraphics();
}

//  onclick event for the sell button
function sellMemeRow(row) {
  let id = row.target.parentNode.parentNode.id;
  id = parseInt(id.slice(5));
  console.log(id);
  for (let i = 0; i<ownedMemes.length; i++) {
    if (ownedMemes[i].id == id) {
      sellMeme(ownedMemes[i]);
      break;
    }
  }
}

// sell the meme given the parameter
function sellMeme(meme) {
  var index = ownedMemes.indexOf(meme);
  if (index > -1) {
    ownedMemes.splice(index, 1);
  }
  updateBalance(balance + meme.getValue());

  updateValue();
  removeFromTable(meme);
}

// update the portfolio value
function updateValue() {
  value = 0;
  for (let i = 0; i<ownedMemes.length; i++) {
    value += ownedMemes[i].getValue();
  }
  (document.getElementById('valueNum')).innerHTML = value;
}

// update the portfolio balance
function updateBalance(num) {
  balance = num;
  (document.getElementById('balanceNum')).innerHTML = balance;
}

function changeMeme() {
  updateGraphics();
}
