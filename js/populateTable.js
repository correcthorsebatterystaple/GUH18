for(var i = 0; i < ownedMemes.length; i++) {

  var Notd = document.createElement("td");
  var Titletd = document.createElement("td");
  var Linktd = document.createElement("td");
  var Valuetd = document.createElement("td");
  var Memetr = document.creteElement("tr");

  Notd.innerHTML = i+1;
  Titletd.innerHTML = ownedMemes[i].title;
  Linktd.innerHTML = ownedMemes[i].permalink;
  Valuetd.innerHTML = ownedMemes[i].getValue();

  document.getElementById("OwnedMemes").appendChild(Memetr);

}
