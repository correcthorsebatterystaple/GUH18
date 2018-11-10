/*
function: updates the score
*/

class Meme
{
    constructor(title, permalink, imgURL, value, time, score)
    {
        this.title = title;
        this.permalink = permalink;
        this.imgURL = imgURL;
        this.value = value;
        this.time = time;
        this.score = score;
    }

    updateData(score)
    {
        this.score = score;
    }
}


