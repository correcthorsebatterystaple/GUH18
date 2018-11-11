/*
function: updates the score
*/

class Meme
{
    constructor(title, permalink, imgURL, time, score,id)
    {
        this.title = title;
        this.permalink = permalink;
        this.imgURL = imgURL;
        this.time = time;
        this.score = score;
        this.prevScore = score;
        this.id = id;
        this.initialValue = score;
    }

    updateData()
    {
        updateMemeData(this);
    }

    timeElapsed() {
        return Math.floor((new Date().getTime()-this.time)/1000/60);
    }

    getValue() {
        // TODO time falloff
        return this.score;
    }

    getChange() {
        // TODO get change percentage
        return this.score;
    }
    
    getPurchaseCost() {
        return this.initialValue * PURCHASE_FEE_RATIO;
    }
}


