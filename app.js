let gameseq = [];
let userseq = [];

let btns = ["green", "red", "yellow", "purple"];

let level = 0;
let highscore = 0;
let started = false;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if (!started) {
        console.log("Game Started");
        started = true;

        nextseq();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100);
}

function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function nextseq() {
    userseq = [];

    level++;
    h2.textContent = "Level " + level;

    let randomidx = Math.floor(Math.random() * 4);
    let randcolor = btns[randomidx];

    let randbtn = document.getElementById(randcolor);

    gameseq.push(randcolor);

    console.log(gameseq);

    gameflash(randbtn);
}

function checkans(idx) {

    if (userseq[idx] === gameseq[idx]) {

        if (userseq.length === gameseq.length) {

            setTimeout(() => {
                nextseq();
            }, 1000);
        }

    } else {

        if ((level - 1) > highscore) {
            highscore = level - 1;
        }

        h2.innerHTML =
            `Game Over! Your Score: ${level - 1}
            <br>Highest Score: ${highscore}
            <br>Press Any Key to Restart`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#819FF9";
        }, 150);

        console.log("failure");

        reset();
    }
}

function btnpress() {

    let btn = this;

    userflash(btn);

    let usercolor = btn.getAttribute("id");

    userseq.push(usercolor);

    console.log(userseq);

    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
}