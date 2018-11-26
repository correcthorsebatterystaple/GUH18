/* FUNCTIONS THAT RETRIEVE THE MEMES AND SCORES FROM REDDIT */

let newMemeSet;
let ownedMemes = [];
let currentMeme;
let memeIDCount = 1;

const PURCHASE_FEE_RATIO = 1.15;

const subredditList = ["memes", "historymemes", "comedycemetery", "dankmemes"]
const sortTypes = ["rising", "new"];

// Load new set of memes to be displayed
function reloadNewMemes() {
    let s = document.createElement("script");

    let sub = subredditList[Math.floor(Math.random()*subredditList.length)];
    let sort = sortTypes[Math.floor(Math.random()*sortTypes.length)];

    s.src = "http://www.reddit.com/r/" + sub + "/" + sort + ".json?limit=200&amp;jsonp=getRandomMemeCallback";

    document.body.appendChild(s);
    document.body.removeChild(s);
}

// callback for retriving random meme
function getRandomMemeCallback(data) {
    if(newMemeSet == null) {
      newMemeSet = data;
      updateGraphics();

    } else {
      if(data != null && data.data != null && data.data.children.length > 50)
          newMemeSet = data;
    }
}

//get random meme from current meme set
function getRandomMeme() {
    if(newMemeSet == null) return "err | meme set not initialised";

    for(let i = 0; i < 200; i++) {
        let index = Math.floor(Math.random() * newMemeSet.data.children.length);
        let permalink = newMemeSet.data.children[index].data.permalink;
        let title = newMemeSet.data.children[index].data.title;
        let score = newMemeSet.data.children[index].data.score;
        let imgUrl = newMemeSet.data.children[index].data.url;
        let time = newMemeSet.data.children[index].data.created;
        let id = memeIDCount++;

        let m = new Meme(title, permalink, imgUrl, time, score, id);

        for(let j = 0; j < ownedMemes.length; j++) {
            if(ownedMemes[j].permalink == m.permalink) continue;
        }

        if(imgUrl.toLowerCase().endsWith(".jpg") || imgUrl.toLowerCase().endsWith(".png"))
            return m;
    }

    alert("Couldnt find new meme. Please wait");
    return "err";
}

setInterval(reloadNewMemes, 5000);
reloadNewMemes();

// callback for updating the meme
function updateMemeCallback(data) {
    let score = data[0].data.children[0].data.score;
    let permalink = data[0].data.children[0].data.permalink;

    for(let i = 0; i < ownedMemes.length; i++) {
        if(ownedMemes[i].permalink == permalink) {
            ownedMemes[i].prevScore = ownedMemes[i].score;
            ownedMemes[i].change = score - ownedMemes[i].prevScore;
            ownedMemes[i].score = score;
            break;
        }
    }
}

// updates the meme that is given to the function
function updateMemeData(meme) {
    let s = document.createElement("script");
    s.src = "http://www.reddit.com" + meme.permalink + ".json?jsonp=updateMemeCallback";
    document.body.appendChild(s);
    document.body.removeChild(s);
}

// update the graphics of the meme to display the meme on the screen
function updateGraphics() {
    currentMeme = getRandomMeme();
    document.getElementById("memeTitle").innerHTML = currentMeme.title;
    document.getElementById("memeImage").src = currentMeme.imgURL;
    document.getElementById("memeScore").innerHTML = "Score: " + currentMeme.score;
    document.getElementById("buyBtn").innerHTML = "$" + Math.floor(currentMeme.getPurchaseCost());
}
