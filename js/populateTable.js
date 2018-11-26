/* FUNCTIONS THAT UPDATE AND POPULATE THE PORTFOLIO TABLE */

// add the given meme to the portfolio table
function addToTable(meme){
  let Memetr = document.createElement("tr");
  let Notd = Memetr.insertCell();
  let Titletd = Memetr.insertCell();
  let Linktd = Memetr.insertCell();
  let link = document.createElement('a');
  let InitialValuetd = Memetr.insertCell();
  let Valuetd = Memetr.insertCell();
  let sellBtntd = Memetr.insertCell();
  let sellBtn = document.createElement("button");

  sellBtn.type = "button";
  sellBtn.addEventListener("click", sellMemeRow);
  sellBtn.innerHTML = "Sell";
  sellBtntd.appendChild(sellBtn);

  Memetr.id = "meme-"+meme.id;

  link.href = "https://www.reddit.com"+meme.permalink;
  link.innerHTML = "LINK";
  link.target = "_blank";
  Linktd.appendChild(link);

  Notd.innerHTML = meme.id;

  Titletd.innerHTML = meme.title;

  Valuetd.innerHTML = Math.floor(meme.getValue());
  InitialValuetd.innerHTML =  Math.floor(meme.getPurchaseCost());

  document.getElementById("OwnedMemes").appendChild(Memetr);
}

//remove given meme from the portfolio table
function removeFromTable(meme){
  let query = "meme-"+meme.id;
  let row = document.getElementById(query);
  row.parentElement.removeChild(row);
}

// get the row of the meme parameter in the portfolio table
function getMemeRow(meme) {
  let query = "meme-"+meme.id;
  return document.getElementById(query);
}

// refresh and update the values of the owned memes by the player
function updateValuesTable(){
  if (ownedMemes.length === 0) return "err | empty meme ownership";

  //update each row in the table
  for (let i = 0; i<ownedMemes.length; i++) {
    //get the meme row in portfolio table
    let memeRow = getMemeRow(ownedMemes[i]);

    //update the meme data
    ownedMemes[i].updateData();

    //find cost cell
    let cost = memeRow.cells[4];
    cost.innerHTML = ownedMemes[i].score;

    //change colour of cost cell
    if(ownedMemes[i].change > 0)
      cost.style.color = "green";
    else if(ownedMemes[i].change < 0)
      cost.style.color = 'red';
    else
      cost.style.color = "black";
  }
  updateValue();
}

// create the table of values for the current owned memes
function createValuesTable() {
  ownedMemes.forEach(meme => {
    addToTable(meme);
  });
}

setInterval(updateValuesTable, 2000);
