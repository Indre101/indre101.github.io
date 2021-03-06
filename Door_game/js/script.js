const landingPageContainer = document.getElementById("landingPageContainer");
const startGamePage = document.getElementById("startGamePage");
const popUpInstructionsContainer = document.getElementById("popUpInstructionsContainer");
const gameContainer = document.querySelector(".body");
const startButton = document.getElementById("startButton");
const infoButtonContainer = document.getElementById("infoButtonContainer");
const returnButtonContainer = document.getElementById("returnButtonContainer");


let state = "";
let openDoorsCount = 0;
let lives = 3;
let score = 0;

// AUDIO
const backgroundSound = new Audio("./audio/backgroundSound.mp3");




function randomNumberGenerator(l) {

  let n = Math.floor(Math.random() * l.length)

  return n

}

// chaning background image 
function changeBackground(x, u) {

  x.style.backgroundImage = u;

}


// function to toggle classes

function toggleClasses(x, c) {
  x.classList.toggle(c)

}


function addClass(x, a) {

  x.classList.add(a)

}

function removeClass(x, a) {

  x.classList.remove(a);

}

// function to clear img src;

function clearImgSrc(x) {
  x.src = "";

}

// class variables

let dBlock = "d-block";
let dNone = "d-none";


// 
startButton.onclick = function () {


  // start page changes to the game beginng
  let url1 = "url('./images/images/bg_2.jpg')"
  changeBackground(gameContainer, url1);
  toggleClasses(landingPageContainer, dNone);
  toggleClasses(startGamePage, dBlock);
  toggleClasses(startGamePage, dNone);

  // assigns first level img
  assignImage();
  // 


}

// instruction button 

infoButtonContainer.onclick = function () {
  toggleClasses(popUpInstructionsContainer, dNone);

}


// TRANSITION FUNCTION FOR BUTTONS ON HOVER
function mouseOverAndOut(triggerElement, changingElement, className) {

  triggerElement.onmouseover = function () {

    addClass(changingElement, className)

  }



  triggerElement.onmouseout = function () {

    removeClass(changingElement, className)


  }
}



mouseOverAndOut(returnButtonContainer, document.querySelector(".returnButton"), "returnButtonHover")
mouseOverAndOut(infoButtonContainer, document.getElementById("infoButtonBg"), "infoButtonHover")
mouseOverAndOut(document.getElementById("soundContainer"), document.querySelector(".soundBgMain"), "soundBgHover")
mouseOverAndOut(document.getElementById("gotIt"), document.querySelector(".gotItbg"), "gotItHover")





// MUSIC CONTROLS
let clickCount = 0


document.getElementById("soundContainer").onclick = function () {

  clickCount++;

  document.querySelector(".soundIconMain").src = "./images/buttons_icons/sound_off.svg";



  backgroundSound.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
  backgroundSound.play();


  if (clickCount === 2) {
    clickCount = 0;
    document.querySelector(".soundIconMain").src = "./images/buttons_icons/sound_on.svg";
    backgroundSound.pause();

  }
}


// return button inside  pup up instructions 

returnButtonContainer.onclick = function () {
  toggleClasses(popUpInstructionsContainer, dNone);

}


//FUNCTION TO ADD THE DOORS 


// declared variables for function to add another column once level up
const htmlColumn = window.getComputedStyle(document.querySelector("html"));
const doorContainer = document.getElementById("styleOftheDoorContainer");


const colNum = parseInt(htmlColumn.getPropertyValue("--colNum"));
let columnNumber = colNum



// SELECT ALL 

function selectAllQuery(c) {
  let nodeArray = document.querySelectorAll(c);
  return nodeArray;

}


// function to add another grid and another column and frame-door element 
function winScenario() {



  columnNumber++
  document.documentElement.style.setProperty("--colNum", columnNumber);


  let elmnt = document.querySelector(".entrance");
  let cln = elmnt.cloneNode(true);
  doorContainer.appendChild(cln);
  cln.querySelectorAll('img')[3].classList.remove("door-animation");
  cln.querySelectorAll('img')[3].style.pointerEvents = "auto";



  let doorsOpeningNew = selectAllQuery(".open")
  let doorsOpeningArr = Array.prototype.slice.call(doorsOpeningNew);
  doorsOpeningFunction(doorsOpeningNew, doorsOpeningArr)


}



let doorsOpening = selectAllQuery(".open");

let imgBehidDoors = selectAllQuery(".imgBehidDoors")

let doorsOpeningArr = Array.prototype.slice.call(doorsOpening);









// function to assign images

let inf1 = "./images/images/in_1.png";
let inf2 = "./images/images/in_2.png";


function selectAll(h) {

  let i = document.querySelectorAll(h);
  return i;
}

let goodImg = ["./images/images/bunny_1.png", "./images/images/bunny_2.png", "./images/images/puppy_1.png"];
let messageSrcArr = ["./images/images/message_1.png", "./images/images/message_2.png", "./images/images/message_3.png", "./images/images/message_4.png"]
let looseImg = [inf1, inf2];


function assignImage() {

  let i = selectAllQuery(".imgBehidDoors");

  i.forEach((e) => {

    // e.src === "#"
    e.removeAttribute('src')
  })

  i[randomNumberGenerator(i)].src = goodImg[randomNumberGenerator(goodImg)]

  let behidDoorsNumber_2 = randomNumberGenerator(imgBehidDoors);

  i.forEach((e) => {

    if (e.src === "") {

      e.src = looseImg[randomNumberGenerator(looseImg)]

    }


  })


}

// function for the imgBehindDoors when there is four doors

function assignImageIfTwoCilckableImg() {
  let i = selectAllQuery(".imgBehidDoors");

  i.forEach((e) => {
    e.removeAttribute('src')
  })


  let behidDoorsNumber_2 = randomNumberGenerator(i)
  let behidDoorsNumber = randomNumberGenerator(i)


  do {
    behidDoorsNumber_2 = randomNumberGenerator(i);
  } while (behidDoorsNumber_2 === behidDoorsNumber)


  if (behidDoorsNumber_2 != behidDoorsNumber) {



    i[behidDoorsNumber].src = goodImg[randomNumberGenerator(goodImg)]
    i[behidDoorsNumber_2].src = goodImg[randomNumberGenerator(goodImg)]

    i.forEach((e) => {

      if (e.src === "") {

        e.src = looseImg[randomNumberGenerator(looseImg)]

      }


    })


  }







}



// FUNCTION FOR BOTH THREE OR LESS AND FOUR OR MORE DOOR GAME 
function doorsOpeningFunction(arrDoor, doorConvertedArray) {




  arrDoor.forEach((f) => {


    f.onclick = function () {

      let i = selectAllQuery(".imgBehidDoors");
      let messageInf = selectAllQuery(".message")



      addClass(this, "door-animation")


      let a = doorConvertedArray.indexOf(this)


      openDoorsCount++


      if (arrDoor.length >= 4 && openDoorsCount === 1) {

        assignImageIfTwoCilckableImg();


        if (looseImg.includes(i[a].getAttribute('src'))) {

          messageInf[a].src = messageSrcArr[randomNumberGenerator(messageSrcArr)];


          messageInf[a].classList.remove("d-none");



          i[a].classList.add("inf")


          state = "loose"

          arrDoor.forEach(d => {
            d.style.pointerEvents = "none";
          })


          startNewLevel(arrDoor, i)
          countLives()

        } else if (goodImg.includes(i[a].getAttribute('src'))) {


          state = "win"
          openDoorsCount++

        }


      }


      if (arrDoor.length >= 4 && openDoorsCount === 3) {



        if (looseImg.includes(i[a].getAttribute('src'))) {

          i[a].classList.add("inf")

          messageInf[a].src = messageSrcArr[randomNumberGenerator(messageSrcArr)];

          messageInf[a].classList.remove("d-none");


          arrDoor.forEach(d => {
            d.style.pointerEvents = "none";
          })


          startNewLevel(arrDoor, i)
          countLives()
        } else if (state === "win") {



          arrDoor.forEach(d => {
            d.style.pointerEvents = "none";
          })


          startNewLevel(arrDoor, i)
          calculateScore()
        }



      }

      // win or loose for less or equal to three doors


      if (arrDoor.length <= 3) {
        openDoorsCount++

        assignImage()
        arrDoor.forEach(d => {
          d.style.pointerEvents = "none";
        })


        if (goodImg.includes(i[a].getAttribute('src'))) {




          state = "win"
          startNewLevel(arrDoor, i)
          calculateScore()

        } else if (looseImg.includes(i[a].getAttribute('src'))) {




          i[a].classList.add("inf")
          messageInf[a].src = messageSrcArr[randomNumberGenerator(messageSrcArr)];

          messageInf[a].classList.remove("d-none");



          startNewLevel(arrDoor, i)
          state = "loose"
          countLives()

        }

      }


    }

  })
}








// FUNCTIONS FOR LIVES AND SCORE NUMBERS
let livesCount = document.getElementById("liveCount");
let scoreCount = document.getElementById("scoreCount");
let heartIcon = document.querySelector(".img-icon-1");


let highScore = [];


let looseColor = document.querySelector(".looseColor")






// COUNT LIVES
function countLives() {

  let elmnt = selectAllQuery(".open");


  lives--;

  if (lives === 1) {
    addClass(heartIcon, "heartPulse")

  } else if (lives === 0) {

    removeClass(heartIcon, "heartPulse");
    removeClass(looseColor, "d-none");

    highScore.push(score);

    document.querySelectorAll(".playAgain").forEach(playAgainBtn => {


      playAgainBtn.onclick = function () {
        gameOver()
        doorsOpeningFunction(doorsOpening, doorsOpeningArr);

      }

    })


    elmnt.forEach(entrances => {

      entrances.onclick = function () {
        this.style.pointerEvents = "none";

      }
    })









  }



  livesCount.textContent = lives;


}



// CALCULATE SCORE

function calculateScore() {

  score++;
  let elmnt = selectAllQuery(".open");


  if (score === 4) {



    let b = document.querySelector(".winColor")


    setTimeout(() => {
      b.classList.remove("d-none");
      elmnt.forEach(entrances => {

        entrances.onclick = function () {
          this.style.pointerEvents = "none";

        }
      })

    }, 1000);


    // 
    highScore.push(score);

    document.querySelectorAll(".playAgain").forEach(playAgainBtn => {
      playAgainBtn.onclick = function () {

        gameOver()
        doorsOpeningFunction(doorsOpening, doorsOpeningArr);
        b.classList.add("d-none");

      }

    })
    // 
  } else if (score === 2) {

    let c = document.querySelector(".third")

    setTimeout(() => {
      elmnt.forEach(entrances => {


        entrances.onclick = function () {
          this.style.pointerEvents = "none";


        }
      })
      c.classList.remove("d-none");


    }, 1000);


    document.getElementById("gotIt").onclick = function () {

      c.classList.add("d-none");
      winScenario()
      elmnt.forEach(entrances => {
        entrances.style.pointerEvents = "auto";
      })

    }




  } else if (score === 1) {

    let b = selectAllQuery(".shout")[randomNumberGenerator(selectAllQuery(".shout"))]

    setTimeout(() => {
      b.classList.remove("d-none");
      // 
      elmnt.forEach(entrances => {

        entrances.onclick = function () {
          this.style.pointerEvents = "none";

        }
      })
      // 


    }, 1000);

    setTimeout(() => {
      winScenario()
      b.classList.add("d-none");
      elmnt.forEach(entrances => {
        entrances.style.pointerEvents = "auto";
      })
    }, 3500);


  }

  scoreCount.textContent = score;


}




function startNewLevel(arr, imgBehinddor) {


  let messageInf = selectAllQuery(".message")


  let i = selectAllQuery(".imgBehidDoors");



  openDoorsCount = 0;

  arr.forEach((f) => {


    setTimeout(() => {
      removeClass(f, "door-animation");
      f.style.pointerEvents = "auto";


      messageInf.forEach(messageImg => {
        messageImg.classList.add("d-none");

      })

      i.forEach(imgInf => {
        imgInf.classList.remove("inf");
      })


      // missing animation to display for loose
    }, 2000);

  })





}

function gameOver() {

  addClass(looseColor, "d-none");


  // document.getElementById("highScore").textContent = Math.max(highScore);
  document.getElementById("highScore").textContent = Math.max.apply(null, highScore);




  openDoorsCount = 0;
  columnNumber = 2;
  document.documentElement.style.setProperty("--colNum", columnNumber);
  score = 0;
  lives = 3;

  scoreCount.textContent = score;
  livesCount.textContent = lives;

  let i = selectAllQuery(".imgBehidDoors")

  i.forEach(imgBehind => {
    imgBehind.classList.remove("inf");
  })

  let doorsOpening = selectAllQuery(".open");

  // let elmnt = selectAllQuery(".entrance");

  let select = document.querySelector('#styleOftheDoorContainer');
  let child = select.lastElementChild;



  if (doorsOpening.length === 4) {

    select.removeChild(child);
    child = select.lastElementChild;

    select.removeChild(child);


  } else if (doorsOpening.length === 3) {

    child = select.lastElementChild;

    select.removeChild(child);

  }


}


doorsOpeningFunction(doorsOpening, doorsOpeningArr);