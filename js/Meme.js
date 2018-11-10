/*
function: updates the score
*/

class Meme
{
    constructor(title, permalink, imgURL, time, score)
    {
        this.title = title;
        this.permalink = permalink;
        this.imgURL = imgURL;
        this.time = time;
        this.score = score;
    }

    updateData(score)
    {
        this.score = score;
    }
}


