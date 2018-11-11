
function addToTable(meme){
  var Notd = document.createElement("td");
  var Titletd = document.createElement("td");
  var Linktd = document.createElement("td");
  var link = document.createElement('a');
  var InitialValuetd = document.createElement("td");
  var Valuetd = document.createElement("td");
  var sellBtntd = document.createElement("td");
  var sellBtn = document.createElement("button");
  var Memetr = document.createElement("tr");

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
  
  if(meme.change > 0)
    Valuetd.style.color = "green";
  else if(meme.change < 0)
    Valuetd.style.color = 'red';
  else
    Valuetd.style.color = "black";

  Memetr.appendChild(Notd);
  Memetr.appendChild(Titletd);
  Memetr.appendChild(Linktd);
  Memetr.appendChild(InitialValuetd);
  Memetr.appendChild(Valuetd);
  Memetr.appendChild(sellBtntd);
  document.getElementById("OwnedMemes").appendChild(Memetr); 
}

function removeFromTable(meme){
  let query = "meme-"+meme.id;
  let row = document.getElementById(query);
  row.parentElement.removeChild(row);
}

function updateValuesTable(){
  if (ownedMemes.length === 0) return "err | empty meme ownership";

  //update each row in the table
  for (let i = 0; i<ownedMemes.length; i++) {
    removeFromTable(ownedMemes[i]);
    ownedMemes[i].updateData();    
    addToTable(ownedMemes[i]);
  }
  updateValue();
}

 setInterval(updateValuesTable, 2000);


