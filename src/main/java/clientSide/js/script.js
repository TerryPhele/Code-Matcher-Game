const code =[];
let currentLevel=1;
DEFAULT_MIN = 3;
DEFAULT_SEC = 30;
let minutes=0;
let seconds=0;
let playing = false;
let gameStarted = false;
let timer;

const level = document.querySelector("#level");
const time = document.querySelector("#timeelapser");
const playPause = document.querySelector("#playpause");

const textOne = document.querySelector("#text1");
const textTwo = document.querySelector("#text2");
const textThree = document.querySelector("#text3");
const textFour = document.querySelector("#text4");

const lockOne = document.querySelector("#lock1");
const lockTwo = document.querySelector("#lock2");
const lockThree = document.querySelector("#lock3");
const lockFour = document.querySelector("#lock4");

const reset=document.querySelector("#reset");
const unlock = document.querySelector("#next");
const exit = document.querySelector("#exit")


function updatePage(){

    level.value = currentLevel;

    let displayMinutes = minutes;
    let displaySeconds = seconds;

    if(minutes < 10 ){
        displayMinutes = `0${minutes}`;
    }
    if(seconds < 10){
        displaySeconds = `0${seconds}`;
    }
    if( minutes ==0 && seconds <=59){
        time.style.color ="red";
    }

    time.textContent =`${ displayMinutes }:${displaySeconds}`;
}

/**
 * count the time and update minutes and seconds
 */
function timeCounter(){

   if(!gameStarted){
      minutes = DEFAULT_MIN;
      seconds = DEFAULT_SEC;
   }

    if(playing){
        timer = setInterval( ()=>{
            if(minutes > 0){
                if( seconds > 0){
                    seconds -=1;
                    updatePage();
                }else{
                    minutes-=1;
                    seconds = 59;
                    updatePage();
                }
            }else if( minutes ===0 && seconds > 0){
                seconds -=1;
                updatePage();
            }

        },1000);

    }else{
        clearInterval(timer);
    }
}
/**
 * pause the current time and update minutes and seconds
 */
function  pauseTime(paused){
    return paused;
}

/**
 * increment current  game level
 */
function updateLevel()
{
    currentLevel +=1;
}

/**
 * update textContent of the play/pause button and pause the time
 */

function playOrPause()
{

    if( playPause.value == "Play"){

        playPause.value ="Pause";
        playing = pauseTime(true);
        textOne.disabled = false;
        textTwo.disabled = false;
        textThree.disabled = false;
        textFour.disabled = false;
    } else{
        playPause.value = "Play";
        playing = pauseTime(false)
        textOne.disabled = true;
        textTwo.disabled = true;
        textThree.disabled = true;
        textFour.disabled = true;
    }

    timeCounter();
    gameStarted = true;

}
playPause.addEventListener('click', playOrPause)


function generateCode(){

    textOne.disabled = true;
    textTwo.disabled = true;
    textThree.disabled = true;
    textFour.disabled = true;
    for(index = 0; index<4; index++){
        let digit = Math.floor( Math.random()*5)+1;
        code.push(digit);
    }
}

function unlockOne(){
    if( Number(textOne.value) === code[0]){
        lockOne.src ="unlocked.png";
    }else{
        lockOne.src ="locked.png";
    }
}

function unlockTwo(){
    if( Number(textTwo.value) === code[1]){
        lockTwo.src ="unlocked.png";
    }else{
        lockTwo.src ="locked.png";
    }
}
function unlockThree(){
    if( Number(textThree.value) === code[2]){
        lockThree.src ="unlocked.png";
    }else{
        lockThree.src ="locked.png";
    }
}

function unlockFour(){
    if( Number(textFour.value) === code[3]){
        lockFour.src ="unlocked.png";
    }else{
        lockFour.src ="locked.png";
    }
}





textOne.addEventListener('input', unlockOne);
textTwo.addEventListener('input', unlockTwo);
textThree.addEventListener('input', unlockThree);
textFour.addEventListener('input', unlockFour);

reset.addEventListener('click', reseter);

function reseter()
{
    textOne.value = "";
    textTwo.value = "";
    textThree.value = "";
    textFour.value = "";
    minutes = DEFAULT_MIN;
    seconds = DEFAULT_SEC;

    clearInterval(timer);
    gameStarted = false;
    playPause.value = "Play";

    textOne.disabled = true;
    textTwo.disabled = true;
    textThree.disabled = true;
    textFour.disabled = true;

    lockOne.src ="locked.png";
    lockTwo.src ="locked.png";
    lockThree.src ="locked.png";
    lockFour.src ="locked.png";
    code.length = 0;
    
    updatePage();
}

unlock.addEventListener('click', ()=>{
    if( unlocked()){
        alert(`congrats you unlocked level-${currentLevel}\n
        You are now moving to ${currentLevel+1}`)
        
        currentLevel+=1;
        reseter();
        generateCode();
    }else{
        alert("The code is still locked!!!")
    }
})

exit.addEventListener('click', ()=>{
    alert("GAME IS CLOSING BY!!");
    window.close();
})


function unlocked(){
    return textOne.value ==code[0] && textTwo.value ==code[1] &&
            textThree.value==code[2] && textFour.value==code[3];
}

generateCode();